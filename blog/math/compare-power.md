---
title: '比较 x^y 与 y^x'
date: 2025-08-23T15:17
authors: [lailai]
tags: [math]
---

<!-- truncate -->

## 引入

对于两个正实数 $x$ 和 $y$，如何比较 $x^y$ 和 $y^x$ 的大小？

$$
x^y\gtreqless y^x
$$

## 思考

两边同时取自然对数：

$$
\ln{x^y}\gtreqless \ln{y^x}\iff y\ln{x}\gtreqless x\ln{y}\iff \frac{\ln{x}}{x}\gtreqless \frac{\ln{y}}{y}
$$

由此构造函数：

$$
f(t)=\frac{\ln t}{t}
$$

原问题转化为比较 $f(x)$ 与 $f(y)$ 的大小。

## 求解

对 $f(t)$ 求导：

$$
f'(t)=\frac{1-\ln t}{t^2}
$$

令导数为 $0$：

$$
f'(t)=\frac{1-\ln t}{t^2}=0\iff t=e
$$

因此 $f(t)$ 在 $(0,e)$ 单调递增，在 $t=e$ 处取得最大值 $\frac{1}{e}$，在 $(e,+\infty)$ 单调递减。

## 分类讨论

1. 如果 $x$ 或 $y$ 等于 $e$：

底数等于 $e$ 的较大。

2. 如果 $x$ 和 $y$ 都小于 $e$：

- 如果 $x<y<e$，那么 $x^y<y^x$。
- 如果 $y<x<e$，那么 $x^y>y^x$。

3. 如果 $x$ 和 $y$ 都大于 $e$：

- 如果 $e<x<y$，那么 $x^y>y^x$。
- 如果 $e<y<x$，那么 $x^y<y^x$。

4. 如果 $x$ 和 $y$ 在 $e$ 的两侧：

此时只能直接比较 $y\ln x$ 和 $x\ln y$ 的大小。

## 图像

图中黑色曲线 $x^y=y^x$，红色区域 $x^y>y^x$，蓝色区域 $x^y<y^x$

<Desmos id="bcfuoq2oyh" />

## 例题

### 2^4 与 4^2

$$
2^4=16=4^2
$$

### e^π 与 π^e

$$
e^\pi=e^e\left(e^{\frac{\pi}{e}-1}\right)^e>e^e\left(\frac{\pi}{e}-1+1\right)^e=\pi^e
$$
