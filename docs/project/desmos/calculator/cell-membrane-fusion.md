# 细胞膜融合

一个神奇的细胞膜融合效果。

## 参考资料

- [用desmos模拟细胞的分裂与融合 - bilibili](https://www.bilibili.com/video/BV1kr42187eE)

## 项目链接

- [细胞膜融合 | Desmos](https://www.desmos.com/calculator/8e0f85822a)

## 原理

计算到三点的距离乘积为定值的点集：

$$
\sqrt{(x-x_1)^2+(y-y_1)^2}\cdot\sqrt{(x-x_2)^2+(y-y_2)^2}\cdot\sqrt{(x-x_3)^2+(y-y_3)^2}=r^3
$$

也可以推广到更多的点：

$$
\prod_{i=1}^{n}\sqrt{(x-x_i)^2+(y-y_i)^2}=r^n
$$

## 效果展示

<IframeWindow url="https://www.desmos.com/calculator/8e0f85822a?embed" />
