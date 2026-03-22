/**
 * NEXUS 实体标注插件
 * 
 * 功能：将简洁的实体标记语法转换为带CSS样式的HTML
 * 参考：shiji-kb 项目的 render_shiji_html.py
 * 
 * 标记语法：
 * - 〖@人名〗 → <span class="entity-person">人名</span>
 * - 〖=地名〗 → <span class="entity-place">地名</span>
 * - 〖;官职〗 → <span class="entity-official">官职</span>
 * - 〖%时间〗 → <span class="entity-time">时间</span>
 * - 〖&朝代〗 → <span class="entity-dynasty">朝代</span>
 * - 〖'邦国〗 → <span class="entity-state">邦国</span>
 * - 〖^制度〗 → <span class="entity-institution">制度</span>
 * - 〖~族群〗 → <span class="entity-tribe">族群</span>
 * - 〖•器物〗 → <span class="entity-artifact">器物</span>
 * - 〖!天文〗 → <span class="entity-astronomy">天文</span>
 * - 〖?神话〗 → <span class="entity-mythical">神话</span>
 * - 〖+生物〗 → <span class="entity-biology">生物</span>
 * - 〖$数量〗 → <span class="entity-quantity">数量</span>
 * - 〖{典籍〗 → <span class="entity-book">《典籍》</span>
 * - 〖:礼仪〗 → <span class="entity-ritual">礼仪</span>
 * - 〖[刑法〗 → <span class="entity-legal">刑法</span>
 * - 〖_思想〗 → <span class="entity-concept">思想</span>
 * - 〖#身份〗 → <span class="entity-identity">身份</span>
 * 
 * 消歧语法：
 * - 〖@简称|全名〗 → 显示"简称"，链接到"全名"
 * 
 * 段落编号：
 * - [数字] 或 [数字.数字] → 可点击的锚点链接
 */

import { visit } from 'unist-util-visit';

// 实体类型映射表
const ENTITY_PATTERNS = [
  // 人名
  { pattern: /〖@([^〖〗|]+)\|([^〖〗]+)〗/g, className: 'entity-person', title: '人名', type: 'person', useCanonical: true },
  { pattern: /〖@([^〖〗]+)〗/g, className: 'entity-person', title: '人名', type: 'person' },
  
  // 地名
  { pattern: /〖=([^〖〗|]+)\|([^〖〗]+)〗/g, className: 'entity-place', title: '地名', type: 'place', useCanonical: true },
  { pattern: /〖=([^〖〗]+)〗/g, className: 'entity-place', title: '地名', type: 'place' },
  
  // 官职
  { pattern: /〖;([^〖〗|]+)\|([^〖〗]+)〗/g, className: 'entity-official', title: '官职', type: 'official', useCanonical: true },
  { pattern: /〖;([^〖〗]+)〗/g, className: 'entity-official', title: '官职', type: 'official' },
  
  // 时间
  { pattern: /〖%([^〖〗|]+)\|([^〖〗]+)〗/g, className: 'entity-time', title: '时间', type: 'time', useCanonical: true },
  { pattern: /〖%([^〖〗]+)〗/g, className: 'entity-time', title: '时间', type: 'time' },
  
  // 朝代/氏族
  { pattern: /〖&([^〖〗|]+)\|([^〖〗]+)〗/g, className: 'entity-dynasty', title: '氏族', type: 'dynasty', useCanonical: true },
  { pattern: /〖&([^〖〗]+)〗/g, className: 'entity-dynasty', title: '氏族', type: 'dynasty' },
  
  // 邦国
  { pattern: /〖'([^〖〗|]+)\|([^〖〗]+)〗/g, className: 'entity-state', title: '邦国', type: 'state', useCanonical: true },
  { pattern: /〖'([^〖〗]+)〗/g, className: 'entity-state', title: '邦国', type: 'state' },
  
  // 制度
  { pattern: /〖\^([^〖〗|]+)\|([^〖〗]+)〗/g, className: 'entity-institution', title: '制度', type: 'institution', useCanonical: true },
  { pattern: /〖\^([^〖〗]+)〗/g, className: 'entity-institution', title: '制度', type: 'institution' },
  
  // 族群
  { pattern: /〖~([^〖〗|]+)\|([^〖〗]+)〗/g, className: 'entity-tribe', title: '族群', type: 'tribe', useCanonical: true },
  { pattern: /〖~([^〖〗]+)〗/g, className: 'entity-tribe', title: '族群', type: 'tribe' },
  
  // 身份
  { pattern: /〖#([^〖〗|]+)\|([^〖〗]+)〗/g, className: 'entity-identity', title: '身份', type: 'identity', useCanonical: true },
  { pattern: /〖#([^〖〗]+)〗/g, className: 'entity-identity', title: '身份', type: 'identity' },
  
  // 器物
  { pattern: /〖•([^〖〗|]+)\|([^〖〗]+)〗/g, className: 'entity-artifact', title: '器物', type: 'artifact', useCanonical: true },
  { pattern: /〖•([^〖〗]+)〗/g, className: 'entity-artifact', title: '器物', type: 'artifact' },
  
  // 天文
  { pattern: /〖!([^〖〗|]+)\|([^〖〗]+)〗/g, className: 'entity-astronomy', title: '天文/历法', type: 'astronomy', useCanonical: true },
  { pattern: /〖!([^〖〗]+)〗/g, className: 'entity-astronomy', title: '天文/历法', type: 'astronomy' },
  
  // 神话
  { pattern: /〖\?([^〖〗|]+)\|([^〖〗]+)〗/g, className: 'entity-mythical', title: '神话/传说', type: 'mythical', useCanonical: true },
  { pattern: /〖\?([^〖〗]+)〗/g, className: 'entity-mythical', title: '神话/传说', type: 'mythical' },
  
  // 生物
  { pattern: /〖\+([^〖〗|]+)\|([^〖〗]+)〗/g, className: 'entity-biology', title: '生物', type: 'biology', useCanonical: true },
  { pattern: /〖\+([^〖〗]+)〗/g, className: 'entity-biology', title: '生物', type: 'biology' },
  
  // 数量
  { pattern: /〖\$([^〖〗|]+)\|([^〖〗]+)〗/g, className: 'entity-quantity', title: '数量', type: 'quantity', useCanonical: true },
  { pattern: /〖\$([^〖〗]+)〗/g, className: 'entity-quantity', title: '数量', type: 'quantity' },
  
  // 典籍
  { pattern: /〖\{([^〖〗|]+)\|([^〖〗]+)〗/g, className: 'entity-book', title: '典籍', type: 'book', useCanonical: true, wrapBook: true },
  { pattern: /〖\{([^〖〗]+)〗/g, className: 'entity-book', title: '典籍', type: 'book', wrapBook: true },
  
  // 礼仪
  { pattern: /〖:([^〖〗|]+)\|([^〖〗]+)〗/g, className: 'entity-ritual', title: '礼仪', type: 'ritual', useCanonical: true },
  { pattern: /〖:([^〖〗]+)〗/g, className: 'entity-ritual', title: '礼仪', type: 'ritual' },
  
  // 刑法
  { pattern: /〖\[([^〖〗|]+)\|([^〖〗]+)〗/g, className: 'entity-legal', title: '刑法', type: 'legal', useCanonical: true },
  { pattern: /〖\[([^〖〗]+)〗/g, className: 'entity-legal', title: '刑法', type: 'legal' },
  
  // 思想
  { pattern: /〖_([^〖〗|]+)\|([^〖〗]+)〗/g, className: 'entity-concept', title: '思想', type: 'concept', useCanonical: true },
  { pattern: /〖_([^〖〗]+)〗/g, className: 'entity-concept', title: '思想', type: 'concept' },
];

// 段落编号模式
const PARAGRAPH_NUMBER_PATTERN = /(?<!["'>])\[(\d+(?:\.\d+)*)\]/g;

/**
 * 转换实体标注为HTML
 */
function convertEntities(text) {
  let result = text;
  
  // 按优先级处理实体标注（先处理消歧格式，再处理简单格式）
  for (const entity of ENTITY_PATTERNS) {
    if (entity.useCanonical) {
      // 消歧格式：〖@简称|全名〗
      result = result.replace(entity.pattern, (match, display, canonical) => {
        const displayText = entity.wrapBook ? `《${display}》` : display;
        return `<span class="${entity.className}" title="${entity.title}：${canonical}" data-canonical="${canonical}" data-type="${entity.type}">${displayText}</span>`;
      });
    } else {
      // 简单格式：〖@人名〗
      result = result.replace(entity.pattern, (match, content) => {
        const displayText = entity.wrapBook ? `《${content}》` : content;
        return `<span class="${entity.className}" title="${entity.title}" data-type="${entity.type}">${displayText}</span>`;
      });
    }
  }
  
  return result;
}

/**
 * 转换段落编号为锚点
 */
function convertParagraphNumbers(text) {
  return text.replace(PARAGRAPH_NUMBER_PATTERN, (match, num) => {
    const pnId = `pn-${num}`;
    return `<a href="#${pnId}" id="${pnId}" class="para-num" title="段落编号 ${num}，点击跳转">${num}</a>`;
  });
}

/**
 * 处理引号内容高亮
 */
function convertQuotes(text) {
  // 中文双引号
  text = text.replace(/[""]([^""<>]+)[""]/g, '<span class="quoted-content">"$1"</span>');
  // 中文单引号
  text = text.replace(/['']([^''<>]+)['']/g, "<span class='quoted-content'>'$1'</span>");
  // 日式引号
  text = text.replace(/「([^」<>]+)」/g, '<span class="quoted-content">「$1」</span>');
  text = text.replace(/『([^』<>]+)』/g, '<span class="quoted-content">『$1』</span>');
  
  return text;
}

/**
 * Remark 插件主函数
 */
export default function remarkEntityAnnotation() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (typeof node.value !== 'string') return;
      
      let text = node.value;
      
      // 检查是否需要处理
      const hasEntity = /〖[^〖〗]+〗/.test(text);
      const hasParaNum = /\[\d+(?:\.\d+)*\]/.test(text);
      const hasQuote = /[""「」『』]/.test(text);
      
      if (!hasEntity && !hasParaNum && !hasQuote) return;
      
      // 转换处理
      text = convertEntities(text);
      text = convertParagraphNumbers(text);
      text = convertQuotes(text);
      
      // 如果文本被转换为HTML，替换为html节点
      if (text !== node.value && /<[a-z][^>]*>/.test(text)) {
        parent.children[index] = {
          type: 'html',
          value: text,
        };
      }
    });
  };
}

/**
 * Rehype 插件：为实体添加索引链接（可选）
 * 这个插件可以在构建时生成实体索引页面
 */
export function rehypeEntityIndex() {
  return (tree, file) => {
    // 收集所有实体用于索引
    const entities = new Map();
    
    visit(tree, 'element', (node) => {
      if (node.properties?.className?.some(c => c.startsWith('entity-'))) {
        const entityType = node.properties.className.find(c => c.startsWith('entity-'))?.replace('entity-', '');
        const entityText = node.children?.[0]?.value;
        const canonical = node.properties?.dataCanonical || entityText;
        
        if (entityType && entityText) {
          const key = `${entityType}:${canonical}`;
          if (!entities.has(key)) {
            entities.set(key, {
              type: entityType,
              text: entityText,
              canonical: canonical,
              occurrences: [],
            });
          }
          entities.get(key).occurrences.push({
            file: file.path,
            // 可以添加更多位置信息
          });
        }
      }
    });
    
    // 将实体信息附加到文件数据中
    file.data.entities = entities;
  };
}
