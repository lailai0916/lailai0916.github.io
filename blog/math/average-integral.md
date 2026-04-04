---
title: 与均值有关的定积分函数
date: 2025-07-22T11:00
tags: [math]
---

一些与均值有关的定积分函数。

<!-- truncate -->

## 参考资料

- [与平均有关的定积分 - 知乎](https://zhuanlan.zhihu.com/p/601496318)
- [[证毕QED]一个积分六个平均数 - bilibili](https://www.bilibili.com/video/BV1DW421w7Z8)

## 函数

设：

$$
f(t)=\frac{\int_a^b x^{t+1}\mathrm{d}x}{\int_a^b x^t\mathrm{d}x}
$$

当 $t\ne -1\land t\ne -2$ 时，可化简为：

$$
f(t)=\frac{(t+1)(b^{t+2}-a^{t+2})}{(t+2)(b^{t+1}-a^{t+1})}
$$

显然，函数 $f(t)$ 单调不减。

## 图像

<Desmos id="5gkcu5nq4c" />

## 均值

该函数可以并推广 [均值不等式](/docs/note/math/highschool/basic/inequality#均值不等式)。

$$
0<a\le b
$$

$$
a\le H(a,b)\le G(a,b)\le L(a,b)\le N(a,b)\le A(a,b)\le T(a,b)\le b
$$

### 调和平均数

$$
H(a,b)=f(-3)=\frac{-2(b^{-1}-a^{-1})}{-1(b^{-2}-a^{-2})}=\frac{2ab}{a+b}
$$

### 几何平均数

$$
G(a,b)=f(-1.5)=\frac{-0.5(b^{0.5}-a^{0.5})}{0.5(b^{-0.5}-a^{-0.5})}=\sqrt{ab}
$$

### 对数平均数

$$
L(a,b)=f(-1)=\frac{\int_a^b x^0\mathrm{d}x}{\int_a^b x^{-1}\mathrm{d}x}=\frac{b-a}{\ln b-\ln a}
$$

### 海伦平均数

$$
N(a,b)=f(-0.5)=\frac{0.5(b^{1.5}-a^{1.5})}{1.5(b^{0.5}-a^{0.5})}=\frac{a+\sqrt{ab}+b}{3}
$$

### 算术平均数

$$
A(a,b)=f(0)=\frac{1(b^2-a^2)}{2(b^1-a^1)}=\frac{a+b}{2}
$$

### 质心平均数

$$
T(a,b)=f(1)=\frac{2(b^3-a^3)}{3(b^2-a^2)}=\frac{2(a^2+ab+b^2)}{3(a+b)}
$$
