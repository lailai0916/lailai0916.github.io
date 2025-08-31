# 初高衔接

本章是一些初中不讲，但高中默认掌握的知识。

## 参考资料

- [乘法公式 - 维基百科](https://zh.wikipedia.org/zh-cn/乘法公式)
- [因式分解 - 维基百科](https://zh.wikipedia.org/zh-cn/因式分解)

## 乘法公式

### 平方公式

初中课本中学过的 $3$ 个 **平方公式**：

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
  (a+b)^3 &= (a+b)(a+b)(a+b) \\
  &= (a^2+2ab+b^2)(a+b) \\
  &= a^3+2a^2b+ab^2+a^2b+2ab^2+b^3 \\
  &= a^3+3a^2b+3ab^2+b^3
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

### 公式总结

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

## 因式分解

### 公式法

将每一项凑成 **乘法公式** 的形式。

:::example

分解因式 $x^2+4y^2+4xy$。

解得 $x^2+4y^2+4xy=x^2+(2y)^2+2x(2y)=(x+2y)^2$。

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

所以 $x^2-x-6=(x+2)(x-3)$。

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

所以 $2x^2+9x-5=(x+5)(2x-1)$。

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

所以 $6x^2+7x-3=(2x+3)(3x-1)$。

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

所以 $x^2+(3-a)-3a=(x+3)(x-a)$。

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

所以 $x^2-2y^2+xy+x+5y-2=(x+2y-1)(x+2-y)$。

</TabItem>
</Tabs>

:::

### 长除法

根据 [因式定理](https://zh.wikipedia.org/zh-cn/因式定理)，可以通过 **长除法** 来分解多项式。

如果已知多项式的一个或多个零点，因式定理可以帮助提取对应零点的因式，将多项式化简为更低次数的形式，从而简化求根过程。具体步骤如下：

1. 先设法找到多项式 $f$ 的一个零点 $a$。
2. 用因式定理确认 $(x-a)$ 是多项式 $f(x)$ 的因式。
3. 用 **长除法** 计算多项式 $g(x)=\frac{f(x)}{x-a}$。
4. 在方程 $f(x)=0$ 中，所有满足 $x\ne a$ 的根，都是方程 $g(x)=0$ 的根。
5. 由于 $g(x)$ 的多项式次数比 $f(x)$ 低，因此求 $g$ 的零点可能更简单。

:::example

<Tabs>
<TabItem value="Example 1">

分解因式 $x^3+2x^2-4x+1$。

注意到 $x=1$ 是方程的一个根：

$$
\frac{x^3+2x^2-4x+1}{x-1}=x^2+3x-1
$$

所以 $x^3+2x^2-4x+1=(x-1)(x^2+3x-1)$。

</TabItem>
<TabItem value="Example 2">

分解因式 $x^3+x^2-3x-2$。

注意到 $x=-2$ 是方程的一个根：

$$
\frac{x^3+x^2-3x-2}{x+2}=x^2-x-1
$$

所以 $x^3+x^2-3x-2=(x+2)(x^2-x-1)$。

</TabItem>
</Tabs>

:::

## 二重根式

利用 **乘法公式** 和 **因式分解** 的等式变形方法，可以化简二重根式（嵌套根式）。

### 引入

在解数学题时，有时会遇到一些二重根式的结果。

例如，在一个 $15\degree$ 的直角三角形中，两条直角边 $AB$ 和 $AC$ 分别为 $2+\sqrt 3$ 和 $1$。

现在要计算斜边 $BC$ 的长度。根据勾股定理：

$$
BC=\sqrt{AB^2+AC^2}=\sqrt{(2+\sqrt 3)^2+1^2}=\sqrt{8+4\sqrt 3}
$$

但这并不是最简答案，还可以进一步化简。

<img src={require('././assets/de1e7a219492200560905ce9d47c614a.jpg').default} style={{maxWidth: '500px'}} />

### 定义

一般的二重根式的形式如下：

$$
\sqrt{a\pm\sqrt b}
$$

### 推导

我们设最终结果为 $\sqrt x+\sqrt y$：

$$
\sqrt{8+4\sqrt{3}}=\sqrt{x}+\sqrt{y}
$$

则有：

$$
8+4\sqrt{3}=(\sqrt{x}+\sqrt{y})^2=x+y+2\sqrt{xy}
$$

我们可以令：

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

所以化简结果为：

$$
\sqrt{8+4\sqrt{3}}=\sqrt{2}+\sqrt{6}
$$

### 总结

对于一般的二重根式：

$$
\sqrt{a\pm\sqrt{b}}
$$

找到一组正整数 $x$ 和 $y$，使得：

$$
x+y=a,xy=\frac{b}{4}
$$

这样就可以化简为：

$$
\sqrt{a\pm\sqrt{b}}=\sqrt{x}\pm\sqrt{y}
$$

:::tip

1. 并非所有的二重根式都能化简。
2. 能化简的结果也可能不止一个。

:::

:::example

化简 $\sqrt{4-\sqrt{15}}$。

$$
\begin{aligned}
  \sqrt{4-\sqrt{15}} &= \frac{\sqrt{8-2\sqrt{15}}}{\sqrt{2}} \\
  &= \left(\sqrt{5}-\sqrt{3}\right)\cdot\frac{\sqrt{2}}{2} \\
  &= \frac{\sqrt{10}-\sqrt 6}{2}
\end{aligned}
$$

:::

## 不等式

有些教辅和课程中会讲解不等式，但高中阶段也会学习相关内容，因此我将其放在一起了。

详见 [不等式](inequality)
