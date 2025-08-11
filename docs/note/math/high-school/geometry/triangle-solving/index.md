# 解三角形

## 参考资料

- [三角形 - 维基百科](https://zh.wikipedia.org/zh-cn/三角形)
- [【最全汇总】最全三角形面积公式！我赌你只会五个（doge） - bilibili](https://www.bilibili.com/video/BV1RTg5zgE1m)

## 约定

对于三角形 $\triangle ABC$，如果没有特别说明，则：

1. 边长 $a$、$b$、$c$ 分别为角 $\angle A$、$\angle B$、$\angle C$ 的对边。
2. $S$ 表示三角形的面积，$s=\frac{a+b+c}{2}$ 表示三角形的半周长。
3. $r$ 表示内切圆的半径，$R$ 表示外接圆的半径。

![](assets/Triangle_with_notations_2.svg)

## 三角形的心

### 内心

内心（Incenter）为三个内角的 **角平分线** 的交点，即 **内切圆** 的圆心。

![](assets/三角形の内心.png)

### 外心

外心（Circumcenter）为三条边的 **中垂线** 的交点，即 **外接圆** 的圆心。

![](assets/三角形の外心.png)

### 垂心

垂心（Orthocenter）为三条 **高线** 的交点。

![](assets/三角形の垂心.png)

### 重心

重心（Centroid）为三条 **中线** 的交点，又称为 **形心**。

![](assets/三角形の重心.png)

### 旁心

旁心（Excenter）为外角的 **角平分线** 的交点，有三个，分别为三角形某一边的 **旁切圆** 的圆心。

![](assets/三角形の傍心.png)

## 面积公式

### 基本公式（底 + 高）

$$
S=\frac{1}{2}ah_a=\frac{1}{2}bh_b=\frac{1}{2}ch_c
$$

### 两边 + 夹角

$$
S=\frac{1}{2}ab\cos{\angle C}=\frac{1}{2}ac\cos{\angle B}=\frac{1}{2}bc\cos{\angle A}
$$

### 三边

海伦公式：

$$
S=\sqrt{s(s-a)(s-b)(s-c)}
$$

秦九昭公式：

$$
S=\sqrt{\frac{1}{4}\left(a^2c^2-\left(\frac{a^2+c^2-b^2}{2}\right)^2\right)}
$$

### 内切圆 + 三边

$$
S=sr=\frac{1}{2}r(a+b+c)
$$

### 外接圆 + 边/角

$$
S=\frac{abc}{4R}=2R^2\sin{\angle A}\sin{\angle B}\sin{\angle C}=\frac{1}{2}R^2(\sin{\angle 2A}+\sin{\angle 2B}+\sin{\angle 2C})
$$

### 三角 + 一边

$$
S=\frac{a^2\sin{\angle B}\sin{\angle C}}{\sin{\angle A}}=\frac{b^2\sin{\angle A}\sin{\angle C}}{\sin{\angle B}}=\frac{c^2\sin{\angle A}\sin{\angle B}}{\sin{\angle C}}
$$

### 三边 + 一角

$$
S=\frac{1}{4}(a^2+b^2-c^2)\tan{\angle C}=\frac{1}{4}(a^2+c^2-b^2)\tan{\angle B}=\frac{1}{4}(b^2+c^2-a^2)\tan{\angle A}
$$

$$
S=s(s-a)\tan{\frac{\angle A}{2}}=s(s-b)\tan{\frac{\angle B}{2}}=s(s-c)\tan{\frac{\angle C}{2}}
$$

### 两边 + 两角

$$
S=\frac{1}{4}a^2\sin{2\angle B}+\frac{1}{4}b^2\sin{2\angle A}=\frac{1}{4}a^2\sin{2\angle C}+\frac{1}{4}c^2\sin{2\angle A}=\frac{1}{4}b^2\sin{2\angle C}+\frac{1}{4}c^2\sin{2\angle B}
$$

### 向量

$$
S=\frac{1}{2}\left|\overrightarrow{AB}\times\overrightarrow{AC}\right|=\frac{1}{2}\left|\overrightarrow{BA}\times\overrightarrow{BC}\right|=\frac{1}{2}\left|\overrightarrow{CA}\times\overrightarrow{CB}\right|
$$

### 等边三角形

$$
S=\frac{\sqrt 3}{4}a^2
$$
