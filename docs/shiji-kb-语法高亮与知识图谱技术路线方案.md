# `shiji-kb` 项目研究：语法高亮与知识图谱技术路线方案

## 1. 研究目标

本文基于 `baojie/shiji-kb` 仓库的 README、关键源码、技术说明文档与目录结构，分析该项目实现“语法高亮”与“知识图谱”的技术原理，并整理为一份适合 `NEXUS` 项目复用和扩展的技术路线方案。

本文特别区分三件事：

1. `shiji-kb` 已经实际落地的能力
2. `shiji-kb` 已经验证可行、但仍在演进中的方案
3. 如何结合 `NEXUS` 当前的 Astro + Remark 架构做分阶段落地

---

## 2. 研究结论摘要

`shiji-kb` 的核心方法不是“运行时对正文做智能分析”，而是“先把古文做成结构化标注文本，再在编译期把标注转为可阅读、可索引、可计算的数据与页面”。

换句话说，它的成功关键不是某个单点算法，而是三层组合：

1. **标注层**：先把古文变成“轻量语义标记文本”
2. **编译层**：再把标记文本编译成 HTML、索引、JSON、关系数据
3. **应用层**：最后把这些静态产物组织成阅读器、索引页、时间线、地铁图

在这个架构下：

- “语法高亮”本质上是 **语义标注 + 编译期渲染**
- “知识图谱”本质上是 **从同一份标注语料中持续抽取实体、事件、关系、时间、结构，再输出多种静态数据视图**

`shiji-kb` 当前主路径更接近“**静态知识工程管线**”，而不是“在线图数据库系统”。README 中提到的 Neo4j 是下一阶段方向，不是现阶段主实现。

---

## 3. `shiji-kb` 的语法高亮技术原理

### 3.1 总体思路

`shiji-kb` 没有把“高亮”做成浏览器里的 NLP 功能，而是先将原文人工/AI 协作标注为 `*.tagged.md`，再用渲染脚本把标注符号替换成带语义 class 的 HTML 节点。

技术链路如下：

```text
原始古文
  -> AI/人工标注为 tagged.md
  -> render_shiji_html.py 正则编译
  -> span/a/tooltip/段落锚点
  -> CSS 负责视觉语义表达
  -> HTML 静态发布
```

这是一个非常重要的设计选择：它把“阅读体验”建立在预处理结果上，而不是把复杂性推给浏览器运行时。

### 3.2 标注格式设计

`shiji-kb` 的第一性原理是：**内容文件必须保留可读性，同时又足够结构化，便于程序提取。**

项目经历过两代标注设计：

### 3.2.1 早期轻量 Token 风格

早期文档中使用过：

- `@人名@`
- `=地名=`
- `$官职$`
- `%时间%`

优点是简洁，缺点是容易与 Markdown 原生符号冲突。

### 3.2.2 后期统一块标记风格

项目后期统一到更稳健的块式标记：

- `〖@刘邦〗` 人名
- `〖=长安〗` 地名
- `〖;丞相〗` 官职
- `〖%三年〗` 时间
- `〖'汉〗` 邦国
- `〖&刘氏〗` 氏族
- `〖^郡县制〗` 制度
- `〖#天子〗` 身份
- `〖{春秋〗` 典籍

README 与 `kg/README.md` 显示，项目最终扩展到了 **18 类名词实体**，并预留了 **动词实体** 体系。

### 3.2.3 消歧内联语法

项目还支持：

```text
〖@始皇|秦始皇〗
```

显示文本是“始皇”，语义归一到“秦始皇”。这一步很关键，因为它把“阅读展示”和“知识归一”拆开了：

- 读者看到简称，阅读流畅
- 机器使用 canonical name，便于索引、链接、聚合

### 3.3 渲染器实现机制

核心文件是：

- `render_shiji_html.py`
- `css/shiji-styles.css`

渲染器的主要工作是把标注文本编译为 HTML 语义节点。

### 3.3.1 正则替换驱动

从源码可以看出，`render_shiji_html.py` 通过一组有序正则规则完成转换，例如：

- `〖@...〗 -> <span class="person">`
- `〖=...〗 -> <span class="place">`
- `〖%...〗 -> <span class="time">`
- `〖{...〗 -> <span class="book">《...》</span>`

还支持带消歧信息的形态：

- `〖@显示名|规范名〗`

会被编译成带 `data-canonical` 的节点。

### 3.3.2 HTML 结构不是纯 span，而是“span + link + tooltip”

渲染器不只是做颜色高亮，还做了三层增强：

1. `span.className` 表达实体类型
2. `title` 提供鼠标悬停提示
3. 对时间、人名等实体进一步包成 `a.entity-link`，跳转到对应索引或编年页面

这意味着它不是“装饰性高亮”，而是“可交互的语义节点”。

### 3.3.3 Purple Numbers 段落编号

正文中的 `[1]`、`[2.1]` 会被编译成可锚定的段落编号链接：

```html
<a href="#pn-1" id="pn-1" class="para-num">1</a>
```

这套机制的价值不只是引用方便，还直接成为后续实体索引、事件索引、章节跳转的统一坐标系统。

### 3.3.4 引号、表格、注释、嵌套标记也在编译期处理

`render_shiji_html.py` 还处理了：

- 对话/引号高亮
- 表格渲染与表头处理
- 三家注对齐
- 重复嵌套标签清理
- 年份与公元映射的 tooltip

这说明 `shiji-kb` 的阅读器不是“前端套皮”，而是一个面向古籍的专用编译器。

### 3.4 样式层实现机制

样式文件 `css/shiji-styles.css` 体现了它的视觉语义设计：

- 人名：棕色 + 下划线
- 地名：金黄 + 双下划线
- 时间：青色 + 斜体
- 朝代/氏族：紫色 + 粗下划线
- 典籍/神话：波浪下划线

它并不依赖强烈底色块，而是主要使用：

- 颜色
- 下划线样式
- 文字风格
- 极轻微装饰

这类设计很适合长文本阅读，因为不会像代码编辑器那样造成视觉疲劳。

### 3.5 语法高亮的真正本质

`shiji-kb` 的“语法高亮”并不是程序语言意义上的 tokenization，而是对古文中的：

- 命名实体
- 叙事角色
- 时间表达
- 引文
- 结构锚点

进行显性化。

所以它更准确的名字应该是：

**古文语义高亮 / semantic highlighting for classical text**

---

## 4. `shiji-kb` 的知识图谱技术原理

### 4.1 总体判断

`shiji-kb` 的知识图谱不是先建数据库再喂数据，而是从标注文本逐层生长出来的。

它的构建顺序大致是：

```text
结构层
  -> 实体层
  -> 事件层
  -> 关系层
  -> 编年层
  -> 本体层
  -> 可视化层
```

这与传统“先设计 ontology，再录入实例”的路线不同。它更像 README 所说的 Agentic Ontology：先提取，再收敛，再反思修正。

### 4.2 图谱数据不是单文件，而是分层目录

`kg/README.md` 展示了完整分层：

- `kg/structure`：章节、小节、段落结构
- `kg/entities`：实体索引、别名、消歧
- `kg/events`：事件索引、事件关系、公元纪年
- `kg/relations`：人物关系网络
- `kg/chronology`：在位年与公元映射
- `kg/genealogy`：家谱
- `kg/ontology` / `rdf`：本体与 RDF 化尝试

这说明它的“知识图谱”不是单一图，而是一个多层知识资产库。

### 4.3 实体层：节点抽取与规范化

核心脚本是：

- `kg/entities/scripts/build_entity_index.py`

该脚本从 `chapter_md/*.tagged.md` 扫描实体标记，并做三件关键事情：

1. **提取**：按实体类型正则抓取标注节点
2. **归一**：加载 `entity_aliases.json` 做别名合并
3. **消歧**：结合 `disambiguation_map.json` 解决同名异人/异地问题

因此，节点不是直接按表面词形成，而是按 `canonical entity` 形成。

这一步决定了知识图谱能否真正计算。否则“沛公”“高祖”“刘邦”会被当成三个节点。

### 4.4 事件层：从叙事文本抽取事件单元

事件数据位于：

- `kg/events/data/*_事件索引.md`
- `kg/events/data/event_relations.json`

README 显示，项目已经抽取出 3,000+ 历史事件，并为大多数事件标注了公元纪年。

事件层的基本思路是：

1. 每章先抽取事件索引
2. 为每个事件挂上：
   - 事件名称
   - 事件类型
   - 时间
   - 人物
   - 地点
   - 原文段落引用
3. 再在跨章范围内做关系推断

换句话说，实体层解决“这是什么”，事件层解决“发生了什么”。

### 4.5 关系层：自动关系 + LLM 推理混合

`kg/events/README.md` 和 `kg/README.md` 显示，关系来源分两类：

### 4.5.1 自动计算关系

例如：

- `cross_ref`：不同章节记述同一事件
- `co_person`：跨章共享关键人物
- `co_location`：共享地点与人物
- `concurrent`：同年相关事件

这一类关系可以通过规则、匹配和 join 生成。

### 4.5.2 LLM 推理关系

例如：

- `sequel`：后续事件
- `causal`：因果
- `part_of`：整体-部分
- `opposition`：对立

这一类关系不是简单匹配得出，而是需要语义理解，因此项目显式把“自动关系”和“LLM 推断关系”分开统计。

这是一种很成熟的工程取舍：

- 能规则化的就规则化，保证稳定与可复验
- 需要语义判断的才交给模型，避免过度幻觉

### 4.6 编年层：把古代纪年映射到公元时间轴

项目有一条非常关键的辅助层：

- `kg/chronology/data/reign_periods.json`
- `kg/chronology/data/year_ce_map.json`

这让事件能从“某王三年”转换为“公元前 XXX 年”。

这一步不仅支撑阅读器 tooltip，也支撑：

- 时间线排序
- 跨章对齐
- 地铁图横轴布局
- 同期关系计算

因此，编年层其实是整个图谱可视化的坐标系。

### 4.7 可视化层：不是传统 force graph，而是“地铁图”

`app/metro/metro.js` 与 `kg/events/scripts/build_metro_map_data.py` 很能说明 `shiji-kb` 的应用设计哲学。

它没有优先做常见的力导向图，而是把事件图谱映射为：

- **line = 一篇章节**
- **station = 一个事件**
- **transfer = 跨章关系**

对应数据构建脚本会输出：

- `lines`
- `stations`
- `transfers`
- `chains`

并给每个站点附带：

- `id`
- `type`
- `year`
- `people`
- `locations`
- `quote`
- `chapter`
- `chapter_name`

这个选择非常高明，因为历史叙事天然有“时间线 + 篇章线”的结构。相比力导向图：

- 可读性更强
- 时间感更强
- 更适合长时段史料
- 更适合解释“跨篇章互见”

所以，`shiji-kb` 当前的“知识图谱前端主形态”并不是 RDF 浏览器，而是 **事件地铁图 + 索引页 + 时间线页**。

### 4.8 质量控制机制

`shiji-kb` 的另一个关键点是：它承认 AI 初始产物不完美，因此设计了显式反思回路。

README 与 `kg/README.md` 多次提到：

- 多轮事件年代反思审查
- 实体标注反思
- 规范迭代
- 批量修正

这意味着它不是“一次抽取完成”的管线，而是：

```text
抽取 -> 校验 -> 反思 -> 批改 -> 重建索引/图谱
```

这条闭环才是知识图谱质量能逐步提升的原因。

---

## 5. 对 `shiji-kb` 的架构判断

从工程视角看，`shiji-kb` 采用的是一条非常清晰的路线：

### 5.1 已经成熟的部分

- 预标注语料格式
- 编译期语法高亮
- 实体索引
- 事件索引
- 编年映射
- 跨章关系数据
- 地铁图可视化

### 5.2 正在扩展的部分

- 动词实体体系
- 更完整的本体与 RDF 表达
- 更深层逻辑推理
- 更多应用层实验

### 5.3 还属于未来规划的部分

- Neo4j 图数据库成为主工作底座
- 更完备的 Cypher/SPARQL 查询体系
- 更强的跨文献、跨语种图谱融合

所以如果要在 `NEXUS` 中借鉴它，最值得学的不是“直接上图数据库”，而是先学它的 **预标注 + 编译管线 + 静态知识资产** 这条主线。

---

## 6. 面向 `NEXUS` 的详细技术路线方案

### 6.1 `NEXUS` 当前基础

`NEXUS` 已经具备第一阶段能力：

- `src/plugins/remark-entity-annotation.js`
- `public/styles/entity-styles.css`
- `docs/实体标注使用指南.md`

也就是说，`NEXUS` 已经不是从零开始，而是已经拥有：

1. 实体标注语法
2. Markdown 编译期转换
3. 18 类实体样式体系
4. Purple Number 式段落编号基础

当前缺的主要不是“高亮本身”，而是高亮之后的：

- 实体索引
- 规范化别名/消歧
- 事件抽取
- 关系抽取
- 图谱 JSON 输出
- 图谱页面

### 6.2 路线总图

建议按六个阶段推进：

```text
Phase 1 统一标注协议
Phase 2 编译期实体索引
Phase 3 事件抽取与时间轴
Phase 4 关系图谱与质量校验
Phase 5 图谱可视化页面
Phase 6 本体/RDF/图数据库扩展
```

---

## 7. Phase 1：统一语义标注协议

目标：确保未来的图谱抽取有稳定输入。

### 7.1 建议

继续以 `NEXUS` 当前插件支持的前缀语法为主：

```text
〖person:孔子〗
〖place:长安〗
〖official:丞相〗
〖concept:仁义〗
```

这样比 `〖@孔子〗` 更利于：

- 人工编写
- 规则扩展
- 多人协作
- 后续脚本统一解析

### 7.2 需要补充的约束

建议增加三类规则文档：

1. **命名规范**
   - canonical 名必须唯一
   - 文中简称用 `显示名|规范名`
2. **段落编号规范**
   - 重要段落必须有 `[n]`
   - 长文按逻辑段落编号
3. **事件标注规范**
   - 先不要求显式事件标签
   - 但要求关键叙事段保留稳定编号，方便后抽取

---

## 8. Phase 2：编译期实体索引

目标：把现有实体高亮升级成可检索的实体网络入口。

### 8.1 建议新增产物

- `src/generated/kg/entity-index.json`
- `src/generated/kg/entity-aliases.json`
- `src/generated/kg/disambiguation-map.json`

### 8.2 建议新增脚本

- `scripts/build-entity-index.mjs`

职责：

1. 扫描 `src/content/**/*.md`
2. 提取所有 `〖...〗`
3. 解析 `display/canonical/type`
4. 收集出现位置
5. 输出 JSON

### 8.3 页面层建议

新增：

- `src/pages/entities/index.astro`
- `src/pages/entities/[type].astro`
- `src/pages/entities/[type]/[name].astro`

页面能力：

- 按类型浏览
- 按拼音首字母分组
- 查看别名
- 查看出现文章与段落

这一步做完，`NEXUS` 就会从“好看的高亮文章”变成“可导航的实体知识网络”。

---

## 9. Phase 3：事件抽取与时间轴

目标：把实体网络提升为事件网络。

### 9.1 最小可行事件模型

建议事件 JSON 先用如下结构：

```json
{
  "id": "evt-0001",
  "title": "武王伐纣",
  "type": "war",
  "article": "演进轨迹/...",
  "paragraphs": ["1", "1.1"],
  "time_text": "上元6691年",  // 本UEXUS项目统一使用上元纪年
  "year": 6691,
  "people": ["周武王", "纣王"],
  "places": ["牧野"],
  "summary": "周武王率诸侯伐纣并获胜"
}
```

### 9.2 抽取策略

第一阶段不要追求全自动复杂事件抽取，可采用混合方案：

1. 从段落中优先抽取已标注的人名、地名、时间
2. 按文章体裁和标题识别候选事件段
3. 对重点文章人工补一层事件索引 Markdown
4. 脚本从“事件索引文件”生成标准 JSON

这其实就是 `shiji-kb` 的经验：先让事件成为可验证的中间产物，再做大规模推理。

### 9.3 建议新增产物

- `src/generated/kg/events.json`
- `src/generated/kg/timeline.json`

### 9.4 页面层建议

- `src/pages/timeline.astro`
- `src/pages/events/[id].astro`

---

## 10. Phase 4：关系图谱与质量校验

目标：让实体和事件之间形成“边”。

### 10.1 先做规则关系

建议先实现四类稳定关系：

1. `same_paragraph`
2. `co_person`
3. `co_place`
4. `cross_ref`

这些关系可以直接由现有内容和索引生成，不依赖模型推理。

### 10.2 再做推理关系

后续再增加：

1. `causal`
2. `sequel`
3. `opposition`
4. `part_of`

这一层建议不要直接在页面运行模型，而是离线生成关系草稿，再人工/半自动审查。

### 10.3 建议新增脚本

- `scripts/build-relations.mjs`
- `scripts/validate-kg.mjs`

校验内容建议至少包括：

- canonical name 是否存在
- 段落锚点是否有效
- 时间字段是否合法
- 关系两端节点是否存在
- 同名实体是否未消歧

---

## 11. Phase 5：图谱可视化页面

目标：把知识图谱变成用户能探索的界面，而不是只停留在 JSON。

### 11.1 不建议第一步直接上 force-directed graph

原因和 `shiji-kb` 一样：

- 历史文本本质是时间叙事
- 强力导向图容易乱
- 用户难以理解边的语义

### 11.2 建议优先顺序

1. **时间线视图**
   - 最容易落地
   - 与史料阅读天然一致
2. **章节事件轨道图 / 地铁图**
   - 最适合表达跨章联系
3. **实体关系网**
   - 适合人物网络、师承网络、家谱网络

### 11.3 NEXUS 里可优先落地的页面

- `src/pages/graph/timeline.astro`
- `src/pages/graph/metro.astro`
- `src/pages/graph/network.astro`

前端建议：

- 用 Astro 页面承载
- 客户端局部交互用原生 JS 或轻量组件
- 数据直接读 `src/generated/kg/*.json`

---

## 12. Phase 6：本体、RDF 与图数据库扩展

目标：把静态知识资产进一步开放给程序化查询。

### 12.1 顺序建议

先做：

- JSON-LD / RDF 导出
- 可验证的 ontology 草案

再考虑：

- Neo4j
- GraphQL 层
- SPARQL/Cypher 查询页

### 12.2 原因

对 `NEXUS` 而言，现阶段最稀缺的是“高质量结构化语料”，不是数据库本身。过早引入图数据库，容易把精力消耗在基础设施，而不是抽取规范与质量闭环。

---

## 13. 推荐的 NEXUS 文件布局

建议新增如下目录：

```text
scripts/
  build-entity-index.mjs
  build-events.mjs
  build-relations.mjs
  validate-kg.mjs

src/generated/kg/
  entity-index.json
  entity-aliases.json
  disambiguation-map.json
  events.json
  relations.json
  timeline.json

src/pages/entities/
  index.astro
  [type].astro
  [type]/[name].astro

src/pages/graph/
  timeline.astro
  metro.astro
  network.astro
```

---

## 14. 实施优先级建议

### 14.1 一期 MVP

1. 统一前缀标注语法
2. 编译期实体索引 JSON
3. 实体索引页面
4. 段落深链稳定化

### 14.2 二期

1. 事件 JSON
2. 时间线页面
3. 规则关系生成

### 14.3 三期

1. 地铁图/章节轨道图
2. 别名消歧后台脚本
3. 关系校验与修正规范

### 14.4 四期

1. RDF/JSON-LD 导出
2. 图数据库实验
3. 更复杂的推理关系

---

## 15. 风险与注意事项

### 15.1 最大风险不是前端，而是规范漂移

只要标注规范不稳定：

- 实体索引会反复失真
- 事件抽取难以复用
- 关系质量无法收敛

所以必须把“标注规范”和“消歧规则”视为第一等资产。

### 15.2 不要把关系推理过早交给大模型

建议遵循 `shiji-kb` 的经验：

- 先做规则关系
- 再做模型推理关系
- 推理结果必须可审查、可回写、可重建

### 15.3 静态产物优先

对 `NEXUS` 这类内容站点来说：

- 静态 JSON
- 静态 HTML
- 编译期脚本

比一开始上在线数据库更稳、更可控、更便于部署。

---

## 16. 最终建议

如果只提炼一句最值得借鉴的话，那就是：

**先把文本做成“可编译的语义内容”，再谈图谱与应用。**

`shiji-kb` 的经验说明：

1. 语法高亮不是 UI 小功能，而是知识工程入口
2. 知识图谱不是先建库，而是从标注文本逐层长出来
3. 编译期产物是连接阅读体验与知识计算的中间层

对 `NEXUS` 来说，最合理的路线不是直接复制它的全部工程，而是沿着以下顺序推进：

**标注协议标准化 -> 实体索引 -> 事件化 -> 关系化 -> 图谱可视化 -> 本体化**

这条路径既与 `shiji-kb` 的成熟经验一致，也和 `NEXUS` 当前已具备的 Astro/Remark 基础最匹配。

---

## 17. 主要研究来源

- 仓库首页与 README
  <https://github.com/baojie/shiji-kb>
- 语法高亮渲染器
  <https://raw.githubusercontent.com/baojie/shiji-kb/main/render_shiji_html.py>
- 阅读器样式
  <https://raw.githubusercontent.com/baojie/shiji-kb/main/css/shiji-styles.css>
- 项目作者技术说明：语法高亮创造过程
  <https://raw.githubusercontent.com/baojie/shiji-kb/main/resources/publications/notes/%E5%8F%B2%E8%AE%B0%E8%AF%AD%E6%B3%95%E9%AB%98%E4%BA%AE%E5%88%9B%E9%80%A0%E8%BF%87%E7%A8%8B.md>
- 项目作者技术说明：阅读器重构与语义排版
  <https://raw.githubusercontent.com/baojie/shiji-kb/main/resources/publications/draft/%E5%8F%B2%E8%AE%B0%E9%98%85%E8%AF%BB%E5%99%A8%E9%87%8D%E6%9E%84%E4%B8%8E%E8%AF%AD%E4%B9%89%E6%8E%92%E7%89%88.md>
- 知识图谱总览
  <https://raw.githubusercontent.com/baojie/shiji-kb/main/kg/README.md>
- 事件层说明
  <https://raw.githubusercontent.com/baojie/shiji-kb/main/kg/events/README.md>
- 关系层说明
  <https://raw.githubusercontent.com/baojie/shiji-kb/main/kg/relations/README.md>
- 结构层说明
  <https://raw.githubusercontent.com/baojie/shiji-kb/main/kg/structure/README.md>
- 实体索引构建脚本
  <https://raw.githubusercontent.com/baojie/shiji-kb/main/kg/entities/scripts/build_entity_index.py>
- 地铁图数据构建脚本
  <https://raw.githubusercontent.com/baojie/shiji-kb/main/kg/events/scripts/build_metro_map_data.py>
- 地铁图前端脚本
  <https://raw.githubusercontent.com/baojie/shiji-kb/main/app/metro/metro.js>
