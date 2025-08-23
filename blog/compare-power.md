---
title: '数学：比较 x^y 与 y^x'
date: 2025-08-23T15:17
authors: [lailai]
tags: [math]
---

<!-- truncate -->

## 引入

对于两个正实数 $x$ 和 $y$，如何比较 $x^y$ 和 $y^x$ 的大小关系？

$$
x^y\gtreqless y^x
$$

## 思考

首先对两边同时取自然对数并化简：

$$
\ln{x^y}\gtreqless \ln{y^x}\Rightarrow y\ln{x}\gtreqless x\ln{y}\Rightarrow \frac{\ln{x}}{x}\gtreqless \frac{\ln{y}}{y}
$$

构造函数：

$$
f(t)=\frac{\ln t}{t}
$$

原问题变成：

$$
f(x)\gtreqless f(y)
$$
