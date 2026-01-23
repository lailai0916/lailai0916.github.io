---
title: '普通生成函数（OGF）'
---

## 参考资料

- [普通生成函数 - OI Wiki](https://oi-wiki.org/math/poly/ogf/)

## 简介

序列 $a$ 的普通生成函数（Ordinary Generating Function，OGF）定义为形式幂级数：

$$
F(x)=\sum_n a_nx^n
$$

换句话说，如果序列 $a$ 有通项公式，那么它的普通生成函数的系数就是通项公式。

## 基本运算

考虑两个序列 $a,b$ 的普通生成函数，分别为 $F(x),G(x)$。那么有

$$
F(x)\pm G(x)=\sum_n (a_n\pm b_n)x^n
$$

因此 $F(x)\pm G(x)$ 是序列 $\langle a_n\pm b_n\rangle$ 的普通生成函数。

考虑乘法运算，也就是卷积：

$$
F(x)G(x)=\sum_n x^n \sum_{i=0}^na_ib_{n-i}
$$

因此 $F(x)G(x)$ 是序列 $\langle \sum_{i=0}^n a_ib_{n-i} \rangle$ 的普通生成函数。
