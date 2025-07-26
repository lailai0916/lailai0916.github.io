# Markdown 模板

[Markdown](https://zh.wikipedia.org/zh-cn/Markdown) 是一种轻量级标记语言。

2004 年，John Gruber 创造了 Markdown，一种专门针对网络写作的文本标记语言。使用 Markdown，你只需在写作过程中插入少量的标记符号，就能很轻松地进行排版（例如设置标题、加粗、列表、引用等）。

Markdown 文档以纯文本格式存储，这意味着，它们可以用几乎任一文本编辑器打开。同时，又能通过 Markdown 编辑器导出为带排版的富文本文档、HTML 网页等等。纯粹、简洁、易用、灵活，都是人们喜欢 Markdown 的原因。

## 参考资料

- [Markdown 书写风格指南](http://einverne.github.io/markdown-style-guide/zh.html)
- [洛谷 Markdown 格式手册 - 洛谷帮助中心](https://help.luogu.com.cn/rules/academic/handbook/markdown)

## 推荐资源

- [Typora](https://typora.io)

## 文件扩展名

Markdown 文件的扩展名使用 `.md`。

## 段落和换行

一个 Markdown 段落是由一个或多个连续的文本行组成，它的前后要有一个以上的空行。

## 标题

使用 `#` 号来表示标题。一个 `#` 表示一级标题，两个 `#` 表示二级标题，以此类推。

```markdown
# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

普通文本
```

<BrowserWindow>

<h1>一级标题</h1>

<h2>二级标题</h2>

<h3>三级标题</h3>

<h4>四级标题</h4>

<h5>五级标题</h5>

<h6>六级标题</h6>

普通文本

</BrowserWindow>

:::warning

原则上，每篇文章应仅包含最多一个一级标题。

:::

## 强调

### 加粗

使用 `**` 或 `__` 包围文字来表示加粗。

```markdown
**双星号加粗**

<!-- or -->

**双下划线加粗**
```

<BrowserWindow>

**双星号加粗**

<!-- or -->

**双下划线加粗**

</BrowserWindow>

### 斜体

使用 `*` 或 `_` 包围文字来表斜体。

```markdown
_单星号斜体_

<!-- or -->

_单下划线斜体_
```

<BrowserWindow>

_单星号斜体_

<!-- or -->

_单下划线斜体_

</BrowserWindow>

### 删除线

使用 `~~` 包围文字来表斜体。

```markdown
~~删除线~~
```

<BrowserWindow>

~~删除线~~

</BrowserWindow>

:::tip

推荐使用双星号加粗和单星号斜体。

:::

## 列表

### 无序列表

使用 `-`、`*` 或 `+` 表示无序列表。

```markdown
- 项目 1
- 项目 2
- 项目 3
<!-- or -->

* 项目 1
* 项目 2
* 项目 3
<!-- or -->

- 项目 1
- 项目 2
- 项目 3
```

<BrowserWindow>

- 项目 1
- 项目 2
- 项目 3
<!-- or -->

* 项目 1
* 项目 2
* 项目 3
<!-- or -->

- 项目 1
- 项目 2
- 项目 3

</BrowserWindow>

:::tip

推荐使用 `-` 表示无序列表。

:::

### 有序列表

使用数字加点表示有序列表。

```markdown
1. 项目 1
2. 项目 2
3. 项目 3
<!-- or -->
4. 项目 1
5. 项目 2
6. 项目 3
```

<BrowserWindow>

1. 项目 1
2. 项目 2
3. 项目 3
<!-- or -->
4. 项目 1
5. 项目 2
6. 项目 3

</BrowserWindow>

### 任务列表

使用无序列表和 `[ ]` 或 `[x]` 表示任务列表。

```markdown
- [x] 项目 1
- [ ] 项目 2
- [x] 项目 3
```

<BrowserWindow>

- [x] 项目 1
- [ ] 项目 2
- [x] 项目 3

</BrowserWindow>

## 缩进

Markdown 使用 $4$ <kbd>空格</kbd> 缩进。

## 代码块

使用反引号 `` ` `` 包围代码片段，使用三个反引号包围多行代码。

````markdown
`Lorem ipsum`

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

`Lorem ipsum`

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

## 链接

使用 `[链接文本](链接地址)` 来创建超链接。

```markdown
[Google](https://www.google.com)
```

<BrowserWindow>

[Google](https://www.google.com)

</BrowserWindow>

## 图片

使用 `![替代文本](图片地址)` 来插入图片。

```markdown
![Logo](https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png)
```

<BrowserWindow>

![Logo](https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png)

</BrowserWindow>

## 引用

使用 `>` 表示引用。

```markdown
> 这是一个引用
```

<BrowserWindow>

> 这是一个引用

</BrowserWindow>

## 分隔线

在一行中使用三个以上的 `-` 或 `*` 来建立一个分隔线。

行内不能有其他内容，但可以在星号或是减号中间插入空格。

```markdown
---
---

---

---

---
```

<BrowserWindow>

---

---

---

---

---

</BrowserWindow>

## 建议

中文与西文字符或公式之间以一个半角空格隔开，但标点符号与西文字符或公式间不要加空格。

## 扩展

### LaTeX 公式

- 详见 [LaTeX 模板](latex)

### Mermaid 图表

- 详见 [Mermaid 模板](mermaid)
