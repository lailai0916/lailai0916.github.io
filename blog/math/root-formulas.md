---
title: '求根公式（咕）'
date: 2023-11-27T12:00
authors: lailai
tags: [math]
---

<!-- truncate -->

## 参考资料

- [多项式 - 维基百科](https://zh.wikipedia.org/zh-cn/多項式)
- [500 years of NOT teaching THE CUBIC FORMULA. What is it they think you can't handle? - YouTube](https://www.youtube.com/watch?v=N-KXStupwsc)

## 引入

在中学阶段，我们就学习了二次方程的求根公式，但至此以后就再也没有讲过高次方程的求根公式。

而 [伽罗瓦理论](https://zh.wikipedia.org/zh-cn/伽羅瓦理論) 指出，对于一般五次以及五次以上的方程，不存在一般的代数解，即五次方程没有求根公式。

那么，三次方程和四次方程的求根公式是什么呢？又是如何推导出来的？

:::tip

本文讨论的所有方程都是一元多项式方程，即只有一个未知数。

“多项式”这个术语在我看来有些歧义。教科书中单项式与多项式统称为“整式”，多项式至少要有两项。

但很多时候我们讨论多项式并不会刻意把只有一项的情形排除在外，换言之整式这个术语经常会被多项式给夺舍。

:::

## 前置知识

### 代数基本定理

:::info[[代数基本定理](https://zh.wikipedia.org/zh-cn/代数基本定理)]

任何一个复系数多项式方程至少有一个复数根。（注意：实数也属于复数）

:::

设 $f(x)$ 是 $n$ 次复系数多项式，根据代数基本定理，它至少有一个根 $x_1$。

因此根据 [因式定理](https://zh.wikipedia.org/zh-cn/因式定理)，$f(x)$ 可表示为：

$$
f(x)=(x-x_1)g(x)
$$

其中，$g(x)$ 是一个 $n-1$ 次复系数多项式。

反复使用这一拆分过程，最终可以将 $f(x)$ 完全因式分解为 $n$ 个一次多项式的乘积。

所以，该定理还有另外两种等价描述：

1. 任何一个 $n$ 次复系数多项式，都正好有 $n$ 个复数根（重根视为多个根）。
2. 任何一个 $n$ 次复系数多项式，都可以因式分解为 $n$ 个复系数一次多项式的乘积。

### 韦达定理

设多项式 $f(x)$ 的 $n-r$ 次项系数为 $a_{n-r}$，即：

$$
f(x)=a_nx^n+a_{n-1}x^{n-1}+\dots+a_1x+a_0= \sum_{r=0}^n x^{n-r}a_{n-r}
$$

对于第二种等价描述，设 $f(x)$ 的 $n$ 个根分别为 $x_1,x_2,\dots,x_n$，则：

$$
f(x)=a_n(x-x_1)(x-x_2)\dots(x-x_n)=0
$$

代入任意根 $x_i$，均有 $f(x_i)=0$，方程显然成立。

通过这个定理可以轻松推导出 [韦达定理](https://zh.wikipedia.org/zh-cn/韦达定理)。

将因式分解式展开：

$$
\begin{aligned}
  f(x) &= a_n(x-x_1)(x-x_2)\dots(x-x_n) \\
  &= x^n \cdot a_n \\
  &+ x^{n-1} \cdot a_n (-x_1-x_2-\dots-x_n) \\
  &+ x^{n-2} \cdot a_n (x_1x_2+x_1x_3+\dots+x_1x_n+x_2x_3+\dots+x_{n-1}x_n) \\
  &+ \dots \\
  &+ x^{n-r} \cdot a_n \left[\sum_{1\le i_1\le i_2\le \dots \le i_{r-1} \le i_r \le n}(-x_{i_1})(-x_{i_2})\dots(-x_{i_{r-1}})(-x_{i_r})\right] \\
  &+ \dots \\
  &+ a_n(-1)^n(x_1x_2\dots x_n) \\
  &= \sum_{r=0}^n x^{n-r}a_n(-1)^r\left(\sum x_{i_1}x_{i_2}\dots x_{i_{r-1}}x_{i_r}\right)
\end{aligned}
$$

因为多项式每一项系数相等，整理得：

$$
a_{n-r}=a_n(-1)^r\left(\sum x_{i_1}x_{i_2}\dots x_{i_{r-1}}x_{i_r}\right)
$$

最终结论：

$$
\sum x_{i_1}x_{i_2}\dots x_{i_{r-1}}x_{i_r}=(-1)^r\frac{a_{n-r}}{a_n}
$$

这就是系数与根的对称关系，也就是韦达定理的内容。

## 一次方程

### 一般形式

$$
ax+b=0\left(a \ne 0 \right)
$$

### 推导过程

#### 最高项归一

方程两边同时除以 $a$，使最高次项系数化为 $1$：

$$
x+\frac{b}{a}=0\left(a \ne 0 \right)
$$

#### 整理

移项：

$$
x=-\frac{b}{a}
$$

### 求根公式

$$
x=-\frac{b}{a}
$$

## 二次方程

### 一般形式

$$
ax^2+bx+c=0\left(a \ne 0 \right)
$$

### 推导过程

#### 最高项归一

方程两边同时除以 $a$，使最高次项系数化为 $1$：

$$
x^2+\frac{b}{a}x+\frac{c}{a}=0
$$

#### 思路

对于一般的二次方程，如果注意力涣散，很难瞪出求根公式。

但如果没有一次项：

$$
x^2+t=0
$$

解方程就变得非常容易：

$$
x=\pm\sqrt{-t}
$$

所以我们可以通过换元法消除一次项。

#### 次高项归零

令：

$$
x\gets x-\frac{b}{2a}
$$

代入：

$$
\left(x-\frac{b}{2a}\right)^2+\frac{b}{a}\left(x-\frac{b}{2a}\right)+\frac{c}{a}=0
$$

展开：

$$
\left(x^2-\frac{bx}{a}+\frac{b^2}{4a^2}\right)+\left(\frac{b x}{a}-\frac{b^2}{2 a^2}\right)+\frac{c}{a}=0
$$

化简：

$$
x^2+\frac{c}{a}-\frac{b^2}{4a^2}=0
$$

$$
x=\pm\sqrt{\frac{b^2-4ac}{4a^2}}
$$

还原：

$$
x=\pm\frac{\sqrt{b^2-4ac}}{2a}-\frac{b}{2a}
$$

#### 配方法

以上推导方法为 **换元法**，还可以使用 **配方法** 推导。

<details>
<summary>配方法</summary>

移项：

$$
x^2+\frac{b}{a}x=-\frac{c}{a}
$$

通过配方法，使方程左边变为一个式子的平方。

方程两边同时加上 $\left(\frac{b}{2a}\right)^2$：

$$
x^2+\frac{b}{a}x+\left(\frac{b}{2a}\right)^2=-\frac{c}{a}+\left(\frac{b}{2a}\right)^2
$$

化简：

$$
\left(x+\frac{b}{2a}\right)^2=\frac{b^2-4ac}{4a^2}
$$

将平方转化为开根：

$$
x+\frac{b}{2a}=\pm\sqrt{\frac{b^2-4ac}{4a^2}}
$$

移项：

$$
x=\pm\frac{\sqrt{b^2-4ac}}{2a}-\frac{b}{2a}
$$

</details>

#### 整理

解得：

$$
x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}
$$

$$
x_1=\frac{-b+\sqrt{b^2-4ac}}{2a},x_2=\frac{-b-\sqrt{b^2-4ac}}{2a}
$$

### 求根公式

$$
x_1=\frac{-b+\sqrt{b^2-4ac}}{2a},x_2=\frac{-b-\sqrt{b^2-4ac}}{2a}
$$

### 分类讨论

令判别式：

$$
\Delta=b^2-4ac
$$

若 $\Delta>0$，有两个不等实数根：

$$
x_1=\frac{-b+\sqrt{\Delta}}{2a},x_2=\frac{-b-\sqrt{\Delta}}{2a}
$$

若 $\Delta=0$，有两个相等实数根：

$$
x_1=x_2=-\frac{b}{2a}
$$

若 $\Delta<0$，有两个共轭复数根：

$$
x_1=-\frac{b}{2a}+\frac{\sqrt{-\Delta}}{2a}i,x_2=-\frac{b}{2a}-\frac{\sqrt{-\Delta}}{2a}i
$$

:::warning

根的判别式不适用于非实系数的二次方程。

:::

## 三次方程

### 一般形式

$$
ax^3+bx^2+cx+d=0\left(a \ne 0 \right)
$$

### 推导过程

#### 最高项归一

方程两边同时除以 $a$，使最高次项系数化为 $1$：

$$
x^3+\frac{b}{a}x^2+\frac{c}{a}x+\frac{d}{a}=0
$$

#### 思路

二次方程求根公式推导的核心，在于如何通过配方把平方转化为开根。

但三次方程无法直接配方，要先用换元法消除二次项。

#### 次高项归零

令：

$$
x\gets x-\frac{b}{3a}
$$

<details>
<summary>为什么是 $-\frac{b}{3a}$？</summary>

设三次函数：

$$
f(x)=ax^3+bx^2+cx+d
$$

<Tabs>
<TabItem value="求导法">

求导，得到一个二次函数：

$$
f'(x)=3ax^2+2bx+c
$$

对于任意二次函数都是轴对称的，对称轴为：

$$
x=-\frac{b}{3a}
$$

所以任意三次函数都是中心对称的，对称中心为：

$$
\left(-\frac{b}{3a},f\left(-\frac{b}{3a}\right)\right)
$$

为了消除二次项，即 $-\frac{b}{3a}=0$，我们可以将函数平移 $-\frac{b}{3a}$，即：

$$
x\gets x-\frac{b}{3a}
$$

</TabItem>
<TabItem value="待定系数法">

设：

$$
x\gets x+t
$$

代入方程：

$$
\left(x+t\right)^3+\frac{b}{a}\left(x+t\right)^2+\frac{c}{a}\left(x+t\right)+\frac{d}{a}=0
$$

展开：

$$
\left(x^3+3tx^2+3t^2x+t^3\right)+
\left(\frac{bx^2}{a}+\frac{2btx}{a}+\frac{bt^2}{a}\right)+
\left(\frac{cx}{a}+\frac{ct}{a}\right)+
\frac{d}{a}=0
$$

化简：

$$
x^3+\left(3t+\frac{b}{a}\right)x^2+\left(3t^2+\frac{2bt}{a}+\frac{c}{a}\right)x+\left(t^3+\frac{bt^2}{a}+\frac{ct}{a}+\frac{d}{a}\right)
$$

要让二次项系数 $3t+\frac{b}{a}=0$，所以：

$$
t=-\frac{b}{3a}
$$

</TabItem>
</Tabs>

</details>

代入：

$$
\left(x-\frac{b}{3a}\right)^3+\frac{b}{a}\left(x-\frac{b}{3a}\right)^2+\frac{c}{a}\left(x-\frac{b}{3a}\right)+\frac{d}{a}=0
$$

展开：

$$
x^3+\left(\frac{c}{a}-\frac{b^2}{3a^2}\right)x+\left(\frac{2b^3}{27a^3}-\frac{bc}{3a^2}+\frac{d}{a}\right)=0
$$

令：

$$
p=\frac{c}{a}-\frac{b^2}{3a^2},q=\frac{2b^3}{27a^3}-\frac{bc}{3a^2}+\frac{d}{a}
$$

此时方程的最高次项系数为 $1$，并消除了二次项：

$$
x^3+px+q=0
$$

令 $x=u+v$，代入：

$$
(u+v)^3+p(u+v)+q=0
$$

展开：

$$
u^3+v^3+3uv(u+v)+p(u+v)+q=0
$$

$$
u^3+v^3+(3uv+p)(u+v)+q=0
$$

为了让它成立，可以令：

$$
\begin{cases}
u^3+v^3=-q \\
3uv+p=0 \Rightarrow uv=-\frac{p}{3}
\end{cases}
$$

设 $U=u^3,V=v^3$，代入：

$$
\begin{cases}
U+V=-q \\
UV=(-\frac{p}{3})^3
\end{cases}
$$

所以 $U$ 和 $V$ 是如下二次方程的两个根：

$$
X^2+qX-\frac{p^3}{27}=0
$$

解得：

$$
U,V=X=\frac{-q\pm\sqrt{q^2+\frac{4p^3}{27}}}{2}=-\frac{q}{2}\pm\sqrt{\left(\frac{q}{2}\right)^2+\left(\frac{p}{3}\right)^3}
$$

令：

$$
U=-\frac{q}{2}+\sqrt{\left(\frac{q}{2}\right)^2+\left(\frac{p}{3}\right)^3}
$$

$$
V=-\frac{q}{2}-\sqrt{\left(\frac{q}{2}\right)^2+\left(\frac{p}{3}\right)^3}
$$

回代：

$$
u=\sqrt[3]{U}=\sqrt[3]{-\frac{q}{2}+\sqrt{\left(\frac{q}{2}\right)^2+\left(\frac{p}{3}\right)^3}}
$$

$$
v=\sqrt[3]{V}=\sqrt[3]{-\frac{q}{2}-\sqrt{\left(\frac{q}{2}\right)^2+\left(\frac{p}{3}\right)^3}}
$$

解得：

$$
x=u+v=\sqrt[3]{U}+\sqrt[3]{V}
$$

所以：

$$
x_1=u+v,x_2=\omega u+\omega^2 v,x_3=\omega^2 u+\omega v
$$

还原：

$$
x_1=u+v-\frac{b}{3a},x_2=\omega u+\omega^2 v-\frac{b}{3a},x_3=\omega^2 u+\omega v-\frac{b}{3a}
$$

:::tip

由于 $u^3,v^3$ 是共轭复数，引入单位根 $\omega = \frac{-1+\sqrt{3}i}{2}$ 可生成其余两个复根。

:::

### 求根公式

$$
p=\frac{c}{a}-\frac{b^2}{3a^2},q=\frac{2b^3}{27a^3}-\frac{bc}{3a^2}+\frac{d}{a}
$$

$$
u=\sqrt[3]{-\frac{q}{2}+\sqrt{\left(\frac{q}{2}\right)^2+\left(\frac{p}{3}\right)^3}},v=\sqrt[3]{-\frac{q}{2}-\sqrt{\left(\frac{q}{2}\right)^2+\left(\frac{p}{3}\right)^3}}
$$

$$
x_1=u+v-\frac{b}{3a},x_2=\omega u+\omega^2 v-\frac{b}{3a},x_3=\omega^2 u+\omega v-\frac{b}{3a}
$$

### 分类讨论

根据 [介值定理](https://zh.wikipedia.org/zh-cn/介值定理) 三次方程至少有一个实数根：

> 介值定理：假设 $f:[a,b]\to \mathbb{R}$ 为一连续函数。若一实数 $u$ 满足 $(f(a)-u)(f(b)-u)\le0$，则存在一实数 $c \in [a,b]$ 使得 $f(c)=u$。

令判别式：

$$
\Delta=18abcd-4b^3d+b^2c^2-4ac^3-27a^2d^2
$$

若 $\Delta>0$，有三个不相等实数根。

若 $\Delta=0$，有实数重根（即至少两个实根相等）。

若 $\Delta<0$，有一个实根和两个共轭复根。

## 四次方程

### 一般形式

$$
ax^4+bx^3+cx^2+dx+e=0\left(a \ne 0 \right)
$$

### 推导过程

#### 最高项归一

方程两边同时除以 $a$，使最高次项系数化为 $1$：

$$
x^4+\frac{b}{a}x^3+\frac{c}{a}x^2+\frac{d}{a}x+\frac{e}{a}=0
$$

#### 次高项归零

同二次、三次方程，令：

$$
x\gets x-\frac{b}{4a}
$$

代入：

$$
\left(x-\frac{b}{4a}\right)^4+\frac{b}{a}\left(x-\frac{b}{4a}\right)^3+\frac{c}{a}\left(x-\frac{b}{4a}\right)^2+\frac{d}{a}\left(x-\frac{b}{4a}\right)+\frac{e}{a}=0
$$

展开：

$$
x^4+\left(\frac{8ac-3b^2}{8a^2}\right)x^2+\left(\frac{b^3-4abc+8a^2d}{8a^3}\right)x+\frac{-3b^4+16ab^2c-64a^2bd+256a^3e}{256a^4}=0
$$

令：

$$
p=\frac{8ac-3b^2}{8a^2},q=\frac{b^3-4abc+8a^2d}{8a^3},r=\frac{-3b^4+16ab^2c-64a^2bd+256a^3e}{256a^4}
$$

此时方程的最高次项系数为 $1$，并消除了三次项：

$$
x^4+px^2+qx+r=0
$$

## 五次及以上方程

伽罗瓦理论指出，对于一般五次以及五次以上的方程，不存在一般的代数解。

大多数五次方程的根无法通过加、减、乘、除和开方来表示。
