/**
 * NEXUS 实体标注插件 - Fixed version
 *
 * 目标：在保留 Markdown 风格符号标注的同时，提供“标签前缀”语法，
 * 避免与 Markdown 常见符号（如 [、_、{）产生输入与阅读冲突。
 *
 * 推荐语法（更稳健）：
 * - 【person:孔子】 / 【p:孔子】
 * - 【place:长安】 / 【loc:长安】
 * - 【legal:五刑】（替代旧式 【[五刑】）
 * - 【concept:仁义】（替代旧式 【_仁义】）
 * - 【book:尚书】（替代旧式 【{尚书】）
 *
 * 兼容语法（旧版保留）：
 * - 【@孔子】、【=长安】、【;丞相】 ...
 *
 * 消歧语法：
 * - 【person:始皇|秦始皇】
 * - 【@始皇|秦始皇】
 */

import { visit } from 'unist-util-visit';

const ENTITY_DEFINITIONS = {
  person: {
    className: 'entity-person',
    title: '人名',
    type: 'person',
    wrapBook: false,
    markers: ['@'],
    labels: ['person', 'p', '人物', '人名'],
  },
  place: {
    className: 'entity-place',
    title: '地名',
    type: 'place',
    wrapBook: false,
    markers: ['='],
    labels: ['place', 'loc', 'l', '地名', '地点'],
  },
  official: {
    className: 'entity-official',
    title: '官职',
    type: 'official',
    wrapBook: false,
    markers: [';'],
    labels: ['official', 'office', '官职', '职官'],
  },
  time: {
    className: 'entity-time',
    title: '时间',
    type: 'time',
    wrapBook: false,
    markers: ['%'],
    labels: ['time', 't', '时间', '时点'],
  },
  dynasty: {
    className: 'entity-dynasty',
    title: '氏族',
    type: 'dynasty',
    wrapBook: false,
    markers: ['&'],
    labels: ['dynasty', 'clan', '朝代', '氏族'],
  },
  state: {
    className: 'entity-state',
    title: '邦国',
    type: 'state',
    wrapBook: false,
    markers: ["'"],
    labels: ['state', 'country', '邦国', '国家'],
  },
  institution: {
    className: 'entity-institution',
    title: '制度',
    type: 'institution',
    wrapBook: false,
    markers: ['^'],
    labels: ['institution', 'inst', '制度'],
  },
  tribe: {
    className: 'entity-tribe',
    title: '族群',
    type: 'tribe',
    wrapBook: false,
    markers: ['~'],
    labels: ['tribe', 'ethnic', '族群', '民族'],
  },
  identity: {
    className: 'entity-identity',
    title: '身份',
    type: 'identity',
    wrapBook: false,
    markers: ['#'],
    labels: ['identity', 'role', '身份'],
  },
  artifact: {
    className: 'entity-artifact',
    title: '器物',
    type: 'artifact',
    wrapBook: false,
    markers: ['•'],
    labels: ['artifact', 'obj', '器物', '器具'],
  },
  astronomy: {
    className: 'entity-astronomy',
    title: '天文/历法',
    type: 'astronomy',
    wrapBook: false,
    markers: ['!'],
    labels: ['astronomy', 'astro', '天文', '历法'],
  },
  mythical: {
    className: 'entity-mythical',
    title: '神话/传说',
    type: 'mythical',
    wrapBook: false,
    markers: ['?'],
    labels: ['myth', 'mythical', '神话', '传说'],
  },
  biology: {
    className: 'entity-biology',
    title: '生物',
    type: 'biology',
    wrapBook: false,
    markers: ['+'],
    labels: ['biology', 'bio', '生物'],
  },
  quantity: {
    className: 'entity-quantity',
    title: '数量',
    type: 'quantity',
    wrapBook: false,
    markers: ['$'],
    labels: ['quantity', 'qty', '数量', '数值'],
  },
  book: {
    className: 'entity-book',
    title: '典籍',
    type: 'book',
    wrapBook: true,
    markers: ['{'],
    labels: ['book', 'text', '典籍', '文献'],
  },
  ritual: {
    className: 'entity-ritual',
    title: '礼仪',
    type: 'ritual',
    wrapBook: false,
    markers: [':'],
    labels: ['ritual', '礼仪', '礼制'],
  },
  legal: {
    className: 'entity-legal',
    title: '刑法',
    type: 'legal',
    wrapBook: false,
    markers: ['['],
    labels: ['legal', 'law', '刑法', '法令'],
  },
  concept: {
    className: 'entity-concept',
    title: '思想',
    type: 'concept',
    wrapBook: false,
    markers: ['_'],
    labels: ['concept', 'idea', '思想', '观念'],
  },
  action: {
    className: 'entity-action',
    title: '行为',
    type: 'action',
    wrapBook: false,
    markers: ['*'],
    labels: ['action', 'act', '行为'],
  },
  consciousness: {
    className: 'entity-consciousness',
    title: '意识',
    type: 'consciousness',
    wrapBook: false,
    markers: ['^'],
    labels: ['consciousness', '意识', 'mind', 'awareness'],
  },
  disaster: {
    className: 'entity-disaster',
    title: '灾难',
    type: 'disaster',
    wrapBook: false,
    markers: ['!'],
    labels: ['disaster', '灾', '灾难', '灾害'],
  },
};

const PREFIX_TO_ENTITY = new Map();
for (const [key, config] of Object.entries(ENTITY_DEFINITIONS)) {
  for (const marker of config.markers) PREFIX_TO_ENTITY.set(marker, key);
  for (const label of config.labels) PREFIX_TO_ENTITY.set(label.toLowerCase(), key);
}

const ENTITY_BLOCK_PATTERN = /【([^【】]+)】/g;
const PARAGRAPH_NUMBER_PATTERN = /(?<!["'>])\[(\d+(?:\.\d+)*)\]/g;

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function buildEntitySpan(def, display, canonical) {
  const safeDisplay = escapeHtml(display.trim());
  const safeCanonical = canonical ? escapeHtml(canonical.trim()) : null;
  const displayText = def.wrapBook ? `《${safeDisplay}》` : safeDisplay;

  if (safeCanonical) {
    return `<span class="${def.className}" title='${def.title}：${safeCanonical}' data-canonical="${safeCanonical}" data-type="${def.type}">${displayText}</span>`;
  }

  return `<span class="${def.className}" title='${def.title}' data-type="${def.type}">${displayText}</span>`;
}

function parseEntityToken(rawToken) {
  const token = rawToken.trim();
  if (!token) return null;

  // 前缀语法：person:孔子 或 p:孔子
  const labelMatch = token.match(/^([A-Za-z\u4e00-\u9fff]+)\s*:\s*(.+)$/u);
  if (labelMatch) {
    const rawPrefix = labelMatch[1].toLowerCase();
    const payload = labelMatch[2].trim();
    const entityKey = PREFIX_TO_ENTITY.get(rawPrefix);
    if (!entityKey || !payload) return null;

    const [display, canonical] = payload.split('|').map((part) => part.trim());
    if (!display) return null;

    return { def: ENTITY_DEFINITIONS[entityKey], display, canonical };
  }

  // 旧符号语法：@孔子
  const marker = token.charAt(0);
  const entityKey = PREFIX_TO_ENTITY.get(marker);
  if (!entityKey) return null;

  const payload = token.slice(1).trim();
  if (!payload) return null;

  const [display, canonical] = payload.split('|').map((part) => part.trim());
  if (!display) return null;

  return { def: ENTITY_DEFINITIONS[entityKey], display, canonical };
}

function convertEntities(text) {
  return text.replace(ENTITY_BLOCK_PATTERN, (match, token) => {
    const parsed = parseEntityToken(token);
    if (!parsed) return match;

    const { def, display, canonical } = parsed;
    return buildEntitySpan(def, display, canonical);
  });
}

function convertParagraphNumbers(text) {
  return text.replace(PARAGRAPH_NUMBER_PATTERN, (match, num) => {
    const pnId = `pn-${num}`;
    return `<a href="#${pnId}" id="${pnId}" class="para-num" title='段落编号 ${num}，点击跳转'>${num}</a>`;
  });
}

function convertQuotes(text) {
  let result = '';
  let inTag = false;
  let inAttributeValue = false;
  let i = 0;
  while (i < text.length) {
    if (text[i] === '<') {
      inTag = true;
      inAttributeValue = false;
      result += text[i];
      i++;
      continue;
    }
    if (text[i] === '>') {
      inTag = false;
      inAttributeValue = false;
      result += text[i];
      i++;
      continue;
    }
    if (inTag) {
      if (text[i] === '=') {
        inAttributeValue = true;
      } else if (text[i] === ' ') {
        inAttributeValue = false;
      }
      result += text[i];
      i++;
      continue;
    }
    // not in tag
    if (text[i] === '"') {
      // find the closing "
      let j = i + 1;
      while (j < text.length && text[j] !== '"' && text[j] !== '<') {
        j++;
      }
      if (j < text.length && text[j] === '"') {
        // valid "text"
        const inner = text.substring(i + 1, j);
        result += '<span class="quoted-content">"' + inner + '"</span>';
        i = j + 1;
        continue;
      }
    }
    if (text[i] === "'") {
      // similar for '
      let j = i + 1;
      while (j < text.length && text[j] !== "'" && text[j] !== '<') {
        j++;
      }
      if (j < text.length && text[j] === "'") {
        const inner = text.substring(i + 1, j);
        result += "<span class='quoted-content'>'" + inner + "'</span>";
        i = j + 1;
        continue;
      }
    }
    if (text[i] === '「') {
      let j = i + 1;
      while (j < text.length && text[j] !== '」' && text[j] !== '<') {
        j++;
      }
      if (j < text.length && text[j] === '」') {
        const inner = text.substring(i + 1, j);
        result += '<span class="quoted-content">「' + inner + '」</span>';
        i = j + 1;
        continue;
      }
    }
    if (text[i] === '『') {
      let j = i + 1;
      while (j < text.length && text[j] !== '』' && text[j] !== '<') {
        j++;
      }
      if (j < text.length && text[j] === '』') {
        const inner = text.substring(i + 1, j);
        result += '<span class="quoted-content">『' + inner + '』</span>';
        i = j + 1;
        continue;
      }
    }
    result += text[i];
    i++;
  }
  return result;
}

export default function remarkEntityAnnotation() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (typeof node.value !== 'string') return;

      let text = node.value;
      const hasEntity = /【[^【】]+】/.test(text);
      const hasParaNum = /\[\d+(?:\.\d+)*\]/.test(text);
      const hasQuote = /["'「」『』]/.test(text);

      if (!hasEntity && !hasParaNum && !hasQuote) return;

      text = convertEntities(text);
      text = convertParagraphNumbers(text);
      text = convertQuotes(text);

      if (text !== node.value && /<[a-z][^>]*>/.test(text)) {
        parent.children[index] = {
          type: 'html',
          value: text,
        };
      }
    });
  };
}

export function rehypeEntityIndex() {
  return (tree, file) => {
    const entities = new Map();

    visit(tree, 'element', (node) => {
      if (node.properties?.className?.some((c) => c.startsWith('entity-'))) {
        const entityType = node.properties.className
          .find((c) => c.startsWith('entity-'))
          ?.replace('entity-', '');
        const entityText = node.children?.[0]?.value;
        const canonical = node.properties?.dataCanonical || entityText;

        if (entityType && entityText) {
          const key = `${entityType}:${canonical}`;
          if (!entities.has(key)) {
            entities.set(key, {
              type: entityType,
              text: entityText,
              canonical,
              occurrences: [],
            });
          }
          entities.get(key).occurrences.push({
            file: file.path,
          });
        }
      }
    });

    file.data.entities = entities;
  };
}
