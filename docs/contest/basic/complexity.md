---
title: '复杂度'
---

## 参考资料

- [复杂度简介 - OI Wiki](https://oi-wiki.org/basic/complexity/)
- [时间复杂度 - 维基百科](https://zh.wikipedia.org/wiki/时间复杂度)
- [主定理 - 维基百科](https://zh.wikipedia.org/wiki/主定理)
- [重谈主定理（master定理）及其证明 - 洛谷专栏](https://www.luogu.com.cn/article/w3avh1ku)

## 定义

衡量一个算法的快慢，一定要考虑数据规模的大小。所谓数据规模，一般指输入的数字个数、输入中给出的图的点数与边数等。一般来说，数据规模越大，算法的用时就越长。

而在算法竞赛中，我们衡量一个算法的效率时，最重要的不是看它在某个数据规模下的用时，而是看它的用时随数据规模而增长的趋势，即 **时间复杂度**（Time Complexity）。

类似地，算法所使用的空间随输入规模变化的趋势可以用 **空间复杂度**（Space Complexity）来衡量。

## 渐近符号

**渐近符号**（Asymptotic Notation）是函数的阶的规范描述。

简单来说，渐近符号忽略了一个函数中增长较慢的部分以及各项的系数，而保留了可以用来表明该函数增长趋势的重要部分。

- 大 $\Theta$ 符号：确界（$=$）
- 大 $O$ 符号：上界（$\le$）
- 大 $\Omega$ 符号：下界（$\ge$）
- 小 $o$ 符号：严格上界（$<$）
- 小 $\omega$ 符号：严格下界（$>$）

## 常见性质

- $f(n)=\Theta(g(n))\iff f(n)=O(g(n))\land f(n)=\Omega(g(n))$
- $f_1(n)+f_2(n)=O(\max(f_1(n),f_2(n)))$
- $f_1(n)\times f_2(n)=O(f_1(n)\times f_2(n))$
- $\forall a\ne 1,\log_a{n}=O(\log_2 n)$

:::tip

根据换底公式，任何底数的对数增长率相同，只相差一个常数，因此在渐近复杂度中通常省略底数。

:::

:::example

<Tabs>
<TabItem value="Example 1">

计算时间复杂度：

```cpp
for(int i=1;i<n;i++)
{
	for(int j=1;j<=n-i;j++)
	{
		// Θ(1)
	}
}
```

<details>
<summary>题解</summary>

时间复杂度为 $\Theta(n^2)$。

</details>

</TabItem>
<TabItem value="Example 2">

计算时间复杂度：

```cpp
for(int i=1;i<=n;i++)
{
	for(int j=1;j<=n;j+=i)
	{
		// Θ(1)
	}
}
```

<details>
<summary>题解</summary>

时间复杂度为 $\Theta\left(\sum_{i=1}^{n}\left\lfloor\frac{n}{i} \right\rfloor\right)=\Theta(n\log n)$。（[调和级数](https://zh.wikipedia.org/wiki/调和级数)）

</details>

</TabItem>
<TabItem value="Example 3">

计算时间复杂度：

```cpp
for(int i=1;i<=n;i++)
{
	for(int j=1;j<=n;j+=i)
	{
		for(int k=1;k<=n;k+=j)
		{
			// Θ(1)
		}
	}
}
```

<details>
<summary>题解</summary>

时间复杂度为 $\Theta(n^2)$。

</details>

</TabItem>
</Tabs>

:::

## 主定理

**主定理**（Master Theorem）可以快速求得关于递归算法的复杂度。

假设有递归关系式：

$$
T(n)=aT\left(\frac{n}{b}\right)+f(n)
$$

其中 $n$ 为问题规模，$a$ 为递归的子问题数量，$\frac{n}{b}$ 为每个子问题的规模，$f(n)$ 为递归以外进行的计算工作。

则有：

$$
T(n)=
\begin{cases}
  \Theta(n^{\log_b a}) & f(n) = O(n^{\log_b (a)-\epsilon}),\epsilon > 0 \\
  \Theta(f(n)) & f(n) = \Omega(n^{\log_b (a)+\epsilon}),\epsilon\ge 0 \\
  \Theta(n^{\log_b a}\log^{k+1} n) & f(n)=\Theta(n^{\log_b a}\log^k n),k\ge 0
\end{cases}
$$

:::example

<Tabs>
<TabItem value="Example 1">

计算时间复杂度：

$$
T(n)=2T\left(\frac{n}{2}\right)+\Theta(1)
$$

<details>
<summary>题解</summary>

时间复杂度为 $\Theta(n)$。

</details>

</TabItem>
<TabItem value="Example 2">

计算时间复杂度：

$$
T(n)=2T\left(\frac{n}{2}\right)+\Theta(n)
$$

<details>
<summary>题解</summary>

时间复杂度为 $\Theta(n\log n)$。

</details>

</TabItem>
<TabItem value="Example 3">

计算时间复杂度：

$$
T(n)=2T\left(\frac{n}{2}\right)+\Theta(n\log n)
$$

<details>
<summary>题解</summary>

时间复杂度为 $\Theta(n\log^2 n)$。

</details>

</TabItem>
</Tabs>

:::
