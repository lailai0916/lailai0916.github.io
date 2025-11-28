---
title: '2025 年浙江中考数学第 24 题'
date: 2025-06-22T12:00
authors: lailai
tags: [math]
---

求不出的 $\frac{3\sqrt{39}-4}{5}$，会不会又成为后来心底的坎？

<!-- truncate -->

## 题目

24.（本题 $12$ 分）在菱形 $ABCD$ 中，$AB=5$，$AC=8$。

（1）如图 $1$，求 $\sin\angle BAC$ 的值。

（2）如图 $2$，$E$ 是 $AD$ 延长线上的一点，连接 $BE$，作 $\triangle FBE$ 与 $\triangle ABE$ 关于直线 $BE$ 对称，$EF$ 交射线 $AC$ 于点 $P$，连接 $BP$。

① 当 $EF\perp AC$ 时，求 $AE$ 的长。

② 求 $PA-PB$ 的最小值。

<Desmos id="4ydta0qtnx" />

<Desmos id="fxo4hftvxi" />

## 建系法

以 $A$ 为原点，$AB$ 为 $x$ 轴正方向建系，易得：

$$
A(0,0),B(5,0),C\left(\frac{32}{5},\frac{24}{5}\right),D\left(\frac{7}{5},\frac{24}{5}\right)
$$

因为 $E$ 在 $AD$ 延长线上，不妨设：

$$
E\left(\frac{7t}{5},\frac{24t}{5}\right)
$$

因为 $F$ 为 $A$ 关于 $BE$ 的对称点，所以：

$$
F=2\left[B+\frac{(A-B)\cdot(E-B)}{\lVert E-B\rVert^{2}}(E-B)\right]-A=\left(
\frac{1152t^{2}}{5(25t^{2}-14t+25)},
\frac{48t(25-7t)}{5(25t^{2}-14t+25)}
\right)
$$

因为 $P$ 为 $AC$ 和 $EF$ 的交点，所以：

$$
P\left(\frac{64t(25t-7)}{5(25t^{2}+50t-39)},\frac{48t(25t-7)}{5(25t^{2}+50t-39)} \right)
$$

令：

$$
f(t)=AP-BP=\frac{16t(25t-7)-3\sqrt{(25t^{2}-14t+25)(425t^{2}-494t+169)}}{25t^{2}+50t-39}
$$

求导：

$$
f'(t)=
\frac{
\left(
800t-112-\frac{3\left[(50t-14)(425t^{2}-494t+169)+(25t^{2}-14t+25)(850t-494)\right]}
{2\sqrt{(25t^{2}-14t+25)(425t^{2}-494t+169)}}
\right)(25t^{2}+50t-39)-
\left(
400t^{2}-112t-3\sqrt{(25t^{2}-14t+25)(425t^{2}-494t+169)}
\right)(50t+50)}
{\left(25t^{2}+50t-39\right)^{2}}
$$

令 $f'(t)=0$：

$$
475t^2-650t+91=0
$$

求解：

$$
t_1=\frac{65-8\sqrt{39}}{95}\approx 0.1583,t_2=\frac{65+8\sqrt{39}}{95}\approx 1.2101
$$

代入 $f(t)$：

$$
f(t_1)=\frac{44-3\sqrt{39}}{5}\approx 5.0530,f(t_2)=\frac{3\sqrt{39}-4}{5}\approx 2.9470
$$

所以 $AP-BP$ 最小值为：

$$
(AP-BP)_{\min}=\frac{3\sqrt{39}-4}{5}\approx 2.9470
$$
