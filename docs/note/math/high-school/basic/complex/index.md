# 复数

## 参考资料

- [复数 (数学) - 维基百科](<https://zh.wikipedia.org/zh-cn/复数_(数学)>)
- [如何通俗的理解虚数和复数？虚数的几何意义又是啥？一次搞懂！ - bilibili](https://www.bilibili.com/video/BV1ns411J7Qs)

## 历史

在古希腊时期，[毕达哥拉斯学派](https://zh.wikipedia.org/zh-cn/毕达哥拉斯主义) 坚信“万物皆数”，认为一切量都可以用整数比表示。然而，当他们在研究边长为 $1$ 的正方形对角线时，却发现斜边长为 $\sqrt{2}$，它无法写成两个整数的比值，这就是“无理数”的出现。无理数的发现不仅动摇了“万物皆数”的信念，也标志着数学世界正在走向更广阔的领域。

$$
\text{有理数}\to\text{无理数}
$$

$$
\text{有理数}+\text{无理数}=\text{实数}
$$

类似的故事在代数学中再一次上演。当人们研究二次方程 $x^2+1=0$ 时，发现它在实数范围内无解，从而引出了虚数单位 $i=\sqrt{-1}$ 的概念。虽然起初这种“负数开方”显得荒诞，但在更复杂的三次方程（$ax^3+bx^2+cx+d=0$）中，它却成为必不可少的工具。

16 世纪的意大利数学家 [卡尔达诺](https://zh.wikipedia.org/zh-cn/吉罗拉莫·卡尔达诺) 在著作《大术》中给出了三次方程的一般解法。即便最终解是实数，中间步骤也必须经过 $\sqrt{-1}$ 的计算，从而引发了第三次数学危机（虚数危机）：要得到实数，必须先承认并使用虚数。这使得虚数和复数不再只是数学边缘的奇思，而逐渐成为代数理论中不可或缺的一部分。

$$
\text{实数}\to\text{虚数}
$$

$$
\text{实数}+\text{虚数}=\text{复数}
$$

从无理数的诞生到复数的出现，数学一次次突破原有的边界，也为后续的函数论、解析几何和现代物理奠定了坚实的基础。

## 引入

在初中阶段，根号下的数必须是非负数；若为负数，则被视为“无意义”，因为无法用实数表示其结果。

进入高中后，我们引入虚数单位 $i=\sqrt{-1}$，并在实数集 $\mathbb{R}$ 的基础上拓展出复数集 $\mathbb{C}$。

这个扩展是有意义的，因为复数体系是自洽的，即内部无矛盾，因此在数学中是允许且合理的。

:::tip

虚数单位 $i$ 源于单词 "imaginary"（想象的，假想的）。

:::

## 数集

数集在前面的 [集合](set#数集) 章节中提到过。

![](./assets/NumberSetinC.svg)

## 定义与表示

一个复数通常写作

$$
z=a+bi\quad(a,b\in\mathbb{R})
$$

其中 $a$ 称为 $z$ 的 **实部**，记作 $\operatorname{Re}(z)$；$b$ 称为 **虚部**，记作 $\operatorname{Im}(z)$；$i$ 为虚数单位，满足 $i^2=-1$。

特殊地：

- 当 $b=0$ 时，$z=a$ 为 **实数**；因此 $\mathbb{R}\subset\mathbb{C}$。
- 当 $a=0$ 且 $b\ne 0$ 时，$z=bi$ 为 **纯虚数**。

两个复数相等当且仅当实部相等且虚部相等：

$$
a+bi=c+di\iff a=c\ \text{且}\ b=d
$$

:::note[记号]

本文默认 $z=x+yi$，则 $\operatorname{Re}(z)=x,\ \operatorname{Im}(z)=y$。

:::

## 复平面与几何表示

把横轴视为实数轴，纵轴视为虚数轴，则每个复数 $z=x+yi$ 都对应复平面上的点 $(x,y)$，也可视作从原点出发的向量。于是：

- 模（长度）：$|z|=\sqrt{x^2+y^2}$
- 共轭（关于实轴对称）：$\overline{z}=x-yi$
- 辐角（极角）：$\arg z=\theta$，满足 $\cos\theta=\dfrac{x}{|z|},\ \sin\theta=\dfrac{y}{|z|}$

:::tip

主辐角常记作 $\operatorname{Arg} z\in(-\pi,\pi]$。一般辐角 $\arg z$ 则允许加上任意 $2k\pi$。

:::

## 基本运算（代数视角）

设 $z_1=a+bi,\ z_2=c+di$，则：

- 加法：$z_1+z_2=(a+c)+(b+d)i$（向量平移）
- 减法：$z_1-z_2=(a-c)+(b-d)i$
- 乘法：$z_1z_2=(ac-bd)+(ad+bc)i$（模相乘、角度相加，见下）
- 除法：$\dfrac{z_1}{z_2}=\dfrac{(a+bi)(c-di)}{c^2+d^2}=\dfrac{ac+bd}{c^2+d^2}+\dfrac{bc-ad}{c^2+d^2}i\ (z_2\ne 0)$

:::note[共轭与有理化]

分母含有复数时，乘以分母的共轭 $\overline{z}$，利用 $z\overline{z}=|z|^2$ 即可“有理化”。

:::

## 模与共轭的性质

对任意复数 $z,w$：

$$
\begin{aligned}
&|z|\ge 0,\ |z|=0\iff z=0,\ |\overline{z}|=|z|,\ \overline{\overline{z}}=z,\\
&z\overline{z}=|z|^2,\ |zw|=|z|\,|w|,\ \left|\dfrac{z}{w}\right|=\dfrac{|z|}{|w|}\ (w\ne 0),\\
&|z+w|\le|z|+|w|\quad(\text{三角不等式}),\\
&|z-w|\ge\big||z|-|w|\big|\quad(\text{反三角不等式}).
\end{aligned}
$$

## 极坐标（三角形式）与指数形式

若 $z\ne 0$，令 $r=|z|\ge 0,\ \theta=\arg z$，则

$$
z=r(\cos\theta+i\sin\theta).
$$

利用欧拉公式 $e^{i\theta}=\cos\theta+i\sin\theta$，可写作

$$
z=re^{i\theta}.
$$

此时乘除运算特别简单：

$$
\begin{aligned}
z_1z_2&=r_1r_2\,e^{i(\theta_1+\theta_2)}\\
\dfrac{z_1}{z_2}&=\dfrac{r_1}{r_2}\,e^{i(\theta_1-\theta_2)}\ (z_2\ne 0)
\end{aligned}
$$

## De Moivre 公式与 n 次方根

对任意整数 $n$：

$$
(\cos\theta+i\sin\theta)^n=\cos(n\theta)+i\sin(n\theta).
$$

设 $w\ne 0$，求 $z^n=w$。若记 $w=Re^{i\phi}$，则 $z_k=R^{1/n}\,e^{i(\phi+2k\pi)/n}\ (k=0,1,\dots,n-1)$。这些根均匀分布在以原点为圆心、半径 $R^{1/n}$ 的圆上。

:::note[单位根]

$x^n=1$ 的全部解为 $\zeta_k=e^{2k\pi i/n}$。它们构成正 $n$ 边形的顶点，且满足 $1+\zeta+\cdots+\zeta^{n-1}=0\ (\zeta\ne1)$。

:::

## 复数方程（高中常见）

1. 实系数二次方程 $ax^2+bx+c=0\ (a\ne 0)$：判别式 $\Delta=b^2-4ac$。当 $\Delta<0$，两根为共轭对 $\dfrac{-b\pm i\sqrt{4ac-b^2}}{2a}$。
2. 线性方程组可在复平面上解释为直线交点；二次曲线与圆的交点也可转为复数运算求解。

## 示例

:::note[示例 1：化简除法]

化简 $\dfrac{3-4i}{1+2i}$。

解：乘以分母共轭 $1-2i$，得

$$
\frac{(3-4i)(1-2i)}{(1+2i)(1-2i)}=\frac{3-6i-4i+8i^2}{1-4i^2}=\frac{3-10i-8}{1+4}=\frac{-5-10i}{5}=-1-2i.
$$

:::

:::note[示例 2：求模与辐角]

设 $z=1-\sqrt{3}i$，求 $|z|$ 与 $\operatorname{Arg} z$。

解：$|z|=\sqrt{1+3}=2$；在第四象限，$\cos\theta=\tfrac{1}{2},\ \sin\theta=-\tfrac{\sqrt{3}}{2}$，故 $\operatorname{Arg} z=-\tfrac{\pi}{3}$。

:::

:::note[示例 3：n 次方根]

求 $z^3=8(\cos\tfrac{\pi}{3}+i\sin\tfrac{\pi}{3})$ 的全部解。

解：$R=8,\ \phi=\tfrac{\pi}{3}$。则

$$
z_k=2\big(\cos\tfrac{\phi+2k\pi}{3}+i\sin\tfrac{\phi+2k\pi}{3}\big),\ k=0,1,2.
$$

:::

## 常见误区

- 把 $\sqrt{a}\,\sqrt{b}=\sqrt{ab}$ 直接用于负数。复数域下需要选择分支，一般高中阶段避免在含负数根式间随意合并。
- 忽视共轭：实系数多项式若有一非实根，则另一根必为其共轭。
- 误把 $|a+bi|=|a|+|b|$。实际应为 $|a+bi|=\sqrt{a^2+b^2}$。

## 小结

- 代数形式：$z=a+bi$；几何表示：点/向量；极形式：$re^{i\theta}$。
- 基本量：实部、虚部、模、辐角、共轭；性质：$z\overline{z}=|z|^2$、三角不等式。
- 运算规律：乘除在极形式下化加减；De Moivre 与 $n$ 次方根规则化、几何直观。

这些工具将贯穿后续的三角、解析几何与函数专题，并在竞赛中的多项式与变换题目里频繁出现。
