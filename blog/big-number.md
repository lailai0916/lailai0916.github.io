---
title: '数学：大数'
date: 2025-07-20T10:00
authors: [lailai]
tags: [math]
---

<!-- truncate -->

## 参考资料

- [大数 (数学) - 维基百科](<https://zh.wikipedia.org/zh-cn/大数_(数学)>)
- [How Big is Graham's Number? (feat Ron Graham) - Youtube](https://www.youtube.com/watch?v=GuigptwlVHo)
- [葛立恒数是什么？有多大？一个穷尽所有算力也无法计算出来的大数 - bilibili](https://www.bilibili.com/video/BV1Yt411z7dR)
- [比葛立恒数还大的TREE(3)究竟有多大？教你用超运算表示大数 - bilibili](https://www.bilibili.com/video/BV1Kt411z7fB)

## 超运算

## 大数记号

### 高德纳箭号表示法

$$
a\uparrow b=a^b
$$

$$
a\uparrow^n b=a\underbrace{\uparrow\uparrow\cdots\uparrow}_{n\text{个}\uparrow}b
$$

$$
a\uparrow^n b=\underbrace{a\uparrow^{n-1}a\uparrow^{n-1}\cdots\uparrow^{n-1}a}_{b\text{个}a}
$$

$$
a\uparrow\uparrow b=\underbrace{a^{a^{\cdots^a}}}_{b\text{个}a}
$$

$$
3\uparrow\uparrow 3=3^{3^3}=3^{27}\approx7.6\times10^{12}
$$

$$
3\uparrow\uparrow\uparrow 3=3\uparrow\uparrow 3\uparrow\uparrow 3=3\uparrow\uparrow 3^{27}=\underbrace{3^{3^{\cdots^3}}}_{3^{27}\text{个}3}
$$

$$
3\uparrow\uparrow\uparrow\uparrow 3=3\uparrow\uparrow\uparrow 3\uparrow\uparrow\uparrow 3
$$

### 康威链式箭号表示法

## Ackermann 函数


## 葛立恒数

$$
g_1=3\uparrow\uparrow\uparrow\uparrow 3
$$

$$
g_n=3\uparrow^{g_{n-1}}3
$$

$$
G=g_{64}
$$

$$
G = \left.
\begin{matrix}
  3\underbrace{\uparrow \uparrow \cdots \cdots \cdots \cdots \cdots \uparrow}3 \\
  3\underbrace{\uparrow \uparrow \cdots \cdots \cdots \cdots \uparrow}3 \\
  \underbrace{\qquad \quad \vdots \qquad \quad} \\
  3\underbrace{\uparrow \uparrow \cdots \cdots \uparrow}3 \\
  3\uparrow \uparrow \uparrow \uparrow 3
\end{matrix}
\right \} 64\text{layers}
$$

## TREE 数列
