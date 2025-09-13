# 复数

## 参考资料

- [复数 (数学) - 维基百科](<https://zh.wikipedia.org/zh-cn/复数_(数学)>)
- [如何通俗的理解虚数和复数？虚数的几何意义又是啥？一次搞懂！ - bilibili](https://www.bilibili.com/video/BV1ns411J7Qs)
- [复数除法，哈密顿的解释 - bilibili](https://www.bilibili.com/video/BV11gHkzwEBL)

## 历史

:::tip

这一大段全是废话，可以简单了解一下。

:::

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

在初中阶段，只有非负数才有平方根；负数的平方根被视为“无意义”，因为无法用实数表示结果。

进入高中后，我们开始研究负数的平方根，并定义 $i=\sqrt{-1}$，因此 $i^2=-1$，称 $i$ 为 **虚数单位**。

:::tip

虚数单位 $i$ 源于单词 "imaginary"（想象的，假想的）。

:::

通过根号的性质和虚数单位 $i$，我们可以表示任何负数的平方根。

:::example

$$
\sqrt{-49}=\sqrt{49}\cdot\sqrt{-1}=7i
$$

:::

## 代数意义

### 定义

我们将由实数单位 $1$ 和虚数单位 $i$ 组成的数称为 **复数**，通常用 $z$ 等小写字母表示。所有复数可以表示为：

$$
z=a+bi(a,b\in\mathbb{R})
$$

其中 $a$ 称为 $z$ 的 **实部**，记作 $\operatorname{Re}z$；$b$ 称为 **虚部**，记作 $\operatorname{Im}z$；$i$ 称为 **虚数单位**，满足 $i^2=-1$。

特别地，当 $b=0$ 时，$z=a$ 为 **实数**；但 $b\ne 0$ 时，$z$ 为 **虚数**；当 $a=0$ 且 $b\ne 0$ 时，$z=bi$ 为 **纯虚数**。

两个复数 **相等** 当且仅当实部相等且虚部相等：

$$
a+bi=c+di\iff a=c\text{且}b=d
$$

本文默认 $z=a+bi$，则 $\operatorname{Re}(z)=a,\operatorname{Im}(z)=b$。

### 复数集

数集在前面的 [集合](set#数集) 章节中提到过，我们在实数集 $\mathbb{R}$ 的基础上扩展出 **复数集** $\mathbb{C}$。

$$
\mathbb{C}=\set{a+bi|a,b\in\mathbb{R}}
$$

$$
\mathbb{N}\subseteq\mathbb{Z}\subseteq\mathbb{Q}\subseteq\mathbb{R}\subseteq\mathbb{C}
$$

![](./assets/NumberSetinC.svg)

:::tip

这个扩展是允许且合理的，因为复数体系是自洽的，即内部无矛盾。

:::

## 几何意义

### 复平面

每个复数 $z=a+bi$ 都可以对应一个点 $Z(a,b)$，我们考虑把复数放到直角坐标系中。

而这个建立了直角坐标系来表示复数的平面称作 **复平面**，横轴（$x$ 轴）叫做 **实轴**，纵轴（$y$ 轴）叫做 **虚轴**。

<Desmos id="bnbjpvhvnw" />

### 模长

我们将 [向量](vector) $\overrightarrow{OZ}$ 的 **模长** 定义为复数 $z=a+bi$ 的 **模长**，记为：

$$
|OZ|=|z|=|a+bi|=\sqrt{a^2+b^2}
$$

两个复数不能直接比较大小，但可以比较它们的模长，即到原点 $O$ 的距离。

其实实数 $a$ 的 **模长** $|a|$ 就是它的 **绝对值**。

$$
|a|=|a+0i|=\sqrt{a^2}
$$

### 辐角

我们将向量 $\overrightarrow{OZ}$ 与 **实轴正方向** 的夹角定义为 **辐角**，记作 $\operatorname{arg}z$，取值范围通常为 $[0,2\pi)$。

这类似于任意角 [三角函数](../function/trigonometric-function) 的定义。

### 共轭

当两个复数的实部相等，虚部互为相反数时（关于实轴对称），这两个复数叫做互为 **共轭复数**，记作 $\overline{z}$：

$$
z=a+bi\iff\overline{z}=a-bi
$$

:::tip

轭（è）指套在牛脖子上、把两头牛拴在一起拉车的器具。

共轭就是“共用一副轭”，形容两头牛并驾齐驱，一起受约束。

引申到数学里，“共轭”就表示“成对出现、相互对应、紧密联系”的关系。

:::

## 运算

在运算中，可以先将虚数单位 $i$ 视为普通变量（类似 $x$ 或 $y$ 等），并按照常规的代数运算规则进行计算；当遇到 $i^2$ 时，再将其视为 $-1$。

我们设两个复数 $z_1=a+bi$ 和 $z_2=c+di$。

### 加法

在代数上，直接相加即可：

$$
z_1+z_2=(a+bi)+(c+di)=(a+c)+(b+d)i
$$

在几何上，复数在复平面中可以被视为 **点** 或 **向量**，因此复数运算的几何性质与向量相似，都遵循 **平行四边形法则**。

<Desmos id="kxrb2anqs4" />

### 减法

在代数上，直接相减即可：

$$
z_1-z_2=(a+bi)-(c+di)=(a-c)+(b-d)i
$$

在几何上，与加法类似，转化为相反复数后使用 **平行四边形法则**。

<Desmos id="bjsjs3stvr" />

### 乘法

在代数上，直接相乘即可：

$$
z_1z_2=(a+bi)(c+di)=ac+adi+bci+bdi^2=(ac-bd)+(ad+bc)i
$$

在几何上，复数乘法遵循 **模长相乘**、**辐角相加**。

$$
r_1(\cos\theta_{1}+i\sin\theta_{1})\cdot r_2(\cos\theta_{2}+i\sin\theta_{2})=r_1r_2[\cos(\theta_{1}+\theta_{2})+i\sin(\theta_{1}+\theta_{2})]
$$

<Desmos id="bplzxno9jh" />

### 除法

在代数上，除法直接计算得到：

$$
\frac{z_1}{z_2}=\frac{a+bi}{c+di}(z_2\ne 0)
$$

通过 **分母实数化** 可以进一步化简为：

$$
\frac{(a+bi)(c-di)}{(c+di)(c-di)}=\frac{(a+bi)(c-di)}{c^2+d^2}=\frac{ac+bd}{c^2+d^2}+\frac{bc-ad}{c^2+d^2}i
$$

在几何上，复数除法遵循 **模长相除**、**辐角相减**。

$$
\frac{r_1(\cos\theta_{1}+i\sin\theta_{1})}{r_2(\cos\theta_{2}+i\sin\theta_{2})}=\frac{r_1}{r_2}[\cos(\theta_{1}+\theta_{2})+i\sin(\theta_{1}+\theta_{2})]
$$

:::tip

分母含有复数时，乘以分母的共轭 $\overline{z}$ 即可实数化：

$$
z\overline{z}=|z|^2
$$

:::

### 幂运算

复数的幂运算和实数同理。

:::example

$$
z_1=1+3i,z_2=2-5i
$$

$$
z_1+z_2=(1+3i)+(2-5i)=(1+2)+(3-5)i=3-2i
$$

$$
z_1-z_2=(1+3i)-(2-5i)=(1-2)+(3+5)i=-1+8i
$$

$$
z_1z_2=(1+3i)(2-5i)=2-5i+6i-15i^2=17+i
$$

$$
\frac{z_1}{z_2}=\frac{1+3i}{2-5i}=\frac{(1+3i)(2+5i)}{(2-5i)(2+5i)}=-\frac{13}{29}+\frac{11}{29}i
$$

$$
{z_1}^3=(1+3i)^3=(-8+6i)(1+3i)=-26-18i
$$

$$
{z_2}^{-1}=\frac{1}{z_2}=\frac{1}{2-5i}=\frac{2+5i}{(2-5i)(2+5i)}=\frac{2}{29}+\frac{5}{29}i
$$

:::

## 三角表示

### 直角坐标系

在初中阶段，我们学习了 **直角坐标系**（笛卡儿坐标系），这是最常用的坐标系。

通过 $x$ 和 $y$ 坐标，可以表示平面上的每个点 $A$。

$$
A(x,y)
$$

<Desmos id="38olqi4zri" />

### 极坐标系

我们还可以用 **极径** $r$ 和 **极角** $\theta$ 描述这个点 $A$，这就是 **极坐标系**。

$$
A(r,\theta)
$$

<Desmos id="3iux0smkz8" />

### 变换

假设点 $A$ 的直角坐标为 $A(x,y)$，极坐标为 $A(r,\theta)$，考虑如何进行坐标转换。

从 **极坐标系** 转换到 **直角坐标系** 可以使用 [三角函数](../function/trigonometric-function)：

$$
x=r\cos\theta,y=r\sin\theta
$$

单位圆上辐角为 $\theta$ 的点 $B$ 的坐标为 $B(\cos\theta,\sin\theta)$，将其缩放 $r$ 倍就得到了 $A(r\cos\theta,r\sin\theta)$。

<Desmos id="phg9pjhx41" />

从 **直角坐标系** 转换到 **极坐标系** 时，**极径** $r$ 比较容易计算，根据 **距离公式**：

$$
r=\sqrt{x^2+y^2}
$$

但 **极角** $\theta$ 的计算相对比较复杂。

我们知道，极角的 **正切值** $\tan\theta$ 等于 **纵坐标** $y$ 除以 **横坐标** $x$。

$$
\tan\theta=\frac{y}{x}
$$

因此极角可以通过 **反三角函数** 来确定。

:::warning

$$
\xcancel{\theta=\arctan{\frac{y}{x}}}
$$

:::

但直接使用反三角函数会遇到很多问题，例如定义域与值域限制。

为了解决这些问题，数学家通常引入一个改进的分段函数 $\operatorname{atan2}$：

$$
\theta=\operatorname{atan2}(y,x)=
\begin{cases}
  \arctan\left(\frac{y}{x}\right) & x>0 \\
  \arctan\left(\frac{y}{x}\right)+\pi & x<0,y\geq 0 \\
  \arctan\left(\frac{y}{x}\right)-\pi & x<0,y<0 \\
  +\frac{\pi}{2} & x=0,y>0 \\
  -\frac{\pi}{2} & x=0,y<0 \\
  \text{undefine} & x=0,y=0
\end{cases}
$$

这个并不重要，简单了解一下即可。

### 复数

回到复数，我们知道每个复数 $z=a+bi$ 都可以对应直角坐标系中的点 $Z(a,b)$。

而复数还可以用 **模长** 和 **辐角** 表示，正好对应了极坐标系的 **极径** 和 **极角**。

因此，点 $Z(a,b)$ 的坐标也可以写作：

$$
Z(r\cos\theta,r\sin\theta)
$$

$$
a=r\cos\theta,b=r\sin\theta
$$

在复平面中，这个点对应的复数为：

$$
z=a+bi=r\cos\theta+ir\sin\theta=r(\cos\theta+i\sin\theta)
$$

其中 $r(\cos\theta+i\sin\theta)$ 称为复数 $z$ 的 **三角表示式**（三角形式），而 $a+bi$ 称为 **代数表示式**（代数形式）。

## 拓展

### 欧拉公式

进一步地，数学家 [莱昂哈德·欧拉](https://zh.wikipedia.org/zh-cn/萊昂哈德·歐拉) 发现：

$$
\cos\theta+i\sin\theta=e^{i\theta}
$$

因此，复数的极坐标形式可以进一步简化为：

$$
z=re^{i\theta}
$$

这就是著名的 [欧拉公式](https://zh.wikipedia.org/zh-cn/欧拉公式)。

- [用几何直觉理解欧拉公式！【中学生也能懂|manim】 - bilibili](https://www.bilibili.com/video/BV1bF411P7RL)
- [【官方双语】微分方程概论-第五章：在3.14分钟内理解e^iπ - bilibili](https://www.bilibili.com/video/BV1G4411D7kZ)
