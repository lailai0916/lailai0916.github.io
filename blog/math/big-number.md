---
title: '大数'
date: 2025-07-20T10:00
tags: [math]
---

一些很大很大的数……

<!-- truncate -->

## 参考资料

- [大数 (数学) - 维基百科](<https://zh.wikipedia.org/wiki/大数_(数学)>)
- [How Big is Graham's Number? (feat Ron Graham) - Youtube](https://www.youtube.com/watch?v=GuigptwlVHo)
- [葛立恒数是什么？有多大？一个穷尽所有算力也无法计算出来的大数 - bilibili](https://www.bilibili.com/video/BV1Yt411z7dR)
- [比葛立恒数还大的TREE(3)究竟有多大？教你用超运算表示大数 - bilibili](https://www.bilibili.com/video/BV1Kt411z7fB)

## 超运算

- [超运算 - 维基百科](https://zh.wikipedia.org/wiki/超运算)

**超运算**（Hyperoperation）是把「重复前一级运算」这一过程不断递归推广所得到的一族运算，从加法、乘法、幂运算一直向上延伸。

我们将 **后继运算** 定义为零级运算（超-0 运算）：

$$
a[0]b=H_0(a,b)=b+1
$$

若要把后继运算重复 $b$ 次，我们引入 **加法运算**，即一级运算（超-1 运算）：

$$
a[1]b=H_1(a,b)=a+b=a+\underbrace{1+1+\dots+1}_b
$$

若要把 $a$ 连续相加 $b$ 次，我们引入 **乘法运算**，即二级运算（超-2 运算）：

$$
a[2]b=H_2(a,b)=a\times b=\underbrace{a+a+\dots+a}_b
$$

若要把 $a$ 连续相乘 $b$ 次，我们引入 **幂运算**，即三级运算（超-3 运算）：

$$
a[3]b=H_3(a,b)=a^b=\underbrace{a\times a\times\dots\times a}_b
$$

不难发现，每一级运算都是对前一级运算的重复，而 $n$ 级运算记作 $a[n]b$ 或 $H_n(a,b)$：

$$
H_n(a,b)=a[n]b=
\begin{cases}
  b+1 & n=0 \\
  a & n\ge 1\land b=1 \\
  H_{n-1}(a,H_n(a,b-1)) & \text{otherwise}
\end{cases}
$$

继续推广，四级运算（超-4 运算）定义为 **重幂运算**（Tetration），也称为 **迭代幂次**：

$$
a[4]b=H_4(a,b)={}^b a=\underbrace{a^{a^{\cdot^{\cdot^{\cdot^a}}}}}_b
$$

五级运算（超-5 运算）其实也有特殊记号 ${}_b a$，但并不常用：

$$
a[5]b=H_5(a,b)={}_b a=\underbrace{{}^{{}^{{}^{{}^{{}^a\cdot}\cdot}\cdot}a}a}_b
$$

再往后可以根据递推公式计算。

## 大数记号

### 高德纳箭号表示法

$$
a\uparrow b=a^b
$$

$$
a\uparrow^n b=a\underbrace{\uparrow\uparrow\dots\uparrow}_n b
$$

$$
a\uparrow^n b=\underbrace{a\uparrow^{n-1}a\uparrow^{n-1}\dots\uparrow^{n-1}a}_b
$$

$$
a\uparrow\uparrow b=\underbrace{a^{a^{\dots^a}}}_b
$$

$$
3\uparrow\uparrow 3=3^{3^3}=3^{27}\approx7.6\times10^{12}
$$

$$
3\uparrow\uparrow\uparrow 3=3\uparrow\uparrow 3\uparrow\uparrow 3=3\uparrow\uparrow 3^{27}=\underbrace{3^{3^{\dots^3}}}_{3^{27}}
$$

$$
3\uparrow\uparrow\uparrow\uparrow 3=3\uparrow\uparrow\uparrow 3\uparrow\uparrow\uparrow 3
$$

### 康威链式箭号表示法

### Ackermann 函数

## 葛立恒数

$$
g_1=3\uparrow\uparrow\uparrow\uparrow 3
$$

$$
g_n=3\uparrow^{g_{n-1}}3
$$

$$
G=g_{64}=
\left.\begin{matrix}
  3\underbrace{\uparrow\uparrow\dots\dots\dots\dots\dots\uparrow}3 \\
  3\underbrace{\uparrow\uparrow\dots\dots\dots\dots\uparrow}3 \\
  \underbrace{\qquad\quad\vdots\qquad\quad} \\
  3\underbrace{\uparrow\uparrow\dots\dots\uparrow}3 \\
  3\uparrow\uparrow\uparrow\uparrow 3
\end{matrix}\right\}64
$$

## TREE 函数

## 无穷
