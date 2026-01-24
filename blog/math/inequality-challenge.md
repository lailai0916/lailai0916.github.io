---
title: '不等式挑战'
date: 2025-01-14T05:07
tags: [math]
---

网上一个不等式挑战闯关。

<!-- truncate -->

## 题目

已知实数 $a,b$ 满足 $a^2+b^2=1$，分别求以下式子的最大值：

1. $ab$
2. $a+b$
3. $a+3b$
4. $(a+1)(b+1)$
5. $(a+1)(b-1)$
6. $(a+1)(5b+2)$
7. $(a+1)(b+2)$

## Level 1

求 $ab$ 的最大值。

根据均值不等式：

$$
2ab\le a^2+b^2=1
$$

所以 $ab$ 的最大值为 $\frac{1}{2}$。

## Level 2

求 $a+b$ 的最大值。

根据均值不等式：

$$
\frac{a+b}{2}\le\sqrt{\frac{a^2+b^2}{2}}=\sqrt{\frac{1}{2}}
$$

所以 $a+b$ 的最大值为 $\sqrt{2}$。

## Level 3

求 $a+3b$ 的最大值。

$$
(a+3b)^2\le(a+3b)^2+(3a-b)^2=10(a^2+b^2)=10
$$

所以 $a+3b$ 的最大值为 $\sqrt{10}$。

## Level 4

求 $(a+1)(b+1)$ 的最大值。

$$
(a+1)(b+1)=ab+a+b+1\le\frac{a^2+b^2}{2}+\sqrt{2(a^2+b^2)}+1=\frac{3+2\sqrt{2}}{2}
$$

所以 $(a+1)(b+1)$ 的最大值为 $\frac{3+2\sqrt{2}}{2}$。

## Level 5

求 $(a+1)(b-1)$ 的最大值。

$$
\begin{aligned}
  (a+1)(b-1) &= ab-a+b-1 \\
  &= \frac{a^2+b^2-(a-b)^2}{2}-(a-b)-1 \\
  &= \frac{1}{2}-\frac{1}{2}(a-b)^2-(a-b)-1 \\
  &= -\frac{1}{2}(a-b+1)^2\le 0
\end{aligned}
$$

所以 $(a+1)(b-1)$ 的最大值为 $0$。

## Level 6

求 $(a+1)(5b+2)$ 的最大值。

$$
\begin{aligned}
  (a+1)(5b+2) &= 5ab+2a+5b+2 \\
  &= \frac{5}{12}(4a\cdot 3b)+\frac{2}{15}(5a\cdot 3)+\frac{1}{4}(5b\cdot 4)+2 \\
  &\le \frac{5}{12}\cdot\frac{16a^2+9b^2}{2}+\frac{2}{15}\cdot\frac{25a^2+9}{2}+\frac{1}{4}\cdot\frac{25b^2+16}{2}+2 \\
  &= 5(a^2+b^2)+\frac{23}{5}=\frac{48}{5}
\end{aligned}
$$

所以 $(a+1)(5b+2)$ 的最大值为 $\frac{48}{5}$。

## Level 7

求 $(a+1)(b+2)$ 的最大值。

钓鱼题，但可以用 [拉格朗日乘数](https://zh.wikipedia.org/wiki/拉格朗日乘数) 和 [三次方程求根公式](https://zh.wikipedia.org/wiki/三次方程) 暴力解决。

求得 $(a+1)(b+2)$ 的最大值为：

$$
2+\frac{1}{4}\left(\sqrt[3]{172+\frac{61}{9}\sqrt{183}}+\sqrt[3]{172-\frac{61}{9}\sqrt{183}}\right)\approx 4.68175
$$
