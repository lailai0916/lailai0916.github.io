---
title: 'LaTeX 指南'
---

本文为 $\LaTeX$ 使用指南。

## 参考资料

- [LaTeX - A document preparation system](https://www.latex-project.org)
- [KaTeX – The fastest math typesetting library for the web](https://katex.org)
- [TeX - 维基百科](https://zh.wikipedia.org/wiki/TeX)
- [LaTeX - 维基百科](https://zh.wikipedia.org/wiki/LaTeX)
- [KaTeX - 维基百科](https://zh.wikipedia.org/wiki/KaTeX)
- [LaTeX 数学公式大全 - 洛谷专栏](https://www.luogu.com.cn/article/1gxob6zc)
- [常用数学符号 - Baoshuo's OI Blog](https://oi.baoshuo.ren/math-formulas/)

## 简介

$\LaTeX$ 是一种基于 $\TeX$ 的排版系统，用于编写包含数学公式的文档。

$\KaTeX$ 是一个在浏览器中运行的 JavaScript 数学公式渲染库，可以在网页上渲染使用 $\LaTeX$ 语法编写的数学公式。

推荐两个我常用的 $\LaTeX$ 排版工具网站：[Overleaf](https://www.overleaf.com) 和 [在线 LaTeX 公式编辑器](https://www.latexlive.com)。

本文仅说明语法规则，不包含格式与排版建议。

## 公式类型

### 行内公式

行内公式（Inline Formula）是嵌入在文本中的公式，其两侧分别用 $1$ 个 **美元符号**（`$`）标记。

```latex
$...$
```

### 行间公式

行间公式（Display Formula）是独立成行并居中的公式，其前后分别用 $2$ 个 **美元符号**（`$$`）标记。

```latex
$$
...
$$
```

:::tip

行内公式的「大小」（例如分数大小、巨运算符上下标位置）通常比行间公式小。

可以使用 `\displaystyle` 和 `\textstyle` 切换两种类型。

:::

## 运算符号

### 算术

|  名称  |   展示   |       代码       |
| :----: | :------: | :--------------: |
|  加号  |   $+$    |       `+`        |
|  减号  |   $-$    |       `-`        |
|  乘号  | $\times$ |     `\times`     |
|  点乘  | $\cdot$  |     `\cdot`      |
|  除号  |  $\div$  |      `\div`      |
| 正负号 |  $\pm$   | `\pm`、`\plusmn` |
| 负正号 |  $\mp$   |      `\mp`       |

### 比较

|   名称   |           展示            |               代码               |
| :------: | :-----------------------: | :------------------------------: |
|   等号   |            $=$            |            `=`、`\eq`            |
|  不等号  |           $\ne$           |          `\ne`、`\neq`           |
|  约等号  |         $\approx$         |            `\approx`             |
|  大于号  |            $>$            |            `>`、`\gt`            |
|  小于号  |            $<$            |            `<`、`\lt`            |
| 大于等于 |           $\ge$           |          `\ge`、`\geq`           |
| 小于等于 |           $\le$           |          `\le`、`\leq`           |
|   无穷   |         $\infty$          |             `\infty`             |
|   根号   | $\sqrt{x}$，$\sqrt[y]{x}$ |    `\sqrt{x}`，`\sqrt[y]{x}`     |
|   分数   |       $\frac{a}{b}$       |          `\frac{a}{b}`           |
|  上取整  |    $\lceil$、$\rceil$     |        `\lceil`、`\rceil`        |
|  下取整  |   $\lfloor$、$\rfloor$    |       `\lfloor`、`\rfloor`       |
|  大括号  |        $\{$，$\}$         | `\lbrace`、`\{`，`\rbrace`、`\}` |

### 逻辑

| 名称 |            展示            |            代码            |
| :--: | :------------------------: | :------------------------: |
|  与  |          $\land$           |          `\land`           |
|  或  |           $\lor$           |           `\lor`           |
|  非  |          $\lnot$           |          `\lnot`           |
| 推出 | $\implies$，$\Rightarrow$  | `\implies`，`\Rightarrow`  |
| 反推 | $\impliedby$，$\Leftarrow$ | `\impliedby`，`\Leftarrow` |
| 等价 | $\iff$，$\Leftrightarrow$  | `\iff`，`\Leftrightarrow`  |
| 因为 |         $\because$         |         `\because`         |
| 所以 |        $\therefore$        |        `\therefore`        |

## 巨运算符

### 求和

```latex
\sum_{i=1}^{n}a_i
```

<BrowserWindow>

$$
\sum_{i=1}^{n}a_i
$$

</BrowserWindow>

### 求积

```latex
\prod_{i=1}^{n}a_i
```

<BrowserWindow>

$$
\prod_{i=1}^{n}a_i
$$

</BrowserWindow>

### 积分

```latex
\int_{a}^{b}f(x)\mathrm{d}x
```

<BrowserWindow>

$$
\int_{a}^{b}f(x)\mathrm{d}x
$$

</BrowserWindow>

### 极限

```latex
\lim_{x\to\infty}f(x)
```

<BrowserWindow>

$$
\lim_{x\to\infty}f(x)
$$

</BrowserWindow>

## 多行公式

### 递等式

```latex
\begin{aligned}
  f(x) &= a \\
  &= b \\
  &= c
\end{aligned}
```

<BrowserWindow>

$$
\begin{aligned}
  f(x) &= a \\
  &= b \\
  &= c
\end{aligned}
$$

</BrowserWindow>

### 分段函数

```latex
f(x)=
\begin{cases}
  a & x>0 \\
  b & x=0 \\
  c & x<0
\end{cases}
```

<BrowserWindow>

$$
f(x)=
\begin{cases}
  a & x>0 \\
  b & x=0 \\
  c & x<0
\end{cases}
$$

</BrowserWindow>

### 线性方程组

```latex
\begin{cases}
  a_1x+b_1y+c_1z=d_1 \\
  a_2x+b_2y+c_2z=d_2 \\
  a_3x+b_3y+c_3z=d_3
\end{cases}
```

<BrowserWindow>

$$
\begin{cases}
  a_1x+b_1y+c_1z=d_1 \\
  a_2x+b_2y+c_2z=d_2 \\
  a_3x+b_3y+c_3z=d_3
\end{cases}
$$

</BrowserWindow>

### 多行公式

```latex
\begin{array}{l}
  \cos\pi=1 \\
  \sin^2\alpha+\cos^2\alpha=1 \\
  \sin 2\alpha=2\sin\alpha\cos\alpha
\end{array}
```

<BrowserWindow>

$$
\begin{array}{l}
  \cos\pi=1 \\
  \sin^2\alpha+\cos^2\alpha=1 \\
  \sin 2\alpha=2\sin\alpha\cos\alpha
\end{array}
$$

</BrowserWindow>

:::tip

通过调整 `\begin{array}` 后面的参数设置对齐方式：

`{l}` 表示左对齐；`{c}` 表示居中对齐；`{r}` 表示右对齐。

:::

### 矩阵

```latex
\begin{bmatrix}
  1 & 0 & \dots & 0 \\
  0 & 1 & \dots & 0 \\
  \vdots & \vdots & \ddots & \vdots \\
  0 & 0 & \dots & 1
\end{bmatrix}
```

<BrowserWindow>

$$
\begin{bmatrix}
  1 & 0 & \dots & 0 \\
  0 & 1 & \dots & 0 \\
  \vdots & \vdots & \ddots & \vdots \\
  0 & 0 & \dots & 1
\end{bmatrix}
$$

</BrowserWindow>

## 更多功能

### 边框

```latex
\boxed{x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}}
```

<BrowserWindow>

$$
\boxed{x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}}
$$

</BrowserWindow>

### 颜色

```latex
{\color{white}\colorbox{red}{FBI WARNING}}
```

<BrowserWindow>

$$
{\color{white}\colorbox{red}{FBI WARNING}}
$$

</BrowserWindow>

### 字体

#### 正体

```latex
g\approx 9.8\mathrm{m/s^2}
```

<BrowserWindow>

$$
g\approx 9.8\mathrm{m/s^2}
$$

</BrowserWindow>

#### 黑板粗体

```latex
x\in\mathbb{R}
```

<BrowserWindow>

$$
x\in\mathbb{R}
$$

</BrowserWindow>

#### 自定义运算符

```latex
\operatorname{lca}(6,8)=24
```

<BrowserWindow>

$$
\operatorname{lca}(6,8)=24
$$

</BrowserWindow>

### 编号

```latex
\tag{1}(a+b)^2=a^2+2ab+b^2
```

<BrowserWindow>

$$
\tag{1}(a+b)^2=a^2+2ab+b^2
$$

</BrowserWindow>
