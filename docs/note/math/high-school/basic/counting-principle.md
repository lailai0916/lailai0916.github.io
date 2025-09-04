# 计数原理

## 参考资料

- [组合数学 - 维基百科](https://zh.wikipedia.org/zh-cn/组合数学)
- [【漫士】这是你学明白组合数学最好的机会 - bilibili](https://www.bilibili.com/video/BV1iT92YAEfs)

## 原理

### 加法原理

加法原理：完成一项任务有 $n$ 类方式，第 $i$ 类有 $a_i$ 种方案，则完成该任务的方案数为：

$$
\sum_{i=1}^n a_i=a_1+a_2+\dots+a_n
$$

:::example

从家到学校有 $2$ 类出行方式：

1. 乘地铁：可选择地铁 $1$ 号线或 $5$ 号线，共 $2$ 种；
2. 乘公交：可选择公交 $26$ 路、$38$ 路或 $45$ 路，共 $3$ 种。

根据加法原理，共有 $2+3=5$ 种不同的出行方案。

:::

### 乘法原理

乘法原理：完成一项任务有 $n$ 个步骤，第 $i$ 个步骤有 $a_i$ 种方案，则完成该任务的方案数为：

$$
\prod_{i=1}^n a_i=a_1\times a_2\times\dots\times a_n
$$

:::example

早上穿衣时：

1. 上衣有 $4$ 件；
2. 裤子有 $3$ 条。

根据乘法原理，共有 $4\times 3=12$ 种不同的搭配方案。

:::

## 排列组合

### 全排列

全排列：将 $n$ 个不同物品排成一列：

- 第 $1$ 个位置有 $n$ 种选择；
- 第 $2$ 个位置有 $n-1$ 种选择；
- 第 $3$ 个位置有 $n-2$ 种选择；
- ……
- 第 $n-1$ 个位置有 $2$ 种选择；
- 第 $n$ 个位置有 $1$ 种选择。

根据乘法原理，全排列的方案数为：

$$
n\times(n-1)\times(n-2)\times\dots\times 2\times 1
$$

我们将正整数 $1$ 到 $n$ 的连乘积称为 **阶乘**，用 $n$ 后面加感叹号（$!$）表示。

$$
n\times(n-1)\times(n-2)\times\dots\times 2\times 1=n!
$$

特别地，我们定义：

$$
0!=1
$$

对于正整数 $n$ 的阶乘，有：

$$
n!=n\times (n-1)!
$$

:::example

$$
0!=1,1!=1,2!=2,3!=6,4!=24,5!=120,6!=720\dots
$$

:::

### 排列

排列：从 $n$ 个不同物品中选取 $m$ 个排成一列：

- 第 $1$ 个位置有 $n$ 种选择；
- 第 $2$ 个位置有 $n-1$ 种选择；
- 第 $3$ 个位置有 $n-2$ 种选择；
- ……
- 第 $m-1$ 个位置有 $n-m+2$ 种选择；
- 第 $m$ 个位置有 $n-m+1$ 种选择。

根据乘法原理，排列的方案数为：

$$
n\times(n-1)\times(n-2)\times\dots\times(n-m+1)=\frac{n!}{(n-m)!}
$$

我们用 $\mathrm{A}_n^m$ 或 $\mathrm{P}_n^m$ 表示“从 $n$ 个物品中选取 $m$ 个进行排列的方法数”：

$$
\mathrm{A}_n^m=\mathrm{P}_n^m=\frac{n!}{(n-m)!}=n\times(n-1)\times(n-2)\times\dots\times(n-m+1)
$$

### 组合

组合：从 $n$ 个不同元素中选取 $m$ 个，不考虑顺序，产生不同组合的数量为：

$$
\mathrm{C}_n^m=\dbinom{n}{m}=\frac{\mathrm{A}_n^m}{m!}=\frac{n!}{m!(n-m)!}=\frac{n\times(n-1)\times\dots\times(n-m+1)}{m\times(m-1)\times\dots\times 2\times 1}
$$

性质：

1. $C_n^m=C_n^{n-m}$
2. $C_n^m=C_{n-1}^m+C_{n-1}^{m-1}$
3. $\displaystyle\frac{k}{n}C_n^k=C_{n-1}^{k-1}$
4. $\displaystyle\frac{n}{n-m}C_{n-1}^m=C_n^m$
5. $\displaystyle\sum_{i=0}^{n}C_n^i=C_n^0+C_n^1+C_n^2+\dots+C_n^n=2^n$
6. $C_n^0+C_n^2+C_n^4+\dots=C_n^1+C_n^3+C_n^5+\dots$

- 组合数的应用

1. 有 $n$ 个**完全相同**的元素，要求将其分为 $k$ 组，保证每组至少有一个元素，一共有多少种分法？

   考虑拿 $k-1$ 块板子插入到 $n$ 个元素两两形成的 $n-1$ 个空里面，答案为 $\red{C_{n-1}^{k-1}}$，本质是求 $x_1+x_2+\dots+x_k=n$ 的正整数解的组数。

2. 若问题变换一下，每组允许为空？

   考虑创造条件转化成有限制的问题一，先借 $k$ 个元素过来，在这 $n+k$ 个元素形成的 $n+k-1$ 个空里面插板，答案为 $\red{C_{n+k-1}^n}$，本质是求 $x_1+x_2+\dots+x_k=n$ 的非负整数解的组数。

3. 再扩展一步，要求对于第 $i$ 组，至少要分到 $a_i$ 个元素呢？（ $\sum a_i\leq n$ ）

   本质是求 $x_1+x_2+\dots+x_k=n$ 的整数解的数目。

   类比无限制的情况，我们借 $\sum a_i$ 个元素过来，保证第 $i$ 组能至少分到 $a_i$ 个，也就是令 $x_i'=x_i-a_i$ 且 $x_i'\geq 0$

   得到新方程

   $$(x_1'+a_1)+(x_2'+a_2)+\dots+(x_k'+a_k)=n\implies\sum_{i=1}^{k}x_i'=n-\sum a_i$$

   答案为 $\red{C_{n-\sum a_i+k-1}^{k-1}}$

4. 从 $n$ 个连续整数选 $k$ 个，这 $k$ 个数中两两都不相邻的组合有 $\red{C_{n-k+1}^k}$ 种。

5. 若将 $N$ 个**不同的**的元素分成 $a$ 组，第 $i$ 组的数量为 $n_i$，其中相同的组共有 $b$ 类，第 $k$ 类的相同组的个数为 $s_k$，则共有 $\displaystyle\red{\boxed{\frac{N!}{\displaystyle\prod_{i=1}^a(n_i!)\times\prod_{k=1}^b(s_k!)}}}$ 种方案。

原理：$\displaystyle C_{N}^{n_1}C_{N-n_1}^{n_2}\dots C_{n_a}^{n_a}=\frac{N!}{n_1!\times n_2!\times\dots\times n_a!}=\frac{N}{\displaystyle\prod_{i=1}^a(n_i!)}$ 用于消除组内排序。$\displaystyle\prod_{k=1}^b(s_k!)$ 用于消除组间排序。

例 $1$：将 $6$ 本不同的书分给甲乙丙 $3$ 人，每人 $2$ 本，有多少种分法？
这是不同的 $3$ 组，即没有相同的组，故不用消除组间排序。答案是 $\displaystyle\frac{6!}{2!2!2!}=90$.

如果是分成三组每组 $2$ 本，那就要消除组间排序。答案是 $\displaystyle\frac{6!}{(2!2!2!)\times 3!}=15$.

例 $2$：将 $14$ 个人分成人数分别为 $2,2,2,4,4$ 的无区别的五组，有多少种分法？

$$\frac{14!}{(2!2!2!4!4!)(3!2!)}=1576575$$

## 定理

### 二项式定理

$$(a+b)^n=\displaystyle\sum_{k=0}^{n}C_n^ka^kb^{n-k}\ \ \ \ \ \ \ (ax+by)^n=\displaystyle\sum_{k=0}^{n}C_n^ka^kb^{n-k}x^ky^{n-k}$$

例如：$(2x+3y)^3=8x^3+36x^2y+54xy^2+27y^3\\ \ \ \ \ \ \ \ \ \ \ \displaystyle\left(3x+\frac{5}{x^2}\right)^4=81x^4+540x+\frac{1350}{x^2}+\frac{1500}{x^5}+\frac{625}{x^8}$

### 三项式定理

$$(a+b+c)^n=\sum_{i+j+k=n}\frac{n!}{i!j!k!}a^ib^jc^k$$

例如：$\displaystyle \begin{aligned}(a+b+c)^3&=\frac{3!}{3!0!0!}a^3+\frac{3!}{0!3!0!}b^3+\frac{3!}{0!0!3!}c^3+\frac{3!}{2!1!0!}a^2b+\frac{3!}{2!0!1!}a^2c\\&+\frac{3!}{1!2!0!}ab^2+\frac{3!}{0!2!1!}b^2c+\frac{3!}{1!0!2!}ac^2+\frac{3!}{0!1!2!}bc^2+\frac{3!}{1!1!1!}abc\\&=a^3+b^3+c^3+3a^2b+3a^2c+3b^2a+3b^2c+3c^2a+3c^2b+6abc\end{aligned}$

例 1：求 $(x+2y-3z)^6$ 中 $xy^2z^3$ 项。答案为 $\displaystyle\frac{6!}{1!2!3!}x(2y)^2(-3z)^3=-6480xy^2z^3$

例 2：求 $\displaystyle \left(x+\frac{2}{x}-1\right)^4$ 的常数项。

$$\frac{4!}{0!0!4!}(-1)^4+\frac{4!}{1!1!2!}x\cdot\frac{2}{x}\cdot(-1)^2+\frac{4!}{2!2!0!}x^2\cdot\left(\frac{2}{x}\right)^2=1+24+24=49$$

若扩展成多项式的形式，有：

$$(x_1+x_2+\dots+x_t)^n=\displaystyle\sum_{\text{满足}\ n_1+n_2+\dots+n_t=n\ \text{的非负整数解}}\begin{pmatrix}n \\ n_1,n_2,\dots,n_t\end{pmatrix}x_1^{n_1}x_2^{n_2}\dots x_t^{n_t}$$

其中 $\begin{pmatrix}n \\ n_1,n_2,\dots,n_t\end{pmatrix}$ 是多项式系数，满足 $\displaystyle\sum \begin{pmatrix}n \\ n_1,n_2,\dots,n_t\end{pmatrix}=t^n$.

或者用三项式展开的形式也行。

### 范德蒙德卷积

$$\displaystyle\sum_{i=0}^k C_n^iC_m^{k-i}=C_n^0C_m^k+C_n^1C_m^{k-1}+\dots+C_n^kC_m^0=C_{n+m}^k$$

证明：比对 $(1+x)^n(1+x)^m=(1+x)^{n+m}$ 两边 $x^k$ 系数即可。

如果我们令 $n=m=k$，可以得到 $\displaystyle C_{2n}^n=\sum_{i=0}^k (C_n^i)^2$

- $\text{Lucas}$ 卢卡斯定理：（ $p$ 是质数，$1\leq m\leq n$ ）

$$C_n^m\equiv C_{n\ \text{mod}\ p}^{m\ \text{mod}\ p}\times C_{n/p}^{m/p}\ (\text{mod}\ p)$$

## 容斥原理

设 $S_1,S_2,\dots,S_n$ 为有限集合，$|S|$ 表示集合 $S$ 的大小，则：

$$|\displaystyle\bigcup_{i=1}^{n}S_i|=\displaystyle\sum_{i=1}^{n}|S_i|-\displaystyle\sum_{1\leq i<j\leq n}|S_i\bigcap S_j|+\displaystyle\sum_{1\leq i<j<k\leq n}|S_i\bigcap S_j\bigcap S_k|+\dots+(-1)^{n+1}|S_1\bigcap\dots\bigcap S_n|$$

1. 将 $2$ 个蓝球，$4$ 个黄球，$4$ 个绿球按任意次序从左到右排列，使得 $2$ 个蓝球不相邻且存在 $2$ 个相邻的绿球，则不同的排列有几种 ？（ 认为相同颜色的球都一样 ）

$A=\set{\text{蓝球相邻}},B=\set{\text{任意两个绿球不相邻}},S$ 为全集，则

$$|S|=\frac{10!}{4!4!2!}=3150\ \ \ \ |A|=\frac{9!}{4!4!1!}=630\ \ \ \ |B|=C_7^4C_6^2=525\ \ \ \ |A\cap B|=C_6^4C_5^1$$

$$ans=4(|S|-|A\cup B|)=4(|S|-|A|-|B|+|A\cap B|)=8280$$

2. $7$ 把钥匙 $7$ 把锁，随机开锁，则 $D_1,D_2,D_3$ 三把钥匙不能打开对应锁的概率是 ？

设 $D_i$ 打开对应锁的事件为 $X_i$，则 $$|X_i|=6!,|X_i\cap X_j|=5!,|X_i\cap X_j\cap X_k|=4!\ \ \ \ (i<j<k)$$

因此所求为 $\displaystyle\frac{7!-3\times 6!+3\times 5!-4!}{7!}=\frac{67}{105}$.

3. $6$ 对夫妻围着有 $12$ 个座位的圆桌入座，每人坐在不同座位上，$6$ 位女士已经优先入座且每相邻两位女士间恰有一个空座位，将她们顺时针记为 $A\sim F$。已知 $A,B,C,D$ 这 $4$ 位女士各自的丈夫都不坐在与自己妻子相邻的空座位上，则入座方式有多少种 ？

设 $U$ 为全集（ 任意坐 ），其中 $A$ 的丈夫坐在 $A$ 身边的、$6$ 位男士的坐法组成的集合为 $X_1$，类似定义 $X_2,X_3,X_4$，问题相当于求

$$\begin{aligned}|\overline{X_1}\cap\overline{X_2}\cap\overline{X_3}\cap\overline{X_4}|&=|U|-\sum_{i=1}^4 |X_i|+\sum_{1\leq i<j\leq 4}|X_i\cap X_j|\\&-\sum_{1\leq i<j<k\leq 4}|X_i\cap X_j\cap X_k|+|X_1\cap X_2\cap X_3\cap X_4|\\&=6!-C_8^1\times 5!+C_7^2\times 4!-C_6^3\times 3!+C_5^4\times 2!=154\end{aligned}$$

- 第 1 类 $\mathrm{Stirling}$ 数：$1$ ~ $n$ 的排列有 $m$ 个环：

$$S_1(n,m)=S_1(n-1,m-1)+S_1(n-1,m)\times(n-1)$$

- 第 2 类 $\mathrm{Stirling}$ 数：$n$ 个不同的球放入 $m$ 个相同盒子且盒子非空：

$$S_2(n,m)=S_2(n-1,m-1)+S_2(n-1,m)\times m=\sum_{i=0}^m\frac{(-1)^{m-i}i^n}{i!(m-i)!}$$

表示将新球单独放在一个盒子或者放入一个现有盒子。后面递推式的证明需要二项式反演。

- $\mathrm{Eulerian\ Number}$ 欧拉数（ 注意与 $\gamma$ 和 $e$ 等与欧拉相关的数学常数无关 ）：从 $1$ 到 $n$ 中正好满足 $m$ 个元素大于前一个元素条件的排列个数。

$$A(n,m)=\begin{cases}0&m>n\ \mathrm{or}\ n=0\\1&m=0\\(n-m)\cdot A(n-1,m-1)+(m+1)\cdot A(n-1,m)& \mathrm{otherwise}\end{cases}=\sum_{k=0}^m(-1)^{m-k}C_{n+1}^k(m-k)^n$$

- $\text{Catalan}$ 卡特兰数列：给定 $n$ 个 $0$ 和 $n$ 个 $1$，它们按照某种顺序排成长度为 $2n$ 的序列，满足任意前缀中 $0$ 的个数都不少于 $1$ 的个数的序列的数量为：

$$C_n=\frac{C_{2n}^n}{n+1}=\sum_{k=1}^n C_{k-1}\cdot C_{n-k}=\frac{4n-2}{n+1}C_{n-1}=C_{2n}^n-C_{2n}^{n-1}$$

|  $n$  | $1$ | $2$ | $3$ | $4$  | $5$  |  $6$  |  $7$  |  $8$   |  $9$   |  $10$   |
| :---: | :-: | :-: | :-: | :--: | :--: | :---: | :---: | :----: | :----: | :-----: |
| $C_n$ | $1$ | $2$ | $5$ | $14$ | $42$ | $132$ | $429$ | $1430$ | $4862$ | $16796$ |

以下问题都与 $\text{Catalan}$ 数有关：

1. $n$ 个左括号和 $n$ 个右括号组成的合法括号序列的数量为 $C_n$
2. $1,2,\dots,n$ 经过一个栈，形成的合法出栈序列的数量为 $C_n$
3. $n$ 个节点构成的不同二叉树的数量为 $C_n$，$n$ 个节点的 $m$ 叉树有 $\displaystyle\frac{1}{n}C_{nm}^{n-1}$
4. 在平面直角坐标系上，每一步只能向上或向右走，从 $(0,0)$ 走到 $(n,n)$ 并且两个端点外不接触直线 $y=x$ 的路线数量为 $2C_{n-1}$
5. 对于一个凸多边形的顶点数为 $n$，$C_{n-2}$ 代表所有可能的三角剖分的数量。（ 对角线不相交下分成若干个三角形 ）
6. 在圆上选择 $2n$ 个点，将这些点成对连接起来使得所得到的 $n$ 条线段不相交的方案数为 $C_n$
7. 由 $n$ 个 $+1$ 和 $n$ 个 $-1$ 组成的 $2n$ 个数 $a_1,a_2,\dots,a_{2n}$，其部分和满足 $\displaystyle\sum_{i=1}^k a_i\geq 0$，有 $C_n$ 个满足条件的数列。

- 错位排列：$1$ ~ $n$ 的排列，第 $i$ 个位置上均不为 $i$：

  用容斥原理推导：正整数 $1,2,\dots,n$ 的全排列有 $n!$ 种，其中第 $k$ 位是 $k$ 的排列有 $(n-1)!$ 种，由于所求的是错排的种数，所以应当减去这些排列；但是此时把同时有两个点放对位置的排列多排除了一次，应补上；在补上时，把同时有三个数不错排的排列多补上了一次，应排除；……；继续这一过程，得到错排的排列种数为

  $$D(n)=n!-\frac{n!}{1!}+\frac{n!}{2!}-\frac{n!}{3!}+\dots=\red{n!\sum_{k=2}^n\frac{(-1)^k}{k!}=\left\lfloor\frac{n!}{e}+\frac{1}{2}\right\rfloor}$$

  后面是简化公式，参考百度。随着元素数量的增加，形成错位排列的概率 $P=\displaystyle\lim_{n\to\infty}\frac{D(n)}{n!}=\frac{1}{e}$

  |  $n$   | $1$ | $2$ | $3$ | $4$ | $5$  |  $6$  |  $7$   |   $8$   |   $9$    |   $10$    |
  | :----: | :-: | :-: | :-: | :-: | :--: | :---: | :----: | :-----: | :------: | :-------: |
  | $D(n)$ | $0$ | $1$ | $2$ | $9$ | $44$ | $265$ | $1854$ | $14833$ | $133496$ | $1334961$ |

<!-- 第一步，把第 $n$ 个元素放在一个位置，例如位置 $k$，一共有 $n-1$ 种方案；

第二步，放编号为 $k$ 的元素，这时有两种情况：①把它放到位置 $n$，那么，对于剩下的 $n-1$ 个元素，由于第 $k$ 个元素放到了位置 $n$，剩下 $n-2$ 个元素就有 $D(n-2)$ 种方案；②第 $k$ 个元素不把它放到位置 $n$，这时，对于这 $n-1$ 个元素，有 $D(n-1)$ 种方案。

$$D(n)=(n-1)[D(n-1)+D(n-2)]$$

特别的，$D(1)=0,D(2)=1$，接下来推导 $D(n)$ 的通项，设 $D(k)=k!N(k),N(1)=0,N(2)=\frac{1}{2}$。

$$n!N(n)=(n-1)(n-1)!N(n-1)+(n-1)!N(n-2)\implies nN(n)=(n-1)N(n-1)+N(n-2)$$

$$N(n)-N(n-1)=\frac{-1}{n}[N(n-1)-N(n-2)]=\dots=\frac{(-1)^{n-2}}{\frac{n!}{2!}}[N(2)-N(1)]=\frac{(-1)^n}{n!}$$

$$N(n)=\sum_{k=2}^n\frac{(-1)^k}{k!}\implies D(n)=n!\sum_{k=2}^n\frac{(-1)^k}{k!}$$ -->

- 圆排列（ 循环排列 ）：$m$ 个数中选 $n$ 个不同的排列成一个环形。
  计算公式推导：先推 $n=m$ 时的公式。一个环打开成直线，有 $n!$ 种。合起来转一圈，有 $n$ 个是相同的，于是 $n$ 个元素的循环全排列种数为 $(n-1)!$。于是通项便为 $\displaystyle C_m^n(n-1)!=\red{\frac{1}{n}A_m^n}$

- 其他：从 $(0,0)$ 走到 $(m,n)$ 的非降路径数为 $C_{n+m}^m$
