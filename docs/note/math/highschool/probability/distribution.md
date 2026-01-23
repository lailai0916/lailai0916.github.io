---
title: '分布'
---

## 参考资料

- [概率分布 - 维基百科](https://zh.wikipedia.org/wiki/概率分布)

## 二项分布

我们把只包含 **两个** 可能结果的试验叫做 **伯努利试验**，独立地重复进行 $n$ 次所组成的随机试验称为 $n$ **重伯努利试验**。

在 $n$ 重伯努利试验中，设每次试验中事件 $A$ 发生的概率为 $p$，发生的次数为 $X$，则有：

$$
P(X=k)=C_n^kp^k(1-p)^{n-k}
$$

如果随机变量 $X$ 的分布列具有上式的形式，则称随机变量 $X$ 服从 **二项分布**，记作：

$$
X\sim B(n,p)
$$

由 [二项式定理](../basic/counting#二项式定理)，容易得到：

$$
\sum_{k=0}^n P(X=k)=\sum_{k=0}^n C_n^kp^k(1-p)^{n-k}=\left[p+(1-p)\right]^n=1
$$

## 超几何分布

**超几何分布**：假设一批产品共 $N$ 件，其中有 $M\leq N$ 件次品。从 $N$ 件产品中随机不放回抽取 $n\leq N$ 件，用 $X$ 表示抽取的次品数，则有：

$$
P(X=k)=\frac{C_M^kC^{n-k}_{N-M}}{C_N^n}
$$

$$
E(X)=\frac{nM}{N},D(X)=\frac{nM(N-M)(N-n)}{N^2(N-1)}
$$

与二项分布相比，超几何分布更集中在均值附近。

## 正态分布

**正态分布**（高斯分布）是一种 **连续** 的概率分布，可以看作二项分布的极限情况。

正态分布的解析式：

$$
f(x)=\frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}
$$

其中 $\mu\in\R,\sigma >0$ 为参数。对 $\forall x\in\R,f(x)>0$，可以用积分证明 $x$ 轴与曲线之间的区域面积为 $1$。称 $f(x)$ 为正态密度函数，图像为正态（ 密度 ）曲线。$X$ 服从正态分布，记为：

$$
X\sim N(\mu,\sigma^2)
$$

$$
E(X)=\mu,D(X)=\sigma^2
$$

特别地，当 $\mu=0,\sigma=1$ 时称 $X$ 服从标准正态分布。

正态分布的特点：

- 曲线是单峰的，关于 $x=\mu$ 对称；在 $x=\mu$ 达到峰值 $\frac{1}{\sigma\sqrt{2\pi}}$。
- $\lim_{|x|\to\infty}f(x)=0$。
- 当 $\sigma$ 较小时，曲线“瘦高”，反之“矮胖”。

常用取值：

$$
P(\mu-\sigma\leq X\leq \mu+\sigma)\approx 0.6827
$$

$$
P(\mu-1.96\sigma\leq X\leq \mu+1.96\sigma)=0.95
$$

$$
P(\mu-2\sigma\leq X\leq \mu+2\sigma)\approx 0.9545
$$

$$
P(\mu-2.58\sigma\leq X\leq \mu+2.58\sigma)=0.99
$$

$$
P(\mu-3\sigma\leq X\leq \mu+3\sigma)\approx 0.9973
$$

$3\sigma$ 原则：服从于正态分布 $N(\mu,\sigma^2)$ 的随机变量通常只取 $[\mu-3\sigma,\mu+3\sigma]$ 之间的值。
