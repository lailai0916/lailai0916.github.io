# LaTeX 模板

$\LaTeX$ 是一种基于 $\TeX$ 的排版系统，能够很方便的生成数学公式。

## 参考资料

- [Supported Functions - KaTeX](https://katex.org/docs/supported.html)
- [LaTeX 数学公式大全 - 洛谷专栏](https://www.luogu.com.cn/article/1gxob6zc)
- [在线 LaTeX 公式编辑器](https://www.latexlive.com)

## 基础知识

### 行内公式与行间公式

行内公式（Inline Math，即穿插在文本中的公式）两侧分别使用一个美元 `$ $` 符号定界。

```latex
$a^2 + b^2 = c^2$
```

行间公式（Math Blocks，独立成行居中的公式）前后两行分别使用 `$$ $$`（每行两个美元符号）定界。

```latex
$$
a^2 + b^2 = c^2
$$
```

:::tip

行内公式的 “大小”（例如分数的大小、巨运算符上下标的位置）会比行间公式小，可以通过 `\displaystyle` 和 `\textstyle` 来切换两类模式。

:::

## 巨运算符

### 求和

```latex
\sum_{i=1}^{n} a_i
```

$$
\sum_{i=1}^{n} a_i
$$

### 积分

```latex
\int_{a}^{b} f(x) \mathrm{d}x
```

$$
\int_{a}^{b} f(x) \mathrm{d}x
$$

### 微分

```latex
\frac{\mathrm{d}}{\mathrm{d}x} f(x)
```

$$
\frac{\mathrm{d}}{\mathrm{d}x} f(x)
$$

### 极限

```latex
\lim_{x\to\infty} f(x)
```

$$
\lim_{x\to\infty} f(x)
$$

## 多行公式

### 递等式

```latex
\begin{align*}
  f(x) &= a_1 \\
  &= a_2 \\
  &= a_3 \\
  &= \dotsb \\
  &= a_n
\end{align*}
```

$$
\begin{align*}
  f(x) &= a_1 \\
  &= a_2 \\
  &= a_3 \\
  &= \dotsb \\
  &= a_n
\end{align*}
$$

### 分段函数

```latex
f(x)=\begin{cases}
  a_1 & x>0 \\
  a_2 & x=0 \\
  a_3 & x<0
\end{cases}
```

$$
f(x)=\begin{cases}
  a_1 & x>0 \\
  a_2 & x=0 \\
  a_3 & x<0
\end{cases}
$$

### 线性方程组

```latex
\begin{cases}
  a_1x + b_1y + c_1z = d_1 \\
  a_2x + b_2y + c_2z = d_2 \\
  a_3x + b_3y + c_3z = d_3
\end{cases}
```

$$
\begin{cases}
  a_1x + b_1y + c_1z = d_1 \\
  a_2x + b_2y + c_2z = d_2 \\
  a_3x + b_3y + c_3z = d_3
\end{cases}
$$

### 多行公式

```latex
\begin{align*}
  & a_1 = b_1 \\
  & a_2 = b_2 \\
  & a_3 = b_3
\end{align*}
```

$$
\begin{align*}
  & a_1 = b_1 \\
  & a_2 = b_2 \\
  & a_3 = b_3
\end{align*}
$$

### 矩阵

```latex
\begin{bmatrix}
  1 & 0 & \cdots & 0 \\
  0 & 1 & \cdots & 0 \\
  \vdots & \vdots & \ddots & \vdots \\
  0 & 0 & \cdots & 1
\end{bmatrix}
```

$$
\begin{bmatrix}
  1 & 0 & \cdots & 0 \\
  0 & 1 & \cdots & 0 \\
  \vdots & \vdots & \ddots & \vdots \\
  0 & 0 & \cdots & 1
\end{bmatrix}
$$

```latex
\begin{pmatrix}
  1 & 0 & \cdots & 0 \\
  0 & 1 & \cdots & 0 \\
  \vdots & \vdots & \ddots & \vdots \\
  0 & 0 & \cdots & 1
\end{pmatrix}
```

$$
\begin{pmatrix}
  1 & 0 & \cdots & 0 \\
  0 & 1 & \cdots & 0 \\
  \vdots & \vdots & \ddots & \vdots \\
  0 & 0 & \cdots & 1
\end{pmatrix}
$$
