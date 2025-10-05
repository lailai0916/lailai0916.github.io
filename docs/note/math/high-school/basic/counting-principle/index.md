# 计数原理

## 参考资料

- [组合数学 - 维基百科](https://zh.wikipedia.org/zh-cn/组合数学)
- [【漫士】这是你学明白组合数学最好的机会 - bilibili](https://www.bilibili.com/video/BV1iT92YAEfs)
- [[Manim动画]如何以可视化视角直观理解排列组合？ - bilibili](https://www.bilibili.com/video/BV17N4y1F7CL)

## 原理

### 加法原理

加法原理：完成一项任务有 $n$ 类 **方式**，第 $i$ 类方式有 $a_i$ 种方案，则完成该任务的方案数为：

$$
\sum_{i=1}^n a_i=a_1+a_2+\dots+a_n
$$

:::example

从家到学校有 $2$ 类出行方式：

1. 地铁：可选择地铁 $1$ 号线或 $4$ 号线，共 $2$ 种；
2. 公交：可选择公交 $5$ 路、$26$ 路或 $38$ 路，共 $3$ 种。

根据加法原理，共有 $2+3=5$ 种不同的出行方案。

:::

### 乘法原理

乘法原理：完成一项任务有 $n$ 个 **步骤**，第 $i$ 个步骤有 $a_i$ 种方案，则完成该任务的方案数为：

$$
\prod_{i=1}^n a_i=a_1\times a_2\times\dots\times a_n
$$

:::example

早上出门换衣服时：

1. 上衣：有 $4$ 件；
2. 裤子：有 $3$ 条。

根据乘法原理，共有 $4\times 3=12$ 种不同的搭配方案。

:::

## 排列组合

### 全排列

全排列：将 $n$ 个不同的物品排成一列：

- 第 $1$ 个位置有 $n$ 种选择；
- 第 $2$ 个位置有 $n-1$ 种选择；
- 第 $3$ 个位置有 $n-2$ 种选择；
- ……
- 第 $n-1$ 个位置有 $2$ 种选择；
- 第 $n$ 个位置有 $1$ 种选择。

根据乘法原理，全排列的方案数为：

$$
n\times(n-1)\times(n-2)\times\dots\times 2\times 1
$$

### 阶乘

我们将正整数从 $1$ 到 $n$ 的连乘积称为 **阶乘**，用 $n$ 后面加感叹号（$!$）表示。

$$
n!=1\times 2\times 3\times\dots\times (n-1)\times n
$$

特别地，我们定义：

$$
0!=1
$$

对于任意正整数 $n$ 的阶乘，有性质：

$$
n!=n\times (n-1)!
$$

| $0!=1$ |  $3!=6$  |  $6!=720$  |  $9!=362880$  |
| :----: | :------: | :--------: | :-----------: |
| $1!=1$ | $4!=24$  | $7!=5040$  | $10!=3628800$ |
| $2!=2$ | $5!=120$ | $8!=40320$ |   $\dots‌$    |

:::example

$$
5!=1\times 2\times 3\times 4\times 5=120
$$

:::

### 排列

考虑从 $n$ 个不同物品中选取 $m$ 个，排成一列：

- 第 $1$ 个位置有 $n$ 种选择；
- 第 $2$ 个位置有 $n-1$ 种选择；
- 第 $3$ 个位置有 $n-2$ 种选择；
- ……
- 第 $m-1$ 个位置有 $n-m+2$ 种选择；
- 第 $m$ 个位置有 $n-m+1$ 种选择。

根据乘法原理，方案数为：

$$
n\times(n-1)\times(n-2)\times\dots\times(n-m+1)=\frac{n!}{(n-m)!}
$$

我们用 $\mathrm{A}_n^m$ 表示 **排列数**：

$$
\mathrm{A}_n^m=\frac{n!}{(n-m)!}=n\times(n-1)\times(n-2)\times\dots\times(n-m+1)
$$

### 组合

考虑从 $n$ 个不同元素中选取 $m$ 个，但考虑顺序。

若考虑顺序，这就变成了排列问题，我们已经知道有 $\mathrm{A}_n^m$ 种方案。

在这些排列方案中，每组 $m$ 个元素由于顺序不同被重复计算了 $m!$ 次，因此真正的方案数为：

$$
\frac{\mathrm{A}_n^m}{m!}
$$

我们用 $\mathrm{C}_n^m$ 表示 **组合数**：

$$
\mathrm{C}_n^m=\frac{\mathrm{A}_n^m}{m!}=\frac{n!}{m!(n-m)!}=\frac{n\times(n-1)\times\dots\times(n-m+1)}{m\times(m-1)\times\dots\times 2\times 1}
$$

:::tip

排列数还可以使用 $\mathrm{P}_n^m$ 表示，但在高中教材中通常使用 $\mathrm{A}_n^m$。

$$
\mathrm{A}_n^m=\mathrm{P}_n^m
$$

组合数还可以使用 $\dbinom{n}{m}$ 表示，请注意 $n$ 和 $m$ 的位置顺序。

$$
\mathrm{C}_n^m=\dbinom{n}{m}
$$

:::

### 性质

$$
\mathrm{C}_n^m=\mathrm{C}_n^{n-m}
$$

$$
\mathrm{C}_n^m=\mathrm{C}_{n-1}^m+\mathrm{C}_{n-1}^{m-1}
$$

$$
\frac{m}{n}\mathrm{C}_n^m=\mathrm{C}_{n-1}^{m-1}
$$

$$
\frac{n}{n-m}\mathrm{C}_{n-1}^m=\mathrm{C}_n^m
$$

$$
\sum_{i=0}^{n}\mathrm{C}_n^i=\mathrm{C}_n^0+\mathrm{C}_n^1+\mathrm{C}_n^2+\dots+\mathrm{C}_n^n=2^n
$$

$$
\mathrm{C}_n^0+\mathrm{C}_n^2+\mathrm{C}_n^4+\dots=\mathrm{C}_n^1+\mathrm{C}_n^3+\mathrm{C}_n^5+\dots
$$

### 应用

1. 有 $n$ 个 **完全相同** 的元素，要求将其分为 $k$ 组，保证每组至少有一个元素，一共有多少种分法？

考虑拿 $k-1$ 块板子插入到 $n$ 个元素两两形成的 $n-1$ 个空里面，答案为 $\mathrm{C}_{n-1}^{k-1}$，本质是求 $x_1+x_2+\dots+x_k=n$ 的正整数解的组数。

2. 若问题变换一下，每组允许为空？

考虑创造条件转化成有限制的问题一，先借 $k$ 个元素过来，在这 $n+k$ 个元素形成的 $n+k-1$ 个空里面插板，答案为 $\mathrm{C}_{n+k-1}^n$，本质是求 $x_1+x_2+\dots+x_k=n$ 的非负整数解的组数。

3. 再扩展一步，要求对于第 $i$ 组，至少要分到 $a_i$ 个元素呢？（$\sum a_i\leq n$）

本质是求 $x_1+x_2+\dots+x_k=n$ 的整数解的数目。

类比无限制的情况，我们借 $\sum a_i$ 个元素过来，保证第 $i$ 组能至少分到 $a_i$ 个，也就是令 $x_i'=x_i-a_i$ 且 $x_i'\geq 0$

得到新方程：

$$
(x_1'+a_1)+(x_2'+a_2)+\dots+(x_k'+a_k)=n\implies\sum_{i=1}^{k}x_i'=n-\sum a_i
$$

答案为：

$$
\mathrm{C}_{n-\sum a_i+k-1}^{k-1}
$$

4. 从 $n$ 个连续整数选 $k$ 个，这 $k$ 个数中两两都不相邻的组合有 $\mathrm{C}_{n-k+1}^k$ 种。

5. 若将 $n$ 个 **不同的** 的元素分成 $a$ 组，第 $i$ 组的数量为 $n_i$，其中相同的组共有 $b$ 类，第 $k$ 类的相同组的个数为 $s_k$，则方案数为：

$$
\frac{n!}{\prod_{i=1}^a(n_i!)\times\prod_{k=1}^b(s_k!)}
$$

原理：

$$
\mathrm{C}_{n}^{n_1}\mathrm{C}_{n-n_1}^{n_2}\dots \mathrm{C}_{n_a}^{n_a}=\frac{n!}{n_1!\times n_2!\times\dots\times n_a!}=\frac{n}{\prod_{i=1}^a(n_i!)}
$$

:::example

<Tabs>
<TabItem value="Example 1">

将 $6$ 本不同的书分给甲乙丙 $3$ 人，每人 $2$ 本，有多少种分法？

这是不同的 $3$ 组，即没有相同的组，故不用消除组间排序，答案为：

$$
\frac{6!}{2!2!2!}=90
$$

如果是分成三组每组 $2$ 本，那就要消除组间排序，答案为：

$$
\frac{6!}{(2!2!2!)\times 3!}=15
$$

</TabItem>
<TabItem value="Example 2">

将 $14$ 个人分成人数分别为 $2,2,2,4,4$ 的无区别的五组，有多少种分法？

$$
\frac{14!}{(2!2!2!4!4!)(3!2!)}=1576575
$$

</TabItem>
</Tabs>

:::

## 二项式定理

**二项式** 是只有 $2$ 项的多项式，例如 $a+b$、$2x-1$。

在初中阶段，我们已经学过 $(a+b)^2$ 和 $(a+b)^3$ 的展开式。

考虑 $(a+b)^n$ 的各项系数有什么规律？

我们发现，$(a+b)^n$ 展开后会有 $2^n$ 项。

其中，若取 $k$ 个因子为 $a$，其余 $n-k$ 个因子为 $b$，就会得到含有 $a^kb^{n-k}$ 的项。

而从 $n$ 个因子中选出 $k$ 个为 $a$ 的方法数正好是 $\mathrm{C}_n^k$。

由此，我们得到了著名的 **二项式定理**：

$$
(a+b)^n=\sum_{k=0}^{n}\mathrm{C}_n^ka^kb^{n-k}
$$

其中各项的系数 $\mathrm{C}_n^k$ 叫做 **二项式系数**。

:::example

<Tabs>
<TabItem value="Example 1">

$$
(2x+3y)^3=8x^3+36x^2y+54xy^2+27y^3
$$

</TabItem>
<TabItem value="Example 2">

$$
\left(3x+\frac{5}{x^2}\right)^4=81x^4+540x+\frac{1350}{x^2}+\frac{1500}{x^5}+\frac{625}{x^8}
$$

</TabItem>
</Tabs>

:::

对于三项式，也可以使用公式展开，但过程较为复杂：

$$
(a+b+c)^n=\sum_{i+j+k=n}\frac{n!}{i!j!k!}a^ib^jc^k
$$

:::example

<Tabs>
<TabItem value="Example 1">

$$
\begin{aligned}
  (a+b+c)^3 &= \frac{3!}{3!0!0!}a^3+\frac{3!}{0!3!0!}b^3+\frac{3!}{0!0!3!}c^3+\frac{3!}{2!1!0!}a^2b+\frac{3!}{2!0!1!}a^2c \\
  &+ \frac{3!}{1!2!0!}ab^2+\frac{3!}{0!2!1!}b^2c+\frac{3!}{1!0!2!}ac^2+\frac{3!}{0!1!2!}bc^2+\frac{3!}{1!1!1!}abc \\
  &= a^3+b^3+c^3+3a^2b+3a^2c+3b^2a+3b^2c+3c^2a+3c^2b+6abc
\end{aligned}
$$

</TabItem>
<TabItem value="Example 2">

求 $(x+2y-3z)^6$ 的展开式 $xy^2z^3$ 项。

$$
\frac{6!}{1!2!3!}x(2y)^2(-3z)^3=-6480xy^2z^3
$$

</TabItem>
<TabItem value="Example 3">

求 $\left(x+\frac{2}{x}-1\right)^4$ 的展开式常数项。

$$
\frac{4!}{0!0!4!}(-1)^4+\frac{4!}{1!1!2!}x\cdot\frac{2}{x}\cdot(-1)^2+\frac{4!}{2!2!0!}x^2\cdot\left(\frac{2}{x}\right)^2=1+24+24=49
$$

</TabItem>
</Tabs>

:::

## 杨辉三角形

我们将二项式系数排列为三角形，就得到了 **杨辉三角形**。

![](./assets/3ea3411611c51fa98bfb8b3fa7d8ca0222527ab9.svg)

杨辉三角形中的每个数都对应一个 **组合数**，而每个数是它 **左上方** 和 **右上方** 的数的和。

![](./assets/PascalTriangleAnimated2.gif)
