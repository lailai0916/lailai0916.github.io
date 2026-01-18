---
title: '洛谷 P1310 [NOIP 2011 普及组] 表达式的值'
link: 'https://www.luogu.com.cn/problem/P1310'
---

对于 $1$ 位二进制变量定义两种运算：

$$
\begin{array}{|c|c|} \hline
\qquad\qquad\quad\textsf{运算符}\qquad\qquad\quad & \qquad\qquad\quad\textsf{运算规则}\qquad\qquad\quad \\ \hline
\oplus &
\begin{aligned}
0 \oplus 0 &= 0 \\
0 \oplus 1 &= 1 \\
1 \oplus 0 &= 1 \\
1 \oplus 1 &= 1 \\
\end{aligned} \\ \hline
\times &
\begin{aligned}
0 \times 0 &= 0 \\
0 \times 1 &= 0 \\
1 \times 0 &= 0 \\
1 \times 1 &= 1 \\
\end{aligned} \\ \hline
\end{array}
$$

运算的优先级是：

1. 先计算括号内的，再计算括号外的。
2. “$\times$”运算优先于“$\oplus$”运算，即计算表达式时，先计算“$\times$”运算，再计算“$\oplus$”运算。例如：计算表达式 $A\oplus B \times C$ 时，先计算 $B \times C$，其结果再与 $A$ 做“$\oplus$”运算。

现给定一个未完成的表达式，例如 $\_+(\_ * \_)$，请你在横线处填入数字 $0$ 或者 $1$，请问有多少种填法可以使得表达式的值为 $0$。
