# 范德蒙德卷积

## 公式

$$
\sum_{i=0}^k\binom{n}{i}\binom{m}{k-i}=\binom{n+m}{k}
$$

## 证明

考虑用二项式定理证明：

$$
\begin{aligned}
\sum_{k=0}^{n+m}\binom{n+m}{k}x^k&=(x+1)^{n+m}\\
&=(x+1)^n(x+1)^m\\
&=\sum_{r=0}^n\binom{n}{r}x^r\sum_{s=0}^m\binom{m}{s}x^s\\
&=\sum_{k=0}^{n+m}\sum_{r=0}^k\binom{n}{r}\binom{m}{k-r}x^k\\
\end{aligned}
$$

即有：

$$
\binom{n+m}{k}=\sum_{r=0}^k\binom{n}{r}\binom{m}{k-r}
$$

## 意义

若考虑其组合意义证明：

在一个大小为 $n+m$ 的集合中取出 $k$ 个数，可以等于把大小为 $n+m$ 的集合拆成两个集合，大小分别为 $n$ 与 $m$，然后从 $n$ 中取出 $i$ 个数，从 $m$ 中取出 $k-i$ 个数的方案数。由于我们有了对于 $i$ 的枚举，于是只需要考虑一种拆法，因为不同的拆法之间是等价的。
