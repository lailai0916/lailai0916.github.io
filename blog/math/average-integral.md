---
title: '与平均有关的定积分'
date: 2025-07-22T11:00
tags: [math]
---

一个与平均有关的定积分，并扩展均值不等式。

<!-- truncate -->

## 参考资料

- [与平均有关的定积分 - 知乎](https://zhuanlan.zhihu.com/p/601496318)
- [[证毕QED]一个积分六个平均数 - bilibili](https://www.bilibili.com/video/BV1DW421w7Z8)

## 公式

设：

$$
f(t)=\frac{\int_a^b x^{t+1}\mathrm{d}x}{\int_a^b x^t\mathrm{d}x}
$$

当 $t\ne -1$ 且 $t\ne -2$ 时，可化简为：

$$
f(t)=\frac{(t+1)(b^{t+2}-a^{t+2})}{(t+2)(b^{t+1}-a^{t+1})}
$$

函数 $f(t)$ 是单调不减的。

<Desmos id="jqbeguzcnr" />

## 均值

$$
H(a,b)\le G(a,b)\le N(a,b)\le A(a,b)\le T(a,b)
$$

### 调和平均数（$t=-3$）

$$
f(-3)=\frac{-2(b^{-1}-a^{-1})}{-1(b^{-2}-a^{-2})}=\frac{2ab}{a+b}=H(a,b)
$$

### 几何平均数（$t=-1.5$）

$$
f(-1.5)=\frac{-0.5(b^{0.5}-a^{0.5})}{0.5(b^{-0.5}-a^{-0.5})}=\sqrt{ab}=G(a,b)
$$

### 海伦平均数（$t=-0.5$）

$$
f(-0.5)=\frac{0.5(b^{1.5}-a^{1.5})}{1.5(b^{0.5}-a^{0.5})}=\frac{a+\sqrt{ab}+b}{3}=N(a,b)
$$

### 算术平均数（$t=0$）

$$
f(0)=\frac{1(b^2-a^2)}{2(b^1-a^1)}=\frac{a+b}{2}=A(a,b)
$$

### 质心平均数（$t=1$）

$$
f(1)=\frac{2(b^3-a^3)}{3(b^2-a^2)}=\frac{2(a^2+ab+b^2)}{3(a+b)}=T(a,b)
$$
