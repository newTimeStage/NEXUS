---
title: Markdown语法测试
author: 测试者
date: 2024-01-01
category: 测试
---

# Markdown语法测试

这是一个测试文件，包含了所有可能的Markdown语法，用于测试渲染效果。

## 1. 基本文本格式化

**加粗文本**

*斜体文本*

***加粗斜体文本***

~~删除线文本~~

## 2. 标题层级

# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

## 3. 列表

### 3.1 无序列表

- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2
    - 孙项目 2.2.1
    - 孙项目 2.2.2

### 3.2 有序列表

1. 第一项
2. 第二项
   1. 子项 2.1
   2. 子项 2.2
      1. 孙项 2.2.1
      2. 孙项 2.2.2

### 3.3 任务列表

- [x] 已完成任务
- [ ] 未完成任务
- [x] 另一个已完成任务

## 4. 链接

[普通链接](https://example.com)

[带标题的链接](https://example.com "示例网站")

<https://example.com>  <!-- 自动链接 -->

## 5. 图片

![示例图片](https://example.com/image.jpg "示例图片标题")

## 6. 代码

### 6.1 行内代码

这里有一段 `行内代码` 示例。

### 6.2 代码块

```python
# Python代码示例
def hello():
    print("Hello, world!")
    return True
```

```javascript
// JavaScript代码示例
function hello() {
    console.log("Hello, world!");
    return true;
}
```

## 7. 引用

> 这是一段引用文本。
>
> 引用可以有多行。

### 嵌套引用

> 外层引用
> > 内层引用
> > > 最内层引用

## 8. 水平线

---

## 9. 表格

| 姓名 | 年龄 | 职业 |
|------|------|------|
| 张三 | 25   | 工程师 |
| 李四 | 30   | 设计师 |
| 王五 | 35   | 产品经理 |

## 10. 脚注

这是一个带有脚注的句子[^1]。

[^1]: 这是脚注的内容。

## 11. 定义列表

术语 1
: 术语 1 的定义
: 术语 1 的另一个定义

术语 2
: 术语 2 的定义

## 12. 数学公式

行内公式：$E = mc^2$

块级公式：

$$
E = mc^2
$$

## 13. 视频（通过自定义插件支持）

![示例视频](https://example.com/video.mp4)

## 14. 自动链接

https://example.com

## 15. 转义字符

\* 这不是斜体文本 \*

\` 这不是行内代码 \`

\[ 这不是链接 \]

## 16. 特殊字符

© 版权符号

® 注册商标

™ 商标

## 17. 段落和换行

这是第一个段落。

这是第二个段落，通过空行分隔。

这是一行文本，\
通过反斜杠实现换行。

## 18. 行内HTML

<p style="color: blue;">这是通过行内HTML添加的蓝色文本。</p>

## 19. 代码高亮

```javascript
// 带语法高亮的JavaScript代码
const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 输出: 15
```

```python
# 带语法高亮的Python代码
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Hello, my name is {self.name}"
```

## 20. 综合示例

### 项目说明

这是一个 **综合性** 的 Markdown 语法测试，包含了所有常见的 Markdown 语法元素。

#### 功能特点

1. 支持 **所有标准 Markdown 语法**
2. 支持 **扩展语法**（表格、脚注、定义列表等）
3. 支持 **数学公式**（通过 KaTeX）
4. 支持 **代码高亮**（通过 Shiki）
5. 支持 **视频嵌入**（通过自定义插件）
6. 响应式设计，适配不同屏幕尺寸
7. 支持亮色和暗色主题

#### 使用方法

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建静态网站
npm run build
```

> 注意：本测试文件用于验证 Markdown 渲染功能的完整性。

---

**测试完成** ✅