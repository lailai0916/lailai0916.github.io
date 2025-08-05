# 不等式

## 基本不等式

对于任意两个正实数 $a$ 和 $b$，都有：

$$
\sqrt{ab}\le\frac{a+b}{2}
$$

$$
a+b\ge 2\sqrt{ab}
$$

当且仅当 $a=b$ 时，等号成立。

:::note[示例]

已知 $x>0$，求 $x+\frac{1}{x}$ 的最小值。

根据基本不等式：

$$
x+\frac{1}{x}=a+b\ge 2\sqrt{ab}=2\sqrt{x\cdot\frac{1}{x}}=2
$$

所以 $x+\frac{1}{x}$ 的最小值为 $2$。

:::

## 均值不等式

对于任意正实数 $x_1,x_2,\cdots,x_n$，都有：

$$
H_n\le G_n\le A_n\le Q_n
$$

调和平均数：

$$
H_n=\frac{n}{\sum_{i=1}^n\frac{1}{x_i}}
$$

几何平均数：

$$
G_n=\sqrt[n]{\prod_{i=1}^n x_i}
$$

算术平均数：

$$
A_n=\frac{\sum_{i=1}^n x_i}{n}
$$

平方平均数：

$$
Q_n=\sqrt{\frac{\sum_{i=1}^n x_i^2}{n}}
$$

## 柯西-施瓦茨不等式

$$
(a^2+b^2)(x^2+y^2)\ge(ax+by)^2
$$

## 权方和不等式

$$
\frac{a^2}{x}+\frac{b^2}{y}\ge\frac{(a+b)^2}{x+y}
$$

:::note[示例]

已知 $x>0,y>0$，$\frac{1}{x}+\frac{4}{y}=1$，求 $x+y$ 的最小值。

根据权方和不等式：

$$
1=\frac{1^2}{x}+\frac{2^2}{y}=\frac{a^2}{x}+\frac{b^2}{y}\ge\frac{(a+b)^2}{x+y}=\frac{(1+2)^2}{x+y}=\frac{9}{x+y}
$$

即：

$$
1\ge\frac{9}{x+y}\Rightarrow x+y\ge 9
$$

所以 $x+y$ 的最小值为 $9$。

:::
