:::info[[洛谷 P1939 矩阵加速（数列）](https://www.luogu.com.cn/problem/P1939)]

已知一个数列 $a$，它满足：

$$
a_x=
\begin{cases}
 1 & x \in\set{1,2,3} \\
 a_{x-1}+a_{x-3} & x \geq 4
\end{cases}
$$

求 $a$ 数列的第 $n$ 项对 $10^9+7$ 取余的值。

:::
