# LaTeX 指南

[$\LaTeX$](https://zh.wikipedia.org/zh-cn/LaTeX) 是一种基于 [$\TeX$](https://zh.wikipedia.org/zh-cn/TeX) 的排版系统，能够方便的生成数学公式。

## 参考资料

- [Supported Functions - KaTeX](https://katex.org/docs/supported.html)
- [LaTeX 数学公式大全 - 洛谷专栏](https://www.luogu.com.cn/article/1gxob6zc)

## 推荐资源

- [在线 LaTeX 公式编辑器](https://www.latexlive.com)

## 基础知识

### 行内公式与行间公式

行内公式（Inline Math，穿插在文本中的公式）两侧分别使用一个美元符号定界。

```latex
$...$
```

行间公式（Math Blocks，独立成行居中的公式）前后两行分别使用两个美元符号定界。

```latex
$$
...
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

<BrowserWindow>

$$
\sum_{i=1}^{n} a_i
$$

</BrowserWindow>

### 求积

```latex
\prod_{i=1}^{n} a_i
```

<BrowserWindow>

$$
\prod_{i=1}^{n} a_i
$$

</BrowserWindow>

### 积分

```latex
\int_{a}^{b} f(x) \mathrm{d}x
```

<BrowserWindow>

$$
\int_{a}^{b} f(x) \mathrm{d}x
$$

</BrowserWindow>

### 极限

```latex
\lim_{x\to\infty} f(x)
```

<BrowserWindow>

$$
\lim_{x\to\infty} f(x)
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
  a_1x + b_1y + c_1z = d_1 \\
  a_2x + b_2y + c_2z = d_2 \\
  a_3x + b_3y + c_3z = d_3
\end{cases}
```

<BrowserWindow>

$$
\begin{cases}
  a_1x + b_1y + c_1z = d_1 \\
  a_2x + b_2y + c_2z = d_2 \\
  a_3x + b_3y + c_3z = d_3
\end{cases}
$$

</BrowserWindow>

### 多行公式

```latex
\begin{array}{l}
  \cos \pi = 1 \\
  \sin^2 a + \cos^2 a = 1 \\
  \sin 2a = 2 \sin a \cos a
\end{array}
```

<BrowserWindow>

$$
\begin{array}{l}
  \cos \pi = 1 \\
  \sin^2 a + \cos^2 a = 1 \\
  \sin 2a = 2 \sin a \cos a
\end{array}
$$

</BrowserWindow>

:::tip

通过调整 `\begin{array}` 后的参数，可以设置公式的对齐方式：

- `{c}`：居中对齐（默认）。
- `{l}`：左对齐。
- `{r}`：右对齐。

:::

### 矩阵

```latex
\begin{bmatrix}
  1 & 0 & \cdots & 0 \\
  0 & 1 & \cdots & 0 \\
  \vdots & \vdots & \ddots & \vdots \\
  0 & 0 & \cdots & 1
\end{bmatrix}
```

<BrowserWindow>

$$
\begin{bmatrix}
  1 & 0 & \cdots & 0 \\
  0 & 1 & \cdots & 0 \\
  \vdots & \vdots & \ddots & \vdots \\
  0 & 0 & \cdots & 1
\end{bmatrix}
$$

</BrowserWindow>

## 字体

### 自定义名称

```latex
\operatorname{lca}{(6,8)}=24
```

<BrowserWindow>

$$
\operatorname{lca}{(6,8)}=24
$$

</BrowserWindow>

### 正体

```latex
g=9.8\mathrm{m/s^2}
```

<BrowserWindow>

$$
g=9.8\mathrm{m/s^2}
$$

</BrowserWindow>

### 直立体

```latex
\frac{\mathrm{d}}{\mathrm{d}x} f(x)
```

<BrowserWindow>

$$
\frac{\mathrm{d}}{\mathrm{d}x} f(x)
$$

</BrowserWindow>
