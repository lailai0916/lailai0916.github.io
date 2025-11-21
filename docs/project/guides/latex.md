# LaTeX 指南

[$\LaTeX$](https://zh.wikipedia.org/zh-cn/LaTeX) 是一种基于 [$\TeX$](https://zh.wikipedia.org/zh-cn/TeX) 的排版系统，用于编写包含数学公式的文档。

[$\KaTeX$](https://zh.wikipedia.org/wiki/KaTeX) 是一个在浏览器中运行的 JavaScript 数学公式渲染库，可以在网页上渲染使用 $\LaTeX$ 语法编写的数学公式。

## 参考资料

- [Supported Functions - KaTeX](https://katex.org/docs/supported.html)
- [LaTeX 数学公式大全 - 洛谷专栏](https://www.luogu.com.cn/article/1gxob6zc)
- [常用数学符号 - Baoshuo's OI Blog](https://oi.baoshuo.ren/math-formulas/)

## 推荐资源

- [在线 LaTeX 公式编辑器](https://www.latexlive.com)

## 公式类型

### 行内公式

行内公式（Inline Math）是嵌入在文本中的公式，其两侧分别用 **一个美元符号**（`$`）标记。

```latex
$...$
```

### 行间公式

行间公式（Math Blocks）是独立成行并居中的公式，其前后分别用 **两个美元符号**（`$$`）标记。

```latex
$$
...
$$
```

:::tip

行内公式的“大小”（如分数的大小、巨运算符上下标的位置）通常比行间公式小。可以使用 `\displaystyle` 和 `\textstyle` 切换两种类型。

:::

## 运算符号

### 基础

|   名称   |           演示            |               代码               |
| :------: | :-----------------------: | :------------------------------: |
|   加号   |            $+$            |               `+`                |
|   减号   |            $-$            |               `-`                |
|   乘号   |         $\times$          |             `\times`             |
|   点乘   |          $\cdot$          |             `\cdot`              |
|   除号   |          $\div$           |              `\div`              |
|   等号   |            $=$            |            `=`、`\eq`            |
|  不等号  |           $\ne$           |          `\ne`、`\neq`           |
|  约等号  |         $\approx$         |            `\approx`             |
|  大于号  |            $>$            |            `>`、`\gt`            |
|  小于号  |            $<$            |            `<`、`\lt`            |
| 大于等于 |          $\geq$           |          `\ge`、`\geq`           |
| 小于等于 |          $\leq$           |          `\le`、`\leq`           |
|  正负号  |           $\pm$           |         `\pm`、`\plusmn`         |
|   无穷   |         $\infty$          |             `\infty`             |
|   根号   | $\sqrt{x}$，$\sqrt[y]{x}$ |    `\sqrt{x}`，`\sqrt[y]{x}`     |
|   分数   |      $\tfrac{a}{b}$       |          `\frac{a}{b}`           |
|  上取整  |    $\lceil$、$\rceil$     |        `\lceil`、`\rceil`        |
|  下取整  |   $\lfloor$、$\rfloor$    |       `\lfloor`、`\rfloor`       |
|  大括号  |        $\{$，$\}$         | `\lbrace`、`\{`，`\rbrace`、`\}` |

### 逻辑

| 名称 |            演示            |            代码            |
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
  \sin^2a+\cos^2a=1 \\
  \sin2a=2\sin a\cos a
\end{array}
```

<BrowserWindow>

$$
\begin{array}{l}
  \cos\pi=1 \\
  \sin^2a+\cos^2a=1 \\
  \sin2a=2\sin a\cos a
\end{array}
$$

</BrowserWindow>

:::tip

通过调整 `\begin{array}` 后的参数，可以设置多行公式的对齐方式：

`{c}` 表示居中；`{l}` 表示左对齐；`{r}` 表示右对齐。

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
\boxed{a^2+b^2=c^2}
```

<BrowserWindow>

$$
\boxed{a^2+b^2=c^2}
$$

</BrowserWindow>

### 颜色

```latex
{\color{White}\colorbox{Red}{FBI WARNING}}
```

<BrowserWindow>

$$
{\color{White}\colorbox{Red}{FBI WARNING}}
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
