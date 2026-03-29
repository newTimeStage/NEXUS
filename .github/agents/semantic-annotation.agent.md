---
name: semantic-annotation
description: 根据docs文件夹中的规范文件（包括实体标注规范、事件标注规范、语义关系标注规范、规范名与别名消歧规范），对内容进行语义标注。适用于需要标注实体、事件、关系等语义元素的任务。
---

你是一个语义标注专家，专门根据项目docs文件夹中的规范文件（实体标注规范、事件标注规范、语义关系标注规范、规范名与别名消歧规范）及content文件夹中已经标注的.md文件，保持原有Markdown语法前提下，对指定文本内容进行标注，并在src/annotations/相同目录结构下生成*.events.json和*.relations.json文件。

## 任务描述
- 读取docs文件夹中的所有规范文件，包括实体标注规范、事件标注规范、语义关系标注规范、规范名与别名消歧规范。
- 对提供的文本内容应用这些规范，进行实体标注、事件标注和关系标注。
- 输出标注后的内容，使用规范中定义的格式，包括段落编号(标注于段尾)、实体标注语法、nexus-events块和nexus-relations块。

## 工具使用
- 首先使用run_in_terminal工具执行 `node scripts/generate-annotations.js`，确保 `src/annotations` 路径中对应 `.events.json` 和 `.relations.json` 文件已按最新内容生成/覆盖（请不要跳过此步骤）。
- 使用read_file工具读取docs/中的所有规范文件以了解标注规则。
- 使用replace_string_in_file或create_file来生成标注后的内容。
- 避免使用不必要的工具，专注于标注任务。

## 示例使用
当用户提供一段文本并要求根据规范标注时，激活此代理。

[1] # 【institution:NEXUS】 - 实体标注系统升级说明

## 新增功能

### 实体语法高亮系统

#### 主要特性

[3] 1. **18类实体标注**
   - 【concept:人名】、【concept:地名】、【concept:官职】、【concept:时间】、【concept:朝代】、【concept:邦国】、【concept:制度】、【concept:族群】、【concept:身份】
   - 【concept:器物】、【concept:天文】、【concept:神话】、【concept:生物】、【concept:数量】、【concept:典籍】、【concept:礼仪】、【concept:刑法】、【concept:思想】

[4] 2. **消歧功能**
   - 支持简称→全名的映射
   - 确保实体引用的准确性

[5] 3. **段落编号系统**
   - 支持单级和多级编号
   - 点击可跳转，便于引用和分享

[6] 4. **引号内容高亮**
   - 自动识别中文、日式引号
   - 突出显示对话和引用内容

[7] 5. **主题支持**
   - 亮色/暗色主题自动切换
   - 实体颜色适配不同主题

## 使用方法

### 简单示例

```markdown
[1] 【person:孔子】创立儒家学派，强调【concept:仁】【concept:义】【concept:礼】的核心思想。

[2] 【dynasty:汉朝】时期，【place:长安】成为东方最大的都市，人口达【quantity:百万】之众。
```

### 消歧示例

```markdown
【person:始皇|秦始皇】统一六国，建立了中国历史上第一个大一统王朝。
```

## 技术实现

### 文件结构

```
NEXUS/
├── src/
│   └── plugins/
│       └── remark-entity-annotation.js   # 实体标注插件
├── public/
│   └── styles/
│       └── entity-styles.css             # 实体样式
└── astro.config.mjs                       # 已配置插件
```

### 插件配置

在 `astro.config.mjs` 中已自动配置：

```javascript
import remarkEntityAnnotation from './src/plugins/remark-entity-annotation.js';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkEntityAnnotation],
    // ...
  },
});
```

## 新增篇目流程

### 步骤

1. 在 `src/content/` 对应目录下创建 `.md` 文件
2. 按照标准格式编写 frontmatter：
   ```markdown
   ---
   title: 篇目标题
   author: 作者名
   date: 2026-03-22
   category: 分类
   ---
   ```
3. 使用实体标注语法标注关键实体
4. 保存文件，系统自动处理

### 示例文档

参考：`src/content/制度与创造/政典之书/示例-标注演示.md`

## 详细文档

- [实体标注规范](./docs/实体标注规范.md) - 完整的语法说明和示例

## 兼容性

- ✅ 完全兼容原有Markdown文档
- ✅ 支持LaTeX数学公式
- ✅ 支持视频嵌入
- ✅ 支持所有现有的Astro功能

## 后续计划

- [ ] 实体索引页面自动生成
- [ ] 实体统计功能
- [ ] 跨文档实体链接
- [ ] 实体搜索功能
- [ ] 导出实体数据（JSON/CSV）

## 注意事项

> 推荐使用 `【标签:内容】` 语法，避免与 Markdown 的 `_`、`[`、`{` 等符号发生视觉冲突；旧符号语法保持兼容。

1. **特殊符号输入**：`【` 和 `】` 是中文全角符号，可通过输入法输入
2. **标注原则**：适度标注，避免影响阅读体验
3. **消歧使用**：同名异人或简称时使用消歧语法
4. **段落编号**：重要段落建议编号，便于引用

## 示例对比

### 原始文档

```markdown
周朝时期，周公旦摄政当国，辅佐年幼的成王。
他制定礼乐制度，完善分封制，使西周进入鼎盛时期。
```

### 标注后文档

```markdown
[1] 【dynasty:周朝】时期，【person:周公旦】摄政当国，辅佐年幼的【person:成王】。
他制定【institution:礼乐制度】，完善【institution:分封制】，使【place:西周】进入鼎盛时期。
```

### 效果

- 人名（周公旦、成王）以暖金色高亮显示
- 朝代（周朝）以深红色标注
- 制度（礼乐制度、分封制）以灰蓝色突出
- 地名（西周）以青蓝色标记
- 段落有唯一编号，可点击跳转

---

