---
title: '数学：二重根式'
date: 2025-07-09T00:21
authors: [lailai]
tags: [math]
---

<!-- truncate -->

## 定义

二重根式（嵌套根式）的形式如下：

$$
\sqrt{a\pm\sqrt b}
$$

## 引入

在解数学题时，有时会遇到一些二重根式的结果。

<img src={require('./assets/de1e7a219492200560905ce9d47c614a.jpg').default} style={{maxWidth: '400px'}} />

例如，在一个 $15\degree$ 的直角三角形中，两条直角边 $AB$ 和 $AC$ 分别为 $2+\sqrt 3$ 和 $1$。

现在要计算斜边 $BC$ 的长度。根据勾股定理：

$$
BC=\sqrt{AB^2+AC^2}=\sqrt{(2+\sqrt 3)^2+1^2}=\sqrt{8+4\sqrt 3}
$$

但这并不是最简答案，还可以进一步化简。

## 推导

我们设最终结果为 $\sqrt x+\sqrt y$：

$$
\sqrt{8+4\sqrt{3}}=\sqrt{x}+\sqrt{y}
$$

则有：

$$
8+4\sqrt{3}=(\sqrt{x}+\sqrt{y})^2=x+y+2\sqrt{xy}
$$

我们可以令：

$$
x+y=8
$$

$$
2\sqrt{xy}=4\sqrt{3}
$$

注意到一组正整数解：

$$
x=2,y=6
$$

所以化简结果为：

$$
\sqrt{8+4\sqrt{3}}=\sqrt{2}+\sqrt{6}
$$

## 总结

对于一般的二重根式：

$$
\sqrt{a\pm\sqrt{b}}
$$

我们要找到一组正整数 $x$ 和 $y$，使得：

$$
x+y=a,xy=\frac{b}{4}
$$

就可以化简：

$$
\sqrt{a\pm\sqrt{b}}=\sqrt{x}\pm\sqrt{y}
$$

:::tip

注意并非所有的二重根式都能化简；能化简的结果也可能不止一个。

:::

:::note[示例]

化简 $\sqrt{4-\sqrt{15}}$。

$$
\begin{aligned}
  \sqrt{4-\sqrt{15}} &= \frac{\sqrt{8-2\sqrt{15}}}{\sqrt{2}} \\
  &= \left(\sqrt{5}-\sqrt{3}\right)\cdot\frac{\sqrt{2}}{2} \\
  &= \frac{\sqrt{10}-\sqrt 6}{2}
\end{aligned}
$$

:::
