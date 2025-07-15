---
title: '数学：微积分（咕）'
date: 2024-02-17T12:00
authors: [lailai]
tags: [math]
---

<!-- truncate -->

## 定积分

简单来说，定积分 $\displaystyle\int_l^r f(x) \mathrm{d}x$ 就是函数 $f(x)$ 在区间 $[l,r]$ 中与 $x$ 轴围成的有向面积。

:::tip

有向面积：在 $x$ 轴上方（蓝色）的面积为正，下方（黄色）的面积为负。

图中 $\displaystyle\int_a^b f(x) \mathrm{d}x=\text{蓝色面积}-\text{黄色面积}$。

:::

## 前缀和

### 引入

思考：已知一个数列 $A_n$，有多次询问，如何快速求出 $A_n$ 在区间 $[l,r]$ 的总和？

$A_l+A_{l+1}+\cdots+A_r=\displaystyle\sum_{i=l}^r A_i$

### 定义

前缀和可以理解为「数列的前 $n$ 项的和」，是一种预处理方式

$S_n=A_1+A_2+\cdots+A_n=\displaystyle\sum_{i=1}^n A_i$

此时数列 $S_n$ 就是 $A_n$ 的前缀和数列

### 应用

利用前缀和，即可快速求出 $A_n$ 在区间 $[l,r]$ 的总和

$\displaystyle\sum_{i=l}^r A_i=S_r-S_{l-1}$

## 数列与函数

数列看作以正整数为定义域的函数

## 不定积分

刚才我们利用前缀和思想，已经快速求出数列的区间和

而定积分是要给函数求“区间和”

我们可以像数列一样给函数求“前缀和”，而这个过程就是不定积分

不定积分可以理解为「函数 $f(x)$ 在区间 $[0,x]$ 的定积分」，即函数 $f(x)$ 在区间 $[0,x]$ 的面积

## 微积分基本定理

我们先不关心如何求不定积分

假设我们已经知道 $F(x)$ 是 $f(x)$ 的不定积分

仿照数列前缀和思想

$\displaystyle\int_l^r f(x) \mathrm{d}x=F(r)-F(l)$

即 $[l,r] \text{ 的面积} = [0,r] \text{ 的面积} -[0,l] \text{ 的面积}$
