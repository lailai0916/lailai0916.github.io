# 初高衔接

一些初中不讲，但高中默认掌握的内容。

## 乘法公式

### 平方公式

初中课本中学过的三个乘法公式：

1. 平方差公式

$$
a^2-b^2=(a+b)(a-b)
$$

2. 完全平方和公式

$$
(a+b)^2=a^2+2ab+b^2
$$

3. 完全平方差公式

$$
(a-b)^2=a^2-2ab+b^2
$$

### 立方公式

将平方改为立方，展开得到：

1. 完全立方和公式

$$
\begin{aligned}
  (a+b)^3 &= (a+b)(a+b)(a+b) \\
  &= (a^2+2ab+b^2)(a+b) \\
  &= a^3+2a^2b+ab^2+a^2b+2ab^2+b^3 \\
  &= a^3+3a^2b+3ab^2+b^3
\end{aligned}
$$

将 $b$ 替换为 $-b$，得到：

2. 完全立方差公式

$$
\begin{aligned}
  (a-b)^3 &= (a+(-b))^3 \\
  &= a^3+3a^2(-b)+3a(-b)^2+(-b)^3 \\
  &= a^3-3a^2b+3ab^2-b^3
\end{aligned}
$$

将完全立方和公式移项，并提取公因式，得到：

3. 立方和公式

$$
\begin{aligned}
  a^3+b^3 &= (a+b)^3-3a^2b-3ab^2 \\
  &= (a+b)^3-3ab(a+b) \\
  &= (a+b)((a+b)^2-3ab) \\
  &= (a+b)(a^2-ab+b^2)
\end{aligned}
$$

同理，将完全立方差公式移项，并提取公因式，得到：

4. 立方差公式

$$
\begin{aligned}
  a^3-b^3 &= (a-b)^3+3a^2b-3ab^2 \\
  &= (a-b)^3+3ab(a-b) \\
  &= (a-b)((a-b)^2+3ab) \\
  &= (a-b)(a^2+ab+b^2)
\end{aligned}
$$

### 公式总结

$$
(a+b)^3=a^3+3a^2b+3ab^2+b^3
$$

$$
(a-b)^3=a^3-3a^2b+3ab^2-b^3
$$

$$
a^3+b^3=(a+b)(a^2-ab+b^2)
$$

$$
a^3-b^3=(a-b)(a^2+ab+b^2)
$$

## 因式分解

### 公式法

利用乘法公式，凑出每一项。

:::note[示例]

分解因式 $x^2+4y^2+4xy$。

$$
x^2+4y^2+4xy=x^2+(2y)^2+2x(2y)=(x+2y)^2
$$

:::

### 因式分解

$$
Ax^2+Bx+C=(ax+b)(cx+d)
$$

展开：

$$
Ax^2+Bx+C=(ax+b)(cx+d)=acx^2+(ad+bc)x+bd
$$

$$
\begin{array}{c}
a \\ b
\end{array}
\times
\begin{array}{c}
c \\ d
\end{array}
$$

将 $A$ 拆分为 $ac$，$C$ 拆分为 $bd$：

$$
A=ac,C=bd
$$

使其满足：

$$
B=ad+bc
$$

:::note[示例]

分解因式 $x^2-x-6$。

$$
\begin{array}{c}
1 \\ 1
\end{array}
\times
\begin{array}{c}
2 \\ -3
\end{array}
$$

所以：

$$
x^2-x-6=(x+2)(x-3)
$$

:::

### 增添项/长除法

### 应用

- [二重根式](/blog/double-radical-expression)
