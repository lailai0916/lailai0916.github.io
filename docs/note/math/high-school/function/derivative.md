# 导数

## 参考资料

- [导数 - 维基百科](https://zh.wikipedia.org/wiki/导数)

## 前置知识

### 增量

增量：在一段时间内，自变量取不同的值所对应的 **函数值之差**。

一个变量或函数的增量表示为 $\Delta$。

:::tip

例子：$x$ 的增量表示为 $\Delta x$；$f(x)$ 的增量表示为 $\Delta f(x)$。

:::

### 极限

当 $x$ 趋近于 $x_0$ 时，$f(x)$ 会无限趋近于一个 **确定** 的值，这个值就是函数 $f(x)$ 在 $x_0$ 处的极限。

1. 例1. 求极限 $\displaystyle\lim_{x \to +\infty}\frac{3x-1}{x+3}$。

|   $x$    |  $3x-1$  |  $x+3$   | $(3x-1)/(x+3)$  |
| :------: | :------: | :------: | :-------------: |
|   $1$    |   $2$    |   $4$    |      $0.5$      |
|   $10$   |   $29$   |   $13$   | $2.23076923077$ |
|  $100$   |  $299$   |  $103$   | $2.90291262136$ |
|  $1000$  |  $2999$  |  $1003$  | $2.99002991027$ |
| $10000$  | $29999$  | $10003$  | $2.99900029991$ |
| $100000$ | $299999$ | $100003$ |  $2.999900003$  |

不难发现，随着 $x$ 趋近于 $+\infty$，函数值逐渐趋近 $3$，所以 $\displaystyle\lim_{x \to +\infty}\frac{3x-1}{x+3}=3$。

2. 例2. 求极限 $\displaystyle\lim_{x \to 0}\frac{\sin x}{x}$。

|    $x$    |       $\sin x$        |   $\sin(x)/x$    |
| :-------: | :-------------------: | :--------------: |
|    $1$    |   $0.841470984808$    | $0.841470984808$ |
|   $0.1$   |   $0.0998334166468$   | $0.998334166468$ |
|  $0.01$   |  $0.00999983333417$   | $0.999983333417$ |
|  $0.001$  |  $0.000999999833333$  | $0.999999833333$ |
| $0.0001$  | $0.0000999999998333$  | $0.999999998333$ |
| $0.00001$ | $0.00000999999999983$ | $0.999999999983$ |

不难发现，随着 $x$ 趋近于 $0$，函数值逐渐趋近 $1$，所以 $\displaystyle\lim_{x \to 0}\frac{\sin x}{x}=1$。（[洛！](https://zh.wikipedia.org/wiki/洛必达法则)）

### 切线

《人教版高中选修二》：在曲线 $y=f(x)$ 上任取一点 $P(x,f(x))$，如果当点 $P(x,f(x))$ 沿着曲线 $y=f(x)$ 无限趋近于点 $P_0(x_0,f(x_0))$ 时，割线 $P_0P$ 无限趋近于一个确定的位置，这个确定位置的直线称为曲线 $y=f(x)$ 在点 $P_0$ 处的切线（tangent line）。

解释：切线是一条 **恰好碰到** 曲线上某一点的直线。

#### 直线方程

常见的直线方程有 **斜截式**、**两点式**、**点斜式**、**截距式**、**一般式** 等。

斜截式 $y=kx+b$ 即为一次函数。

:::tip

直线与一次函数的区别：所有的一次函数都是直线，但平行于 $y$ 轴的直线不是函数（例如直线 $x=C$，$C$ 为常数）。

:::

#### 斜率计算

在初中阶段我们学过一次函数 $y=kx+b$，其中 $k$ 就是直线的 **斜率**。

两点确定一条直线 $y=kx+b$，设两点分别为 $A(x_1,y_1)$ 和 $B(x_2,y_2)$。

:::tip

这里 $x_1,y_1,x_2,y_2$ 为已知的常量，要求的未知数是斜率 $k$。

:::

带入一次函数：$y_1=kx_1+b$，$y_2=kx_2+b$。

第二个减第一个：$y_2-y_1=k(x_2-x_1)$。

解得：$k=\frac{y_2-y_1}{x_2-x_1}=\frac{\Delta y}{\Delta x}$。

所以斜率 k 等于两点纵横坐标之差之比，即**纵横坐标增量之比**。

切线也是直线，所以切线等斜率 $k$ 也等于 $\frac{\Delta y}{\Delta x}$。

## Part.1 定义和意义

假设函数 $y=f(x)$ 在点 $x_0$ 处的邻域内有定义，当自变量 $x$ 在 $x_0$ 处取得增量 $\Delta x$，相对应的函数取得增量 $\Delta y$，如果 $\frac{\Delta y}{\Delta x}$ 在 $\Delta x \to 0$ 时的极限存在，那么称函数 $y=f(x)$ 在点 $x_0$ 处可导。

解释：导数就是函数在某点处的 **瞬时变化率**。

$f(x)$ 的导数一般写作 $f'(x)$ 或 $y'$，一个式子的的导数一般在最后加 $'$（撇号）.

:::tip

例子：$ax^2+bx+c$ 的导数写作 $(ax^2+bx+c)'$。

:::

### 1.1 速度

平均速度和瞬时速度：

平均速度：一段路程的变化（$\Delta s$）和时间的变化（$\Delta t$）之比，即 ${\color{Orange}{V=\frac{\Delta s}{\Delta t}}}$.

瞬时速度：瞬间路程的变化（$\Delta s$）和时间的变化（$\Delta t$）之比，此时 ${\color{Orange}{\Delta t \to 0}}$，即 ${\color{Orange}{V=\displaystyle\lim_{\Delta t \to 0}\frac{\Delta s}{\Delta t}}}$.

> Tips：这里不区分“速度”和“速率”、“路程”和“位移”的区别。

### 1.2 瞬时变化率

${\color{Orange}{\text{瞬时变化率}}}$ 和 ${\color{Orange}{\text{瞬时速度}}}$ 类似，即 ${\color{Orange}{f'(x)=\displaystyle\lim_{\Delta x \to 0}\frac{\Delta y}{\Delta x}}}$.

函数在 $x$ 处的函数值为 $f(x)$，增加 $\Delta x$ 后，函数值变成 $f(x+\Delta x)$，所以增量（$\Delta y$）就是 $f(x+\Delta x)-f(x)$.

所以 $f(x)$ 的导数 ${\color{Orange}{f'(x)=\displaystyle\lim_{\Delta x \to 0}\frac{\Delta y}{\Delta x}=\displaystyle\lim_{\Delta x \to 0}\frac{f(x+\Delta x)-f(x)}{\Delta x}}}$.

### 1.3 几何意义

$f'(x)=\displaystyle\lim_{\Delta x \to 0}\frac{\Delta y}{\Delta x}$

不难发现 $\frac{\Delta y}{\Delta x}$ 就是切线斜率 $k$ 的定义？所以导数又是 ${\color{Orange}{\text{函数在某点处切线的斜率}}}$.

## Part.2 举例

1. $f(x)=C$（$C$ 为常数），求 $f'(x)$.

- $f'(x)=\displaystyle\lim_{\Delta x \to 0}\frac{\Delta y}{\Delta x}=\displaystyle\lim_{\Delta x \to 0}\frac{f(x+\Delta x)-f(x)}{\Delta x}=\displaystyle\lim_{\Delta x \to 0}\frac{C-C}{\Delta x}=0$.

2. $f(x)=x$，求 $f'(x)$.

- $f'(x)=\displaystyle\lim_{\Delta x \to 0}\frac{\Delta y}{\Delta x}=\displaystyle\lim_{\Delta x \to 0}\frac{f(x+\Delta x)-f(x)}{\Delta x}=\displaystyle\lim_{\Delta x \to 0}\frac{(x+\Delta x)-x}{\Delta x}=\displaystyle\lim_{\Delta x \to 0}\frac{\Delta x}{\Delta x}=1$.

3. $f(x)=x^2$，求 $f'(x)$.

- $f'(x)=\displaystyle\lim_{\Delta x \to 0}\frac{\Delta y}{\Delta x}=\displaystyle\lim_{\Delta x \to 0}\frac{f(x+\Delta x)-f(x)}{\Delta x}=\displaystyle\lim_{\Delta x \to 0}\frac{(x+\Delta x)^2-x^2}{\Delta x}=\displaystyle\lim_{\Delta x \to 0}\frac{2x \Delta x+{\Delta x}^2}{\Delta x}=\displaystyle\lim_{\Delta x \to 0}2x+\Delta x=2x$.

> Tips：有限个无穷小量相加减结果是无穷小量，无穷小量乘或除以任意有限的量结果是无穷小量.

## Part.3 常见初等函数导数公式

### 3.1 常量函数

- $f(x)=C$（$C$ 为常数），$f'(x)=0$.

### 3.2 幂函数

- $f(x)=x^a$（$a \in \mathbb{R}, a \not = 1$），$f'(x)=ax^{a-1}$.

> Tips：$f(x)=\frac{1}{x}$，$f'(x)=(x^{-1})'=-x^{-2}=-\frac{1}{x^2}$.

> Tips：$f(x)=\sqrt{x}$，$f'(x)=(x^{0.5})'=0.5x^{-0.5}=\frac{1}{2\sqrt{x}}$.

### 3.3 指数函数

- $f(x)=a^x$（$a>0$），$f'(x)=a^{x}\ln{a}$.

> Tips：$f(x)=e^x$，$f'(x)=e^x\ln{e}=e^x$.

### 3.4 对数函数

- $f(x)=\log_a{x}$（$a>0$ 且 $a \not = 1$），$f'(x)=\frac{1}{x\ln{a}}$.

> Tips：$f(x)=\ln{x}$（$a>0$ 且 $a \not = 1$），$f'(x)=\log_e{x}=\frac{1}{x\ln{e}}=\frac{1}{x}$.

### 3.5 三角函数

- $f(x)=\sin{x}$，$f'(x)=\cos{x}$.

- $f(x)=\cos{x}$，$f'(x)=-\sin{x}$.

### 3.6 常用公式

- $C'=0$（$C$ 为常数）.

- $(x^a)'=ax^{a-1}$（$a \in \mathbb{R}, a \not = 1$）.

- $(a^x)'=a^{x}\ln{a}$（$a>0$）.

- $(\log_a{x})'=\frac{1}{x\ln{a}}$（$a>0$ 且 $a \not = 1$）.

- $(\sin{x})'=\cos{x}$.

- $(\cos{x})'=-\sin{x}$.

## Part.4 导数的运算

### 4.1 函数和差的导数

- $[f(x) \pm g(x)]'=f(x)' \pm g(x)'$.

### 4.2 函数积的导数

- $[f(x) \cdot g(x)]'=f(x)'g(x)+f(x)g(x)'$.

> Tips：$[k \cdot f(x)]'=k'f(x)+kf'(x)=kf'(x)$（$k$ 为常数）.

### 4.3 函数商的导数

- $[\frac{f(x)}{g(x)}]'=\frac{f(x)'g(x)-f(x)g(x)'}{[g(x)]^2}$（$g(x) \not = 0$）.

> Tips：$[\frac{1}{f(x)}]'=\frac{1'f(x)-f(x)'}{[f(x)]^2}=-\frac{f(x)'}{[f(x)]^2}$（$f(x) \not = 0$）.

### 4.4 链式法则（Chain rule）

假设有三个相互咬合的齿轮，分别对应转动角度为 $x$、$g(x)$ 和 $f(g(x))$。

$g'(x)$ 表示第二个齿轮相对于第一个齿轮的传动速度比，$f'(g(x))$ 表示第三个齿轮相对于第二个齿轮的传动速度比。

第一个齿轮的速度变化为 $\Delta x$，第三个齿轮的速度变化则是 $f'(g(x))g'(x)$，所以复合函数的导数是各部分导数的乘积。

$$
f'(g(x))=f'(g(x))g'(x)
$$

### 4.5 常用公式

- $[f(x) \pm g(x)]'=f(x)' \pm g(x)'$.

- $[f(x) \cdot g(x)]'=f(x)'g(x)+f(x)g(x)'$.

- $[\frac{f(x)}{g(x)}]'=\frac{f(x)'g(x)-f(x)g(x)'}{[g(x)]^2}$（$g(x) \not = 0$）.

## Part.5 高阶导数

原函数为零阶导数，零阶导数的导数为一阶导数；一阶导数的导数为二阶导数；二阶导数的导数为三阶导数……

一个函数 $f(x)$ 的 $n$ 阶导数就是对原函数求导 $n$ 次，一般写作 $f^{(n)}(x)$.

> Tips：$f^{(n)}(x)=[f^{(n-1)}(x)]'$.

咕.
