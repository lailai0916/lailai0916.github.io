# 距离

## 参考资料

- [距离 - OI Wiki](https://oi-wiki.org/geometry/distance/)

## 度量

在数学（尤其是拓扑学、几何学）中，**度量** 是指一种满足以下四条性质的“距离函数”：

设集合 $X$ 上的函数 $d(x,y)$ 是一个度量，当且仅当对任意 $x,y,z\in X$：

1. 非负性（Non-negativity）：$d(x,y)\ge 0$；
2. 同一性（Identity of indiscernibles）：$d(x,y)=0\iff x=y$；
3. 对称性（Symmetry）：$d(x,y)=d(y,x)$；
4. 三角不等式（Triangle inequality）：$d(x,z)\le d(x,y)+d(y,z)$。

## 欧氏距离

**欧氏距离**（Euclidean distance）是数学中最常见的距离，可以用 **勾股定理** 推导。

$$
d(A,B)=\sqrt{(x_0-x_1)^2+(y_0-y_1)^2}
$$

## 曼哈顿距离

**曼哈顿距离**（Manhattan distance）是坐标差绝对值 **之和**。

美国纽约的 **曼哈顿区**（Manhattan）为典型的 **网格状** 街道布局，所以在曼哈顿行走时的最短距离称为 **曼哈顿距离**。

$$
d(A,B)=|x_0-x_1|+|y_0-y_1|
$$

## 切比雪夫距离

**切比雪夫距离**（Chebyshev distance）是坐标差绝对值的 **最大值**。

$$
d(A,B)=\max(|x_0-x_1|,|y_0-y_1|)
$$

## 距离转化

**曼哈顿坐标系** 是通过 **切比雪夫坐标系** 旋转 $45^\circ$ 后，再缩小到原来的一半得到的。

将一个点 $(x,y)$ 的坐标变为 $(x+y,x-y)$ 后，原坐标系中的 **曼哈顿距离** 等于新坐标系中的 **切比雪夫距离**。

将一个点 $(x,y)$ 的坐标变为 $(\frac{x+y}{2},\frac{x-y}{2})$ 后，原坐标系中的 **切比雪夫距离** 等于新坐标系中的 **曼哈顿距离**。

## 闵可夫斯基距离

我们定义 $n$ 维空间中两点 $X(x_1,x_2,\dots,x_n)$ 和 $Y(y_1,y_2,\dots,y_n)$ 之间的 **闵可夫斯基距离**（Minkowski distance）为：

$$
D(X,Y)=\left(\sum_{i=1}^n\left\vert x_i-y_i\right\vert^p\right)^{\frac{1}{p}}
$$

特别地：

1. 当 $p=1$ 时，$D(X,Y)=\sum_{i=1}^n\left\vert x_i-y_i\right\vert$ 即为 **曼哈顿距离**；
2. 当 $p=2$ 时，$D(X,Y)=\left(\sum_{i=1}^n(x_i-y_i)^2\right)^{1/2}$ 即为 **欧几里得距离**；
3. 当 $p\to\infty$ 时，$D(X,Y)=\lim_{p\to\infty}\left(\sum_{i=1}^n\left\vert x_i-y_i\right\vert ^p\right)^{1/p}=\max_{i=1}^n\left\vert x_i-y_i\right\vert$ 即为 **切比雪夫距离**。

:::tip

当 $p\ge 1$ 时，闵可夫斯基距离才是度量，具体证明详见 [Minkowski distance - Wikipedia](https://en.wikipedia.org/wiki/Minkowski_distance)。

:::
