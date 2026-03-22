#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// 关系类型白名单
const RELATION_TYPES = {
  // 规则关系
  same_as: true,
  alias_of: true,
  refers_to: true,
  cites: true,
  part_of: true,
  contains: true,
  parent_of: true,
  spouse_of: true,
  sibling_of: true,
  teacher_of: true,
  serves_under: true,
  appoints: true,
  succeeds: true,
  participates_in: true,
  occurs_in: true,
  occurs_on: true,
  establishes: true,
  abolishes: true,
  same_paragraph: true,
  co_person: true,
  co_place: true,
  cross_ref: true,
  // 推理关系
  elaborates: true,
  supports: true,
  refutes: true,
  contrasts_with: true,
  precedes: true,
  concurrent_with: true,
  causes: true,
  results_in: true,
  motivates: true,
  opposes: true,
  allies_with: true,
  governs: true,
  member_of: true,
  influences: true,
  sequel: true,
  causal: true,
  opposition: true
};

// 状态取值白名单
const STATUS_VALUES = {
  asserted: true,
  inferred: true,
  disputed: true,
  negated: true,
  ai_generated: true
};

// 置信度取值白名单
const CONFIDENCE_VALUES = {
  high: true,
  medium: true,
  low: true,
  ai_estimated: true
};

// 对称关系类型
const SYMMETRIC_RELATIONS = {
  same_as: true,
  spouse_of: true,
  sibling_of: true,
  allies_with: true,
  concurrent_with: true,
  contrasts_with: true,
  same_paragraph: true,
  co_person: true,
  co_place: true,
  cross_ref: true
};

// 节点引用正则表达式
const NODE_REF_REGEX = /^(entity|event|para|section|doc):([a-z0-9_]+):(.+)$/;

/**
 * 校验关系标注文件
 * @param {string} relationsFile 关系文件路径
 */
async function validateRelationsFile(relationsFile) {
  console.log(`校验文件: ${relationsFile}`);
  
  try {
    // 读取文件内容
    const content = fs.readFileSync(relationsFile, 'utf8');
    
    // 提取 nexus-relations 块
    const relationsBlockMatch = content.match(/```nexus-relations[\s\S]*?```/g);
    if (!relationsBlockMatch) {
      console.error('❌ 未找到 nexus-relations 块');
      return false;
    }
    
    // 解析 YAML 内容
    const yamlContent = relationsBlockMatch[0].replace(/```nexus-relations\n|```/g, '');
    const relations = parseYAMLList(yamlContent);
    
    if (!relations || relations.length === 0) {
      console.error('❌ 关系列表为空');
      return false;
    }
    
    let isValid = true;
    const relationIds = new Set();
    const symmetricRelations = new Set();
    
    // 校验每条关系
    for (let i = 0; i < relations.length; i++) {
      const relation = relations[i];
      console.log(`\n校验关系 ${i + 1}: ${relation.id || '无ID'}`);
      
      // 1. 校验 id 唯一性
      if (!relation.id) {
        console.error('❌ 缺少 id 字段');
        isValid = false;
      } else if (relationIds.has(relation.id)) {
        console.error(`❌ id ${relation.id} 重复`);
        isValid = false;
      } else {
        relationIds.add(relation.id);
      }
      
      // 2. 校验 type 在白名单中
      if (!relation.type) {
        console.error('❌ 缺少 type 字段');
        isValid = false;
      } else if (!RELATION_TYPES[relation.type]) {
        console.error(`❌ 关系类型 ${relation.type} 不在白名单中`);
        isValid = false;
      }
      
      // 3. 校验 source 与 target 语法合法
      if (!relation.source) {
        console.error('❌ 缺少 source 字段');
        isValid = false;
      } else if (!NODE_REF_REGEX.test(relation.source)) {
        console.error(`❌ source 格式错误: ${relation.source}`);
        isValid = false;
      }
      
      if (!relation.target) {
        console.error('❌ 缺少 target 字段');
        isValid = false;
      } else if (!NODE_REF_REGEX.test(relation.target)) {
        console.error(`❌ target 格式错误: ${relation.target}`);
        isValid = false;
      }
      
      // 4. 校验 source 与 target 不可相同，除 same_as 外
      if (relation.source === relation.target && relation.type !== 'same_as') {
        console.error('❌ source 和 target 相同，且关系类型不是 same_as');
        isValid = false;
      }
      
      // 5. 校验 evidence 非空
      if (!relation.evidence || !Array.isArray(relation.evidence) || relation.evidence.length === 0) {
        console.error('❌ evidence 字段为空或格式错误');
        isValid = false;
      } else {
        // 校验 evidence 中至少有一个 para:*
        const hasParaEvidence = relation.evidence.some(item => 
          typeof item === 'string' && item.startsWith('para:')
        );
        if (!hasParaEvidence) {
          console.error('❌ evidence 中至少需要一个 para:* 格式的证据');
          isValid = false;
        }
      }
      
      // 6. 校验 status 与 confidence 取值合法
      if (!relation.status) {
        console.error('❌ 缺少 status 字段');
        isValid = false;
      } else if (!STATUS_VALUES[relation.status]) {
        console.error(`❌ status 值 ${relation.status} 不在白名单中`);
        isValid = false;
      }
      
      if (!relation.confidence) {
        console.error('❌ 缺少 confidence 字段');
        isValid = false;
      } else if (!CONFIDENCE_VALUES[relation.confidence]) {
        console.error(`❌ confidence 值 ${relation.confidence} 不在白名单中`);
        isValid = false;
      }
      
      // 7. 校验对称关系不存在镜像重复记录
      if (SYMMETRIC_RELATIONS[relation.type]) {
        const relationKey = [relation.source, relation.target].sort().join('|');
        if (symmetricRelations.has(relationKey)) {
          console.error(`❌ 对称关系 ${relation.type} 存在镜像重复记录`);
          isValid = false;
        } else {
          symmetricRelations.add(relationKey);
        }
      }
      
      // 8. 校验跨文档关系如果不在当前文件，必须填写 source_doc 或 target_doc
      if (relation.source.startsWith('doc:') && !relation.source_doc) {
        console.error('❌ 跨文档关系缺少 source_doc 字段');
        isValid = false;
      }
      
      if (relation.target.startsWith('doc:') && !relation.target_doc) {
        console.error('❌ 跨文档关系缺少 target_doc 字段');
        isValid = false;
      }
    }
    
    if (isValid) {
      console.log('\n✅ 所有关系校验通过');
    } else {
      console.log('\n❌ 部分关系校验失败');
    }
    
    return isValid;
    
  } catch (error) {
    console.error(`❌ 校验过程中出错: ${error.message}`);
    return false;
  }
}

/**
 * 简单解析 YAML 列表
 * @param {string} yaml YAML 字符串
 * @returns {Array} 解析后的对象数组
 */
function parseYAMLList(yaml) {
  const lines = yaml.trim().split('\n');
  const result = [];
  let currentItem = null;
  let currentKey = null;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('- ')) {
      // 新项开始
      if (currentItem) {
        result.push(currentItem);
      }
      currentItem = {};
      const keyValue = trimmedLine.substring(2).trim();
      if (keyValue.includes(':')) {
        const [key, value] = keyValue.split(':', 2).map(item => item.trim());
        currentItem[key] = parseValue(value);
      }
    } else if (currentItem && trimmedLine.includes(':')) {
      // 键值对
      const [key, value] = trimmedLine.split(':', 2).map(item => item.trim());
      currentKey = key;
      currentItem[key] = parseValue(value);
    } else if (currentItem && currentKey && trimmedLine.startsWith('- ')) {
      // 数组项
      if (!Array.isArray(currentItem[currentKey])) {
        currentItem[currentKey] = [];
      }
      currentItem[currentKey].push(parseValue(trimmedLine.substring(2).trim()));
    }
  }
  
  if (currentItem) {
    result.push(currentItem);
  }
  
  return result;
}

/**
 * 解析 YAML 值
 * @param {string} value 值字符串
 * @returns {any} 解析后的值
 */
function parseValue(value) {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (!isNaN(value) && value.trim() !== '') return Number(value);
  if (value.startsWith('[') && value.endsWith(']')) {
    return value.substring(1, value.length - 1)
      .split(',')
      .map(item => item.trim())
      .filter(item => item !== '');
  }
  if (value.startsWith('"') && value.endsWith('"')) {
    return value.substring(1, value.length - 1);
  }
  return value;
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('用法: node validate-relations.mjs <关系文件路径>');
    process.exit(1);
  }
  
  const relationsFile = args[0];
  
  if (!fs.existsSync(relationsFile)) {
    console.error(`❌ 文件不存在: ${relationsFile}`);
    process.exit(1);
  }
  
  const isValid = await validateRelationsFile(relationsFile);
  process.exit(isValid ? 0 : 1);
}

// 执行主函数
main();