# 初高衔接

本章是一些初中可能没讲，但高中默认掌握的知识。

## 参考资料

- [乘法公式 - 维基百科](https://zh.wikipedia.org/zh-cn/乘法公式)
- [因式分解 - 维基百科](https://zh.wikipedia.org/zh-cn/因式分解)

## 乘法公式

### 平方公式

在初中阶段，我们学过的 $3$ 个 **平方公式**：

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

我们将 **完全平方和公式** 中的平方修改为 **立方**，得到：

1. 完全立方和公式

$$
\begin{aligned}
  (a+b)^3 &= (a+b)(a+b)(a+b) \\
  &= (a^2+2ab+b^2)(a+b) \\
  &= a^3+2a^2b+ab^2+a^2b+2ab^2+b^3 \\
  &= a^3+3a^2b+3ab^2+b^3
\end{aligned}
$$

同理，将 **完全平方差公式** 中的平方修改为 **立方**，得到：

2. 完全立方差公式

$$
\begin{aligned}
  (a-b)^3 &= (a-b)(a-b)(a-b) \\
  &= (a^2-2ab+b^2)(a-b) \\
  &= a^3-2a^2b+ab^2-a^2b+2ab^2-b^3 \\
  &= a^3-3a^2b+3ab^2-b^3
\end{aligned}
$$

将 **完全立方和公式** 移项，并提取公因式，得到：

3. 立方和公式

$$
\begin{aligned}
  a^3+b^3 &= (a+b)^3-3a^2b-3ab^2 \\
  &= (a+b)^3-3ab(a+b) \\
  &= (a+b)((a+b)^2-3ab) \\
  &= (a+b)(a^2-ab+b^2)
\end{aligned}
$$

同理，将 **完全立方差公式** 移项，并提取公因式，得到：

4. 立方差公式

$$
\begin{aligned}
  a^3-b^3 &= (a-b)^3+3a^2b-3ab^2 \\
  &= (a-b)^3+3ab(a-b) \\
  &= (a-b)((a-b)^2+3ab) \\
  &= (a-b)(a^2+ab+b^2)
\end{aligned}
$$

这就是高中阶段常用的 $4$ 个 **立方公式**：

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

:::example

<Tabs>
<TabItem value="Example 1">

计算 $(x+1)^3$。

$$
(x+1)^3=x^3+3x^2+3x+1
$$

</TabItem>
<TabItem value="Example 2">

计算 $(2x-3y)^3$。

$$
(2x-3y)^3=8x^3-36x^2y+54xy^2-27y^3
$$

</TabItem>
</Tabs>

:::

## 因式分解

**因式分解** 是将一个 **多项式** 拆分为两个或多个 **因式** 相乘的过程。

### 公式法

将多项式每一项凑成上文中 **乘法公式** 的形式。

:::example

<Tabs>
<TabItem value="Example 1">

分解因式 $x^4-1$。

$$
x^4-1=(x^2)^2-1^2=(x^2+1)(x^2-1)=(x^2+1)(x+1)(x-1)
$$

</TabItem>
<TabItem value="Example 2">

分解因式 $x^2+4y^2+4xy$。

$$
x^2+4y^2+4xy=x^2+(2y)^2+2x(2y)=(x+2y)^2
$$

</TabItem>
</Tabs>

:::

### 十字相乘法

我们要因式分解一个二次多项式：

$$
Ax^2+Bx+C
$$

可以设：

$$
Ax^2+Bx+C=(ax+b)(cx+d)=acx^2+(ad+bc)x+bd
$$

此时要想办法凑出 $a,b,c,d$。

可以将 $A$ 拆分为 $ac$，$C$ 拆分为 $bd$：

$$
A=ac,C=bd
$$

使其 **十字相乘** 后等于 $B$：

$$
\begin{array}{c}
a \\ c
\end{array}
\times
\begin{array}{c}
b \\ d
\end{array}
$$

$$
B=ad+bc
$$

:::example

<Tabs>
<TabItem value="Example 1">

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

因此 $x^2-x-6=(x+2)(x-3)$。

</TabItem>
<TabItem value="Example 2">

分解因式 $2x^2+9x-5$。

$$
\begin{array}{c}
1 \\ 2
\end{array}
\times
\begin{array}{c}
5 \\ -1
\end{array}
$$

因此 $2x^2+9x-5=(x+5)(2x-1)$。

</TabItem>
<TabItem value="Example 3">

分解因式 $6x^2+7x-3$。

$$
\begin{array}{c}
2 \\ 3
\end{array}
\times
\begin{array}{c}
3 \\ -1
\end{array}
$$

因此 $6x^2+7x-3=(2x+3)(3x-1)$。

</TabItem>
<TabItem value="Example 4">

分解因式 $x^2+(3-a)-3a$。

$$
\begin{array}{c}
1 \\ 1
\end{array}
\times
\begin{array}{c}
3 \\ -a
\end{array}
$$

因此 $x^2+(3-a)-3a=(x+3)(x-a)$。

</TabItem>
<TabItem value="Example 5">

分解因式 $x^2-2y^2+xy+x+5y-2$。

$$
\begin{array}{c}
1 \\ 1
\end{array}
\times
\begin{array}{c}
2y-1 \\ 2-y
\end{array}
$$

因此 $x^2-2y^2+xy+x+5y-2=(x+2y-1)(x+2-y)$。

</TabItem>
</Tabs>

:::

### 长除法

在解高次多项式方程时，如果已经找到一个根，就可以把多项式拆成更简单的形式。

这样可以降低次数，方便继续求解：

1. 先找到多项式 $f(x)=0$ 的一个根 $a$。（**猜根法**：~~注意到~~ 尝试代入一些数，看结果是不是 $0$）
2. 根据 [因式定理](https://zh.wikipedia.org/zh-cn/因式定理)，如果 $f(a)=0$，那么 $(x-a)$ 就是 $f(x)$ 的一个因式。
3. 用 **长除法** 把 $f(x)$ 除以 $(x-a)$，得到一个新的多项式 $g(x)$，此时 $f(x)=(x-a)g(x)$。
4. 因为 $g(x)$ 的次数比 $f(x)$ 低，继续求根会更简单。

与整数的除法相似，多项式也可以进行除法。

:::example

<Tabs>
<TabItem value="Example 1">

分解因式 $x^3+2x^2-4x+1$。

注意到 $x=1$ 是方程的一个根：

$$
\frac{x^3+2x^2-4x+1}{x-1}=x^2+3x-1
$$

因此 $x^3+2x^2-4x+1=(x-1)(x^2+3x-1)$。

</TabItem>
<TabItem value="Example 2">

分解因式 $x^3+x^2-3x-2$。

注意到 $x=-2$ 是方程的一个根：

$$
\frac{x^3+x^2-3x-2}{x+2}=x^2-x-1
$$

因此 $x^3+x^2-3x-2=(x+2)(x^2-x-1)$。

</TabItem>
</Tabs>

:::

## 二重根式

利用等式变形方法（**乘法公式** 和 **因式分解**），可以化简 **二重根式**（嵌套根式）。

### 引入

在解数学题时，有时会遇到一些二重根式的结果。

例如，在一个 $15\degree$ 的直角三角形中，两条直角边 $AB$ 和 $AC$ 分别为 $2+\sqrt 3$ 和 $1$。

现在要计算斜边 $BC$ 的长度。根据勾股定理：

$$
BC=\sqrt{AB^2+AC^2}=\sqrt{(2+\sqrt 3)^2+1^2}=\sqrt{8+4\sqrt 3}
$$

但这不是最简答案，还可以进一步化简。

<img src={require('././assets/de1e7a219492200560905ce9d47c614a.jpg').default} style={{maxWidth: '500px'}} />

### 定义

一般的二重根式的形式如下：

$$
\sqrt{a\pm\sqrt b}
$$

### 推导

我们设化简结果为：

$$
\sqrt{8+4\sqrt{3}}=\sqrt{x}+\sqrt{y}
$$

则有：

$$
8+4\sqrt{3}=(\sqrt{x}+\sqrt{y})^2=x+y+2\sqrt{xy}
$$

可以令：

$$
x+y=8
$$

$$
2\sqrt{xy}=4\sqrt{3}
$$

注意到一组正整数解：

$$
x=2,y=6
$$

因此化简结果为：

$$
\sqrt{8+4\sqrt{3}}=\sqrt{2}+\sqrt{6}
$$

### 总结

对于一般的二重根式：

$$
\sqrt{a\pm\sqrt{b}}
$$

我们需要找到一组正整数 $x$ 和 $y$，使得：

$$
x+y=a,xy=\frac{b}{4}
$$

这样就可以化简为：

$$
\sqrt{a\pm\sqrt{b}}=\left|\sqrt{x}\pm\sqrt{y}\right|
$$

但并非所有的二重根式都可以化简。

:::example

<Tabs>
<TabItem value="Example 1">

化简 $\sqrt{5-2\sqrt{6}}$。

$$
\sqrt{5-2\sqrt{6}}=\left|\sqrt{2}-\sqrt{3}\right|=\sqrt{3}-\sqrt{2}
$$

</TabItem>
<TabItem value="Example 2">

化简 $\sqrt{4-\sqrt{15}}$。

$$
\begin{aligned}
  \sqrt{4-\sqrt{15}} &= \frac{\sqrt{8-2\sqrt{15}}}{\sqrt{2}} \\
  &= \left(\sqrt{5}-\sqrt{3}\right)\cdot\frac{\sqrt{2}}{2} \\
  &= \frac{\sqrt{10}-\sqrt 6}{2}
\end{aligned}
$$

</TabItem>
</Tabs>

:::

## 韦达定理

**韦达定理** 描述了多项式方程的 **根** 与 **系数** 之间的关系。

### 二次方程

## 符号

### 求和符号

在数学中，常常碰到 $n$ 个数累加的式子：

$$
a_1+a_2+\dots+a_n
$$

我们将上述公式简写为：

$$
\sum_{i=1}^n a_i
$$

其中，$\sum$ 表示 **求和符号**，$a_i$ 表示 **一般项**。$i=1$ 表示变量 $i$ 从 **下界** $1$ 开始，每次加 $1$ 直到 **上界** $n$。

:::example

$$
\sum_{i=3}^6 i^2=3^2+4^2+5^2+6^2=86
$$

:::

### 求积符号

而 $\prod$ 为 **求积符号**，与求和符号用法类似。

$$
\prod_{i=1}^n a_i=a_1\times a_2\times\dots\times a_n
$$

:::example

$$
\prod_{i=2}^4 2i=4\times 6\times 8=192
$$

:::

:::tip

求和符号 $\sum$ 是大写希腊字母 $\Sigma$（Sigma，西格玛），求积符号 $\prod$ 是大写希腊字母 $\Pi$（Pi，派）。

:::

## 不等式

有些课程和教辅中会讲解 **不等式**，但高中阶段也会学习相关内容，因此我将它们放在一起了。

详见 [不等式](inequality)

## 根式

### 共轭根式

以下两个根式 $x$ 和 $y$ 互为 **共轭根式**：

$$
x=\sqrt a+\sqrt b\iff y=\sqrt a-\sqrt b
$$

容易发现：

$$
xy=(\sqrt a-\sqrt b)(\sqrt a+\sqrt b)=a-b(a,b\ge 0)
$$

:::tip

轭（è）指套在牛脖子上、把两头牛拴在一起拉车的器具。

共轭就是“共用一副轭”，形容两头牛并驾齐驱，一起受约束。

引申到数学里，“共轭”就表示“成对出现、相互对应、紧密联系”的关系。

常见例子有：共轭根式、共轭复数、共轭点等。

:::

### 分母有理化

分母的有理化常见操作：

$$
\frac{1}{\sqrt{a}}=\frac{\sqrt{a}}{a}
$$

$$
1
$$
