---
title: '数学：进制效率'
date: 2023-05-21T12:00
authors: [lailai]
tags: [math]
---

<!-- truncate -->

## 参考资料

- [为什么3进制效率较高？ - bilibili](https://www.bilibili.com/video/BV1jS4y167h1)
- [三进位电脑 - 维基百科](https://zh.wikipedia.org/zh-cn/三進位電腦)

## 问题

为什么 $e$ 进制理论效率最高？

## 思考

考虑用 $x$ 进制表示 $n$（$x>1,n>1$），理论上需要 $\log_x n$ 位，每一位需要 $\{0,1,2,\cdots,x-1\}$ 这 $x$ 种状态，一共需要 $x\log_x n=\ln n\cdot\frac{x}{\ln x}$ 种状态，而 $\frac{x}{\ln x}$ 在 $x=e$ 时取最小值，需要状态数最少，所以理论上 $e$ 进制效率最高。

但 $e$ 进制在工程上无法实现，众所周知 $\frac{2}{\ln 2}=\frac{4}{\ln 4}$，所以 $2$ 进制和 $4$ 进制效率相同，显然 $3$ 比 $4$ 更接近 $e$，所以 $3$ 进制实际效率最高。
