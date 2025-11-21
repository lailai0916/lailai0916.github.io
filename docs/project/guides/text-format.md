# lailai's Text Format Guide

本文是我的文本格式指南。

## 参考资料

- [格式手册 - OI Wiki](https://oi-wiki.org/intro/format/)
- [标点符号用法（GB/T 15834—2011）](http://www.moe.gov.cn/jyb_sjzl/ziliao/A19/201001/W020190128580990138234.pdf)
- [中文出版物夹用英文的编辑规范（CY/T 154-2017）](https://www.nppa.gov.cn/xxgk/fdzdgknr/hybz/202210/P020221004608768453140.pdf)
- [维基百科:格式手册/标点符号 - 维基百科](https://zh.wikipedia.org/zh-cn/Wikipedia:格式手册/标点符号)
- [中文文案排版指北（简体中文版） - 码志](https://mazhuang.org/wiki/chinese-copywriting-guidelines/)
- [中文文案风格指南 - PDFE GUIDELINE](https://pdfe.github.io/GUIDELINE/#/others/copywriter)
- [一份（不太）简短的 LaTeX2ε 介绍 - CTeX-org/lshort-zh-cn - GitHub](https://github.com/CTeX-org/lshort-zh-cn)

## 通用

### 文件

- 文件应使用 **UTF-8** 编码。
- 文件末尾应以 $1$ 个 **空行** 结束。
- 文件开头应有一段简短的 **内容概述**，例如「本文将介绍……」。
- 对于尚未撰写或未完成的内容，应使用 `[TODO]` 标记。

### 文件名

- 文件名应遵循 **kebab-case**（仅包含 **小写字母** 和 **数字**），避免使用大写字母和中文。
- 文件名的语义应使用 **英文单词** 和 **缩写**，避免使用汉语拼音。
- 文件名包含多个部分时，应使用 **连字符**（`-`）分隔，避免使用下划线（`_`），例如 `text-format.md`。

## 空格

[TODO]

## 标点

- 每句话的末尾应添加 **句号**。
- 注意区分各种不同的 **连接号**：
  - `-`（U+002D，hyphen，连字符）；
  - `–`（U+2013，en dash，短破折号）；
  - `—`（U+2014，em dash，长破折号）。
- 名称和术语首次出现时，使用 `中文（原文，缩写）` 的格式，例如：「最大公约数（Greatest Common Divisor，GCD）」。

## 用词

[TODO]

## Markdown

### 缩进

- Markdown 文本应使用 $2$ **空格** 缩进。

### 标题

- 每篇文本最多只能有 $1$ 个 **一级标题**，其余内容只应使用 **二级、三级、四级标题**，避免使用 **五级、六级标题**。

## LaTeX

- 行间公式前后的两个美元符号（$）应单独一行。
