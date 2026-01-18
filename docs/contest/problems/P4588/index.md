---
title: '洛谷 P4588 [TJOI2018] 数学计算'
link: 'https://www.luogu.com.cn/problem/P4588'
---

小豆现在有一个数 $x$，初始值为 $1$。小豆有 $Q$ 次操作，操作有两种类型：

`1 m`：将 $x$ 变为 $x \times m$，并输出 $x \bmod M$

`2 pos`：将 $x$ 变为 $x$ 除以第 $pos$ 次操作所乘的数（保证第 $pos$ 次操作一定为类型 1，对于每一个类型 1 的操作至多会被除一次），并输出 $x \bmod M$。
