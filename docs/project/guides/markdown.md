# Markdown 指南

本文为 Markdown 使用指南，仅说明语法规则，不包含格式与排版建议。

## 参考资料

- [Daring Fireball: Markdown](https://daringfireball.net/projects/markdown/)
- [Markdown - 维基百科](https://zh.wikipedia.org/zh-cn/Markdown)
- [Markdown 书写风格指南](http://einverne.github.io/markdown-style-guide/zh.html)
- [洛谷 Markdown 格式手册 | 洛谷帮助中心](https://help.luogu.com.cn/rules/academic/handbook/markdown)
- [Markdown style guide - google/styleguide - GitHub](https://github.com/google/styleguide/blob/3591b2e540cbcb07423e02d20eee482165776603/docguide/style.md)

## 简介

2004 年，John Gruber 创造了 Markdown，一种专门针对网络写作的文本标记语言。使用 Markdown，你只需在写作过程中插入少量的标记符号，就能很轻松地进行排版（例如设置标题、加粗、列表、引用等）。

Markdown 文档以纯文本格式存储，这意味着，它们可以用几乎任一文本编辑器打开。同时，又能通过 Markdown 编辑器导出为带排版的富文本文档、HTML 网页等等。纯粹、简洁、易用、灵活，都是人们喜欢 Markdown 的原因。

推荐一个我常用的 Markdown 排版软件 [Typora](https://typora.io)。

## 段落

一个 **段落** 是由一个或多个连续的 **文本行** 组成，它的前后要有至少一个的 **空行**。

```markdown
第一段
第一句
第二句

第二段
第三句
第四句
```

<BrowserWindow>

第一段
第一句
第二句

第二段
第三句
第四句

</BrowserWindow>

## 标题

使用井号（`#`）表示 **标题**，$1\sim 6$ 个井号（`#`）分别对应 $1\sim 6$ 级标题。

```markdown
# 一级标题示例

## 二级标题示例

### 三级标题示例

#### 四级标题示例

##### 五级标题示例

###### 六级标题示例

普通文本示例
```

<BrowserWindow>

<h1>一级标题示例</h1>

<h2>二级标题示例</h2>

<h3>三级标题示例</h3>

<h4>四级标题示例</h4>

<h5>五级标题示例</h5>

<h6>六级标题示例</h6>

普通文本示例

</BrowserWindow>

## 强调

### 加粗

使用 **两个星号**（`**`）或 **下划线**（`__`）包围文字表示 **加粗**。

```markdown
这是一个 **加粗** 示例。
```

<BrowserWindow>

这是一个 **加粗** 示例。

</BrowserWindow>

### 斜体

使用 **一个星号**（`*`）或 **下划线**（`_`）包围文字表示 **斜体**。

```markdown
这是一个 _斜体_ 示例。
```

<BrowserWindow>

这是一个 _斜体_ 示例。

</BrowserWindow>

### 删除线

使用 **两个波浪线**（`~~`）包围文字表示 **删除线**。

```markdown
这是一个 ~~删除线~~ 示例。
```

<BrowserWindow>

这是一个 ~~删除线~~ 示例。

</BrowserWindow>

:::tip

推荐使用 **两个星号**（`**`）表示 **加粗**；**一个下划线**（`_`）表示 **斜体**。

:::

## 代码块

### 行内代码

使用 **一个反引号**（`` ` ``）表示 **行内代码**。

```markdown
`Lorem ipsum`
```

<BrowserWindow>

`Lorem ipsum`

</BrowserWindow>

### 行间代码

使用 **三个反引号**（` ``` `）表示 **行间代码**。

````markdown
```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
	cout<<"Hello, world!"<<'\n';
	return 0;
}
```
````

<BrowserWindow>

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
	cout<<"Hello, world!"<<'\n';
	return 0;
}
```

</BrowserWindow>

## 列表

### 无序列表

使用 **一个连接符**（`-`）、**星号**（`*`）或 **加号**（`+`）表示 **无序列表**。

```markdown
- 无序列表 1
- 无序列表 2
- 无序列表 3
```

<BrowserWindow>

- 无序列表 1
- 无序列表 2
- 无序列表 3

</BrowserWindow>

:::tip

推荐使用 **分隔符**（`-`）表示 **无序列表**。

:::

### 有序列表

使用 **数字和句点** 表示 **有序列表**。

```markdown
1. 有序列表 1
2. 有序列表 2
3. 有序列表 3
```

<BrowserWindow>

1. 有序列表 1
2. 有序列表 2
3. 有序列表 3

</BrowserWindow>

### 任务列表

使用 `[ ]` 或 `[x]` 表示 **任务列表**。

```markdown
- [x] 任务列表 1
- [ ] 任务列表 2
- [x] 任务列表 3
```

<BrowserWindow>

- [x] 任务列表 1
- [ ] 任务列表 2
- [x] 任务列表 3

</BrowserWindow>

## 链接

使用 `[链接文本](链接地址)` 插入 **链接**。

```markdown
[Apple](https://www.apple.com)
```

<BrowserWindow>

[Apple](https://www.apple.com)

</BrowserWindow>

## 图片

使用 `![替代文本](图片链接)` 插入 **图片**。

```markdown
![The Apple Store Shopping Event](https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ase-header-hero-202511?wid=1392&hei=640&fmt=png-alpha&.v=YnRtS1pvZW0xTkRGTDArTFMxM1dkK2Y5c091MFJuNmVhOUl2Q2RwT0ZMOXZtdlBGOXJXZFNaUWV3K0pQbC96YXV3M2NIN0pZV0NOZE9oVm8rOFczOVM3MzU2aDRJWlJuTHd3RzJsT3JDc0k)
```

<BrowserWindow>

![The Apple Store Shopping Event](https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ase-header-hero-202511?wid=1392&hei=640&fmt=png-alpha&.v=YnRtS1pvZW0xTkRGTDArTFMxM1dkK2Y5c091MFJuNmVhOUl2Q2RwT0ZMOXZtdlBGOXJXZFNaUWV3K0pQbC96YXV3M2NIN0pZV0NOZE9oVm8rOFczOVM3MzU2aDRJWlJuTHd3RzJsT3JDc0k)

</BrowserWindow>

## 引用

使用 **大于号**（`>`）表示 **引用**。

```markdown
> 这是一个引用示例。
```

<BrowserWindow>

> 这是一个引用示例。

</BrowserWindow>

## 表格

使用 **管道符**（`|`）划分单元格，第二行使用 **冒号**（`:`）和 **分隔符**（`-`）设置对齐方式。

```markdown
| 此行左对齐 | 此行居中对齐 | 此行右对齐 |
| :--------- | :----------: | ---------: |
| 内容 1     |    内容 2    |     内容 3 |
```

<BrowserWindow>

| 此行左对齐 | 此行居中对齐 | 此行右对齐 |
| :--------- | :----------: | ---------: |
| 内容 1     |    内容 2    |     内容 3 |

</BrowserWindow>

## 分隔线

使用 **至少三个连接符**（`-`）或 **星号**（`*`）表示 **分隔线**。

```markdown
---
```

<BrowserWindow>

---

</BrowserWindow>

:::tip

**分隔线** 内不能有其他内容，但可以插入空格。

:::
