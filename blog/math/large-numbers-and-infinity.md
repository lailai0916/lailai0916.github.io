---
title: 大数 & 无穷
date: 2025-07-20T10:00
tags: [math]
---

一些很大很大的数……以及从有限走向无穷。

{/* truncate */}

## 参考资料

- [大数 (数学) - 维基百科](<https://zh.wikipedia.org/wiki/大数_(数学)>)
- [How Big is Graham's Number? (feat Ron Graham) - Youtube](https://www.youtube.com/watch?v=GuigptwlVHo)
- [葛立恒数是什么？有多大？一个穷尽所有算力也无法计算出来的大数 - bilibili](https://www.bilibili.com/video/BV1Yt411z7dR)
- [比葛立恒数还大的TREE(3)究竟有多大？教你用超运算表示大数 - bilibili](https://www.bilibili.com/video/BV1Kt411z7fB)

## 简介

我们每天都在使用数，平时用「天文数字」形容极大的数，并用科学计数法表示。但再往后还有很多更大的数，而「大数」顾名思义就是指远超出了日常生活使用范围的数。

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

五级运算（超-5 运算）其实也有特殊记号，但并不常用：

$$
a[5]b=H_5(a,b)={}_b a=\underbrace{{}^{{}^{{}^{{}^{{}^a\cdot}\cdot}\cdot}a}a}_b
$$

再往后就要用 $a[n]b$ 或 $H_n(a,b)$ 表示，并根据递推公式计算。

## 大数记号

### 高德纳箭号表示法

- [高德纳箭号表示法 - 维基百科](https://zh.wikipedia.org/wiki/高德納箭號表示法)

高德纳箭号表示法（Knuth's Up-arrow Notation）是一种大数的表示方法，其定义为：

$$
a\uparrow^n b=a[n+2]b=H_{n+2}(a,b)
$$

例如：

$$
a\uparrow b=a^b
$$

$$
a\uparrow\uparrow b=\underbrace{a^{a^{\cdot^{\cdot^{\cdot^a}}}}}_b
$$

约定高德纳箭号符合右结合律，可以得到递推关系：

$$
a\uparrow^n b=a\underbrace{\uparrow\uparrow\dots\uparrow}_n b=\underbrace{a\uparrow^{n-1}a\uparrow^{n-1}\dots\uparrow^{n-1}a}_b
$$

例如：

$$
3\uparrow 3=3^3=27
$$

$$
3\uparrow\uparrow 3=3\uparrow 3\uparrow 3=3\uparrow 27=3^{3^3}=3^{27}\approx 7.63\times 10^{12}
$$

$$
3\uparrow\uparrow\uparrow 3=3\uparrow\uparrow 3\uparrow\uparrow 3=3\uparrow\uparrow 3^{27}=\underbrace{3^{3^{\cdot^{\cdot^{\cdot^3}}}}}_{3^{27}}
$$

$$
3\uparrow\uparrow\uparrow\uparrow 3=3\uparrow\uparrow\uparrow 3\uparrow\uparrow\uparrow 3=3\uparrow\uparrow\uparrow\underbrace{3^{3^{\cdot^{\cdot^{\cdot^3}}}}}_{3^{27}}=\left.\left.\underbrace{3^{3^{\cdot^{\cdot^{\cdot^3}}}}}_{\underbrace{3^{3^{\cdot^{\cdot^{\cdot^3}}}}}_{\underbrace{\vdots}_3}}\right\}\underbrace{3^{3^{\cdot^{\cdot^{\cdot^3}}}}}_{\underbrace{3^{3^{\cdot^{\cdot^{\cdot^3}}}}}_{\underbrace{\vdots}_3}}\right\}3
$$

### 康威链式箭号表示法

- [康威链式箭号表示法 - 维基百科](https://zh.wikipedia.org/wiki/康威鏈式箭號表示法)

康威链式箭号表示法（Conway Chained Arrow Notation）是由约翰 · 何顿 · 康威（John Horton Conway）发明的一种大数的表示方法。

其形式是一串用箭头（$\to$）连接的数，定义如下：

1. $a$ 表示正整数 $a$；
2. $a\to b$ 表示 $a^b$；
3. $a\to b\to 1$ 等价于 $a\to b$；
4. $a\to b\to(c+1)$ 等价于 $\underbrace{a\to(a\to(\dots(a\to(a)\to c)\dots)\to c)\to c}_b$。

三项链的康威链式箭号表示法和其他记号的关系：

$$
a\to b\to c=H_{c+2}(a,b)=a\uparrow^c b
$$

### 阿克曼函数

- [阿克曼函数 - 维基百科](https://zh.wikipedia.org/wiki/阿克曼函數)

阿克曼函数（Ackermann Function）是由威廉 · 阿克曼（Wilhelm Ackermann）提出的一个非原始递归函数。

$$
A(m,n)=
\begin{cases}
  n+1 & m=0 \\
  A(m-1,1) & m>0\land n=0 \\
  A(m-1,A(m,n-1)) & m>0\land n>0
\end{cases}
$$

对于接触过算法竞赛的读者，应该并不陌生。

```cpp
int A(int m,int n)
{
	if(m==0)return n+1;
	if(n==0)return A(m-1,1);
	return A(m-1,A(m,n-1));
}
```

阿克曼函数和其他记号的关系：

$$
A(m,n)=H_{m}(2,n+3)-3=2\uparrow^{m-2}(n+3)-3
$$

我们通常用一元函数 $A(n)$ 代替 $A(n,n)$，还可以通过嵌套函数快速提高增长速度：

$$
A^3(n)=A(A(A(n)))
$$

## 常见大数

### 葛立恒数

- [葛立恒数 - 维基百科](https://zh.wikipedia.org/wiki/葛立恆數)

葛立恒数曾是以下问题中 $n$ 极其宽松的上界，但现在已经压缩到 $2\uparrow\uparrow\uparrow 5$ 了。

> 考虑一个 $n$ 维超立方体，在连接所有顶点后，将形成一个 $2^n$ 个顶点的完全图。将每条边红蓝染色，求最小的 $n$ 使得所有染色方案中，都必定存在一个四点共面且六边同色的单色完全子图。

其定义为：

$$
g_1=3\uparrow\uparrow\uparrow\uparrow 3
$$

$$
g_n=3\uparrow^{g_{n-1}}3
$$

$$
G=g_{64}=
\left.\begin{matrix}
  3\underbrace{\uparrow\uparrow\dots\uparrow}3 \\
  3\underbrace{\uparrow\uparrow\dots\uparrow}3 \\
  \vdots \\
  3\underbrace{\uparrow\uparrow\dots\uparrow}3 \\
  3\uparrow\uparrow\uparrow\uparrow 3
\end{matrix}\right\}64
$$

葛立恒数的大致范围：

$$
G\approx A^{64}(4)
$$

$$
3\to 3\to 64\to 2<G<3\to 3\to 65\to 2
$$

### TREE 函数

- [克鲁斯卡尔树定理 - 维基百科](https://zh.wikipedia.org/zh-hans/克魯斯卡爾樹定理)

TREE 函数（TREE Function）是由克鲁斯卡尔树定理引出的数列，定义为满足以下条件的最大序列长度：

> 用编号 $\set{1,\dots,n}$ 染色的有根树，第 $i$ 棵树最多有 $i$ 个节点，并且使得没有任何较早的树能同胚嵌入到第 $i$ 棵树中。

其中 $\operatorname{TREE}(1)=1,\operatorname{TREE}(2)=3$。这个函数一定是有限的，但从 $\operatorname{TREE}(3)$ 开始就变得极其巨大。

$\operatorname{TREE}(3)$ 的大致范围：

$$
\operatorname{TREE}(3)>A^{A(187196)}(1)
$$

## 无穷

推荐阅读乔治 · 伽莫夫的《从一到无穷大》，也可以观看李永乐老师的讲解课程 [从一到无穷大](https://www.bilibili.com/cheese/play/ss115)。
