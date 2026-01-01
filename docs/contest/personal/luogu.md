# 洛谷题目

本文为我的洛谷 **题解模板** 和 **搬题记录**。

[洛谷](https://www.luogu.com.cn) 的 [咕值系统](https://help.luogu.com.cn/manual/luogu/account/guzhi) 有一个 **社区贡献** 指标，满分为 $100$ 分，其中 $70$ 分来自 **题解**，$30$ 分来自 **搬题**。

每搬运 $1$ 道主题库题目可获得 $1$ 分 **永久** 咕值，搬满 $30$ 道题即可拿满 **搬题** 部分的 $30$ 分咕值。

## 参考资料

- [洛谷主题库题目规范 | 洛谷帮助中心](https://help.luogu.com.cn/rules/academic/problem-standard)
- [洛谷主题库题解规范 | 洛谷帮助中心](https://help.luogu.com.cn/rules/academic/solution-standard)
- [如何用 Markdown 和 LaTeX 写一篇排版整齐的题解？ | 洛谷帮助中心](https://help.luogu.com.cn/rules/academic/guide/solution)

## 题解

### 题解模板

````markdown
[![](https://img.shields.io/badge/Luogu-{pid}-blue?style=for-the-badge&logo=luogu)](https://www.luogu.com.cn/problem/{pid})
[![](https://img.shields.io/badge/Luogu-Solution-blue?style=for-the-badge&logo=luogu)](https://www.luogu.com.cn/article/{aid})
[![](https://img.shields.io/badge/Blog-Solution-blue?style=for-the-badge&logo=markdown)](https://lailai.one/blog/solution/{pid})

## 参考资料

## 题意简述

## 基础知识

## 解题思路

## 参考代码

```cpp

```
````

:::tip

**参考资料、题意简述、基础知识、解题思路** 等板块可以按需使用。

:::

### 洛谷 P1001 A+B Problem

<Problem id="P1001" />

<details>
<summary>Solution</summary>

<Tabs>
<TabItem value="题解示例">

````markdown
[![](https://img.shields.io/badge/Luogu-P1001-blue?style=for-the-badge&logo=luogu)](https://www.luogu.com.cn/problem/P1001)
[![](https://img.shields.io/badge/Luogu-Solution-blue?style=for-the-badge&logo=luogu)](https://www.luogu.com.cn/article/a1b2c3d4)
[![](https://img.shields.io/badge/Blog-Solution-blue?style=for-the-badge&logo=markdown)](https://lailai.one/blog/solution/P1001)

## 参考资料

- [加法 - 维基百科](https://zh.wikipedia.org/zh-cn/加法)

## 题意简述

给定两个整数 $a,b$，求它们的和。（$|a|,|b| \le {10}^9$）

## 基础知识

加法是基本的算术运算之一，两个自然数相加是将他们组合起来的总量。

## 解题思路

使用 `cin` 读入两个整数，使用 `cout` 输出它们的和。

## 参考代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
	int a,b;
	cin>>a>>b;
	cout<<a+b<<'\n';
	return 0;
}
```
````

</TabItem>
<TabItem value="效果展示">

<BrowserWindow>

[![](https://img.shields.io/badge/Luogu-P1001-blue?style=for-the-badge&logo=codeforces)](https://www.luogu.com.cn/problem/P1001)
[![](https://img.shields.io/badge/Luogu-Solution-blue?style=for-the-badge&logo=markdown)](https://www.luogu.com.cn/article/a1b2c3d4)
[![](https://img.shields.io/badge/Blog-Solution-blue?style=for-the-badge&logo=markdown)](https://lailai.one/blog/solution/P1001)

<h2>参考资料</h2>

- [加法 - 维基百科](https://zh.wikipedia.org/zh-cn/加法)

<h2>题意简述</h2>

给定两个整数 $a,b$，求它们的和。（$|a|,|b| \le {10}^9$）

<h2>基础知识</h2>

加法是基本的算术运算之一，两个自然数相加是将他们组合起来的总量。

<h2>解题思路</h2>

使用 `cin` 读入两个整数，使用 `cout` 输出它们的和。

<h2>参考代码</h2>

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
	int a,b;
	cin>>a>>b;
	cout<<a+b<<'\n';
	return 0;
}
```

</BrowserWindow>

</TabItem>
</Tabs>

</details>

### 提示词

以下提示词可用于 AI 专栏审核。

```text title="提示词"
请你严格遵循《洛谷主题库题解规范》审核题解，列出违反规范的条目和具体位置。

# 洛谷主题库题解规范

## 前言

随着题解审核工作的不断发展，原有的题解审核及反馈要求已经不再满足当前的需求。

本文将对一系列题解规范相关的内容进行**整合**，形成一套适用于当前洛谷的完整的规范，帮助用户快速熟悉题解的创作与提交流程。

## 声明

## 基本规范

- 请正确使用**全角中文**标点符号。特别地，句末要有**句号**。
- 数学公式（运算式、运算符、参与运算的常数、作为变量的字母等）应使用 LaTeX，非数学公式（一般英文单词、题目名、算法名、人名等）不应使用 LaTeX。
- **中文**与**英文、数字或公式**之间以半角空格隔开，但**中文标点符号**与**英文、数字或公式**之间不应有空格。

## 题解内容

- 应只包含题目相关内容，包括但不限于题意简述、题目分析等；不应出现大量无关内容，包括但不限于闲聊、吐槽、加戏、求赞、求管理员通过、「蒟蒻的第一篇题解」等内容。
- 对于题面较长的题目，**建议**加入题意简述，但不应完整复制题面至题解中。
- 题目分析中**必须**包含做这一道题目的主要思路，包括但不限于：使用了什么算法或数据结构，以及对于相应算法或者数据结构的具体分析。
- 题目分析应给出完整正确的解法与说明，并对解法中的重要结论进行解释与证明。给出的解法应能够在合理的时间复杂度内通过题目。
- 可以使用视频链接的功能对题解文字内容做补充说明，但是题解的文字部分必须是完整充分的，不能提交仅含有视频而没有其他说明的题解。
- 如果需要引用一些来自他人的内容，请确保**不会侵犯**他人的版权，并且**必须使用**链接标注来源。
- 关键思路、论证过程、代码等内容不得使用生成式 AI 辅助产生。
- 如使用生成式 AI 辅助写作（排版、润色），必须在文末（或附录中）明确披露生成式 AI（GenAI）的具体贡献。[具体规范](./ai-assisted-article-writing.md)

## 排版

- 应使用 markdown 正确排版。
- 应使用 `#, ##, ###, ####` 符号表示标题行。标题应对文章结构进行引导；不应滥用标题行表示强调与无意义内容。
- 应使用 `-, +, *` 来表示无序列表，用 `1.` 来表示有序列表。
- 应使用行内代码块表示字符串或代码，如 `aabc`。
- 应使用行间代码块引用代码。
- 应使用 `[]()` 引用链接，如 [题解审核及反馈要求](https://www.luogu.com.cn/discuss/174934)（`[题解审核及反馈要求](https://www.luogu.com.cn/discuss/174934)`）。
- 应使用 `![]()` 引用图片，如 `![](https://cdn.luogu.com.cn/upload/pic/22071.png)`。

## 数学公式

- 数学公式（运算式、运算符、参与运算的常数、作为变量的字母等）应使用 LaTeX。**同一个数学公式应写在一个 LaTeX 环境内。**
- 数学公式中的文本应使用 `\text`，字符串应使用 `\texttt`。如 $a \text{ is prime}$（`$a \text{ is prime}$`），$S = \texttt{aabcd}$（`$S = \texttt{aabcd}$`）。
- 公式独立成行时应使用行间公式。

$$a + b = c$$

- 数学公式中应使用数学语言而非代码语言。
  - 赋值语句 `a = b;` 可以写作 $a \gets b$（`$a \gets b$`）或 $b \to a$（`$b \to a$`）。
  - 判定语句应使用 $=, \ne, <, \le, >, \ge$（`$=, \ne, <, \le, >, \ge$`）与艾佛森括号（$[P]$ 当 $P$ 为真时取值为 $1$，$P$ 为假时取值为 $0$）进行描述。
  - 整除应使用 $\lfloor \frac{a}{b} \rfloor, \lfloor a / b \rfloor, \lfloor a \div b \rfloor$（`$\lfloor \frac{a}{b} \rfloor, \lfloor a / b \rfloor, \lfloor a \div b \rfloor$`），不应使用 $\frac{a}{b}$ 或 $a/b$ 直接表示整除。
  - 取模应使用 $a \bmod b$（`$a \bmod b$`） 或 $a \equiv b \pmod p$（`$a \equiv b \pmod p$`）。
  - 不应出现 $a.b$ 等结构体式的写法，如有需要可以使用上下标表示。
  - 位运算应使用 $\operatorname{and}, \operatorname{or}, \operatorname{xor}$（`$\operatorname{and}, \operatorname{or}, \operatorname{xor}$`）。特别地，对于状态压缩 DP 等一类常用位运算实现集合运算的代码，建议在题解中用**集合语言**直接描述。以下是一个例子：

$$dp_{S \cup \{u\}} \gets dp_{S}+w_u$$

- 上下标应使用 $a _ {b} ^ {c}$（`$a _ {b} ^ {c}$`）进行表示。
- 大数字应使用科学计数法表示，如 $5 \times 10 ^ 9$。
- 时间复杂度的大 $O$ 记号中不应带有常数，如有值域、字符集大小等常量，应使用字母进行表示。
- 应正确使用运算符，如 $+, -, \pm, \times, \cdot, \div, \le, \ge, \mid$（`$+, -, \pm, \times, \cdot, \div, \le, \ge, \mid$`）。
- 特定的、约定俗成的函数名称应该使用正体，如 $\gcd, \max, \min, \log, \det$（`$\gcd, \max, \min, \log, \det$`）。特别地，对于一些未定义的函数，应使用 `\operatorname`，如 $\operatorname{lcm}$（`\operatorname{lcm}`）。
- 应正确使用大型运算符，如 $\sum, \prod, \bigcup, \bigcap$（`$\sum, \prod, \bigcup, \bigcap$`）。建议在可能引起误解的地方加上括号。
- 应正确使用取模符号。
  - 取模运算应使用 `\bmod`，如 $a \bmod b = c$（`$a \bmod b = c$`）。
  - 同余符号应使用 `\equiv` 与 `\pmod`，如 $a \equiv c \pmod b$（`$a \equiv c \pmod b$`）。
- 应正确使用数学结构符号，如 $\frac{a}{b}, \sqrt{a}, \overline{a}, \{a\}$（`$\frac{a}{b}, \sqrt{a}, \overline{a}, \{a\}$`）。
- 应正确使用箭头符号，用 $\to, \gets$（`$\to, \gets$`）表示赋值，用 $\Leftarrow, \Rightarrow$（`$\Leftarrow, \Rightarrow$`）表示因果关系。
- 省略号应使用 $\dots, \cdots, \ldots$（`$\dots, \cdots, \ldots$`），特别地，矩阵中其他方向的省略号应使用 $\vdots, \ddots$（`$\vdots, \ddots$`）。
- 波浪线应使用 $\sim$（`$\sim$`）。
- 连等式应使用 `\aligned` 环境，分段函数应使用 `\cases` 环境，矩阵应使用 `\bmatrix` 环境。以下是一些例子：

$$\begin{aligned} \sum _ {i = 1} ^ n \sum _ {j = 1} ^ n \gcd(i, j) &= \sum _ {i = 1} ^ n \sum _ {j = 1} ^ n \sum _ {d \mid \gcd(i, j)} \varphi(d) \\ &= \sum _ {d = 1} ^ n \varphi(d) \sum _ {i = 1} ^ n \sum _ {j = 1} ^ n [d \mid \gcd(i, j)] \\ &= \sum _ {d = 1} ^ n \varphi(d) \sum _ {i = 1} ^ n \sum _ {j = 1} ^ n [d \mid i][d \mid j] \\ &= \sum _ {d = 1} ^ n \varphi(d) \left\lfloor \frac{n}{d} \right\rfloor ^ 2 \end{aligned}$$

$$\lvert 2x - 1 \rvert = \begin{cases} 2x - 1 & x > \frac{1}{2} \\ 0 & x = \frac{1}{2} \\ 1 - 2x & x < \frac{1}{2} \end{cases}$$

$$\begin{bmatrix} f_{i + 1} \\ f_i \end{bmatrix} = \begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix} \times \begin{bmatrix} f_i \\ f_{i - 1} \end{bmatrix}$$

- 更多的符号与记号可以参考 [LaTeX Mathematical Symbols](https://ipic.luogu.com.cn/docs/latex-symbols.pdf)。

## 图片与代码

- 题解中引用的图片应简洁、清晰、美观，图片中的文本也需要满足格式要求。请不要引用带有链接的图片。
- 建议题解附有代码，可以在题目分析中穿插给出，也可以在题目分析后完整给出。
- 过长的代码不应放在题解中。如有必要，请使用洛谷云剪贴板。
- 代码应具有一定的可读性，可以适当添加有意义的注释进行阐释。
- 解法不应只在代码注释中描述，应在代码外使用正常文字书写。
- 若需引用他人代码，请请确保**不会侵犯**他人的版权，并且**必须使用**链接标注来源，位置建议放于代码之前。
- **不应在代码中加入防抄袭内容。**

## 提交与审核

- 请在文章编辑页点击【提交题解】按钮，具体见[个人文章功能-申请提交为题解](../../../manual/luogu/article#submit-solution)。
- 提交审核时应确保题解符合以上规范。
- 提交审核后，一般情况下，题解将于七天内被审核。如果超过七天仍未被审核，可以私信管理提醒，**七天内禁止催审**。
- 若题解被打回，应按照规范与反馈进行修改。多次打回后仍未实质性修改将会封禁专栏权限。
- 当一道题的题解数目较多时，管理员会关闭该题的题解提交通道。如果认为自己的题解可以被采纳，可以联系管理员申请加入题解区。申请时需要阐述可以被采纳的理由。
- 如有更多问题，可以进一步询问负责题解审核板块的[题目管理志愿者](https://www.luogu.com.cn/discuss/186291)。
```

## 搬题

### Special Judge

- [Special Judge 功能说明 | 洛谷帮助中心](https://help.luogu.com.cn/manual/luogu/problem/special-judge)

<GitHub repo="MikeMirzayanov/testlib" />

### 提示词

以下提示词可用于 AI 翻译整理英文 PDF 题面为规范格式。

```text title="提示词"
请你将提供的算法竞赛题目的英文 PDF 翻译成中文，并严格遵循《洛谷主题库题目规范》（https://help.luogu.com.cn/rules/academic/problem-standard）整理成 Markdown 格式。

## 内容

- 全文忠实翻译，不增删任何信息。
- 语言严谨、规范，表达简洁清晰。

## 结构

题目各部分依次为：

- `## 题目背景`
- `## 题目描述`
- `## 输入格式`
- `## 输出格式`
- `## 样例组`
  - `### 样例 1`
  - `### 样例 2`
  - ……
- `## 说明/提示`
  - `【样例解释】`
  - `对于样例 #1`
  - `对于样例 #2`
  - ……
  - `【数据范围】`

## 样例格式

- 输入、输出数据 **不使用代码块**，直接正常排版。
- 样例数据与原文保持完全一致。
- 仅整理原文提供的样例解释，**禁止** 自行推测或补充。

## 数据范围

- 数据范围放在 `## 说明/提示` 末尾。
- 子任务部分用表格，格式示例如下：

| 子任务编号 | 分值 |  特殊限制   |
| :--------: | :--: | :---------: |
|    $1$     | $20$ | $N\le 100$  |
|    $2$     | $20$ | $N\le 1000$ |
|     ……     |  ……  |     ……      |

- 所有列居中对齐。
- 所有数字用 `$` 包裹，转为 LaTeX 公式。
- 特殊限制中的数学表达式使用 LaTeX 规范。

## 其他规范

- 中文与英文、数字、公式之间用半角空格。
- 排版整齐，严格符合洛谷题面书写规范。
- 最终仅输出 Markdown 源文本，**不得** 添加额外解释、图示或格式改动。
```

### NOISG 搬题记录

我搬运的 **新加坡全国信息学奥林匹克竞赛**（Singapore National Olympiad in Informatics，NOISG）的 $7$ 场比赛 $30$ 道题目。

<GitHub repo="noisg/sg_noi_archive" />

#### NOISG 搬题表

| 年份 |                       (null)                        |                       Qualification                        |                        Prelim                         |                       Finals                        | Practice | Prelim Practice |
| :--: | :-------------------------------------------------: | :--------------------------------------------------------: | :---------------------------------------------------: | :-------------------------------------------------: | :------: | :-------------: |
| 1998 |                         ⌛️                          |                            N/A                             |                          N/A                          |                         N/A                         |   N/A    |       N/A       |
| 1999 |                         ⌛️                          |                            N/A                             |                          N/A                          |                         N/A                         |   N/A    |       N/A       |
| 2000 |                         ⌛️                          |                            N/A                             |                          N/A                          |                         N/A                         |   N/A    |       N/A       |
| 2001 |                         ⌛️                          |                            N/A                             |                          N/A                          |                         N/A                         |   N/A    |       N/A       |
| 2002 |                         ⌛️                          |                            N/A                             |                          N/A                          |                         N/A                         |   N/A    |       N/A       |
| 2003 |                         ⌛️                          |                            N/A                             |                          N/A                          |                         N/A                         |   N/A    |       N/A       |
| 2004 |                         ⌛️                          |                            N/A                             |                          N/A                          |                         N/A                         |   N/A    |       N/A       |
| 2005 |                         ⌛️                          |                             ⌛️                             |                          N/A                          |                         N/A                         |   N/A    |       N/A       |
| 2006 |                         ⌛️                          |                             ⌛️                             |                          N/A                          |                         N/A                         |   N/A    |       N/A       |
| 2007 |                         ⌛️                          |                            N/A                             |                          N/A                          |                         N/A                         |   N/A    |       N/A       |
| 2008 |                         ⌛️                          |                            N/A                             |                          N/A                          |                         N/A                         |   N/A    |       N/A       |
| 2009 |                         ⌛️                          |                            N/A                             |                          N/A                          |                         N/A                         |   N/A    |       N/A       |
| 2010 |                         ⌛️                          |                            N/A                             |                          N/A                          |                         N/A                         |   N/A    |       N/A       |
| 2011 |                         ⌛️                          |                            N/A                             |                          N/A                          |                         N/A                         |   N/A    |       N/A       |
| 2012 |                         ⌛️                          |                            N/A                             |                          N/A                          |                         N/A                         |   N/A    |       N/A       |
| 2013 |                         ⌛️                          |                            N/A                             |                          N/A                          |                         N/A                         |   N/A    |       N/A       |
| 2014 |                         ⌛️                          |                            N/A                             |                          N/A                          |                         N/A                         |   N/A    |       N/A       |
| 2015 |                         ⌛️                          |                            N/A                             |                          N/A                          |                         N/A                         |   N/A    |       N/A       |
| 2016 |   [@chen_zhe](https://www.luogu.com.cn/user/8457)   |                            N/A                             |                          N/A                          |                         N/A                         |   N/A    |       N/A       |
| 2017 |   [677609](https://www.luogu.com.cn/user/677609)    |                            N/A                             |                          N/A                          |                         N/A                         |   N/A    |       N/A       |
| 2018 | [@Shunpower](https://www.luogu.com.cn/user/399150)  |                            N/A                             |  [@ToastBread](https://www.luogu.com.cn/user/545809)  |                         N/A                         |    ⌛️    |       ⌛️        |
| 2019 | [@lailai0916](https://www.luogu.com.cn/user/455474) |                            N/A                             |  [@ToastBread](https://www.luogu.com.cn/user/545809)  |                         N/A                         |   N/A    |       N/A       |
| 2020 |                         N/A                         |    [@lailai0916](https://www.luogu.com.cn/user/455474)     |  [@lailai0916](https://www.luogu.com.cn/user/455474)  | [@lailai0916](https://www.luogu.com.cn/user/455474) |   N/A    |       N/A       |
| 2021 |                         N/A                         | [@Mortidesperatslav](https://www.luogu.com.cn/user/482610) |                          N/A                          | [@lailai0916](https://www.luogu.com.cn/user/455474) |   N/A    |       N/A       |
| 2022 |                         N/A                         |    [@lailai0916](https://www.luogu.com.cn/user/455474)     |                          N/A                          | [@Eason_cyx](https://www.luogu.com.cn/user/741244)  |   N/A    |       N/A       |
| 2023 |                         N/A                         |     [@Eason_cyx](https://www.luogu.com.cn/user/741244)     |                          N/A                          | [@StayAlone](https://www.luogu.com.cn/user/409236)  |   N/A    |       N/A       |
| 2024 |                         N/A                         |                            N/A                             |  [@Eason_cyx](https://www.luogu.com.cn/user/741244)   | [@lailai0916](https://www.luogu.com.cn/user/455474) |   N/A    |       N/A       |
| 2025 |                         N/A                         |                            N/A                             | [@Starrykiller](https://www.luogu.com.cn/user/235125) |   [@Milmon](https://www.luogu.com.cn/user/234641)   |   N/A    |       N/A       |

#### NOISG 2022 Qualification

- [洛谷 P11293 [NOISG 2022 Qualification] L-Board](https://www.luogu.com.cn/problem/P11293)
- [洛谷 P11294 [NOISG 2022 Qualification] Tree Cutting](https://www.luogu.com.cn/problem/P11294)
- [洛谷 P11295 [NOISG 2022 Qualification] Dragonfly](https://www.luogu.com.cn/problem/P11295)

#### NOISG 2021 Finals

- [洛谷 P11299 [NOISG 2021 Finals] Fraud](https://www.luogu.com.cn/problem/P11299)
- [洛谷 P11300 [NOISG 2021 Finals] Archaeologist](https://www.luogu.com.cn/problem/P11300)
- [洛谷 P11301 [NOISG 2021 Finals] Password](https://www.luogu.com.cn/problem/P11301)
- [洛谷 P11302 [NOISG 2021 Finals] Tiles](https://www.luogu.com.cn/problem/P11302)
- [洛谷 P11303 [NOISG 2021 Finals] Pond](https://www.luogu.com.cn/problem/P11303)

#### NOISG 2020 Qualification

- [洛谷 P11319 [NOISG 2020 Qualification] Cryptography](https://www.luogu.com.cn/problem/P11319)
- [洛谷 P11320 [NOISG 2020 Qualification] Fuel Station](https://www.luogu.com.cn/problem/P11320)
- [洛谷 P11321 [NOISG 2020 Qualification] Relay Marathon](https://www.luogu.com.cn/problem/P11321)
- [洛谷 P11322 [NOISG 2020 Qualification] Firefighting](https://www.luogu.com.cn/problem/P11322)

#### NOISG 2020 Finals

- [洛谷 P11332 [NOISG 2020 Finals] Labels](https://www.luogu.com.cn/problem/P11332)
- [洛谷 P11333 [NOISG 2020 Finals] Discharging](https://www.luogu.com.cn/problem/P11333)
- [洛谷 P11334 [NOISG 2020 Finals] Progression](https://www.luogu.com.cn/problem/P11334)
- [洛谷 P11335 [NOISG 2020 Finals] Arcade](https://www.luogu.com.cn/problem/P11335)
- [洛谷 P11336 [NOISG 2020 Finals] Aesthetic](https://www.luogu.com.cn/problem/P11336)

#### NOISG 2024 Finals

- [洛谷 P11349 [NOISG 2024 Finals] Problem Setter](https://www.luogu.com.cn/problem/P11349)
- [洛谷 P11350 [NOISG 2024 Finals] Shops](https://www.luogu.com.cn/problem/P11350)
- [洛谷 P11351 [NOISG 2024 Finals] Toxic Gene 2（交互题，暂时无法评测）](https://www.luogu.com.cn/problem/P11351)
- [洛谷 P11352 [NOISG 2024 Finals] Coin](https://www.luogu.com.cn/problem/P11352)
- [洛谷 P11353 [NOISG 2024 Finals] Field](https://www.luogu.com.cn/problem/P11353)

#### NOISG 2020 Prelim

- [洛谷 P12931 [NOISG 2020 Prelim] Mountains](https://www.luogu.com.cn/problem/P12931)
- [洛谷 P12932 [NOISG 2020 Prelim] Visiting Singapore](https://www.luogu.com.cn/problem/P12932)
- [洛谷 P12933 [NOISG 2020 Prelim] Mountains](https://www.luogu.com.cn/problem/P12933)

#### NOISG 2019

- [洛谷 P13075 [NOISG 2019] Pilot](https://www.luogu.com.cn/problem/P13075)
- [洛谷 P13076 [NOISG 2019] Lasers](https://www.luogu.com.cn/problem/P13076)
- [洛谷 P13077 [NOISG 2019] Feast](https://www.luogu.com.cn/problem/P13077)
- [洛谷 P13078 [NOISG 2019] Rigged Roads](https://www.luogu.com.cn/problem/P13078)
- [洛谷 P13079 [NOISG 2019] Shuffle](https://www.luogu.com.cn/problem/P13079)
