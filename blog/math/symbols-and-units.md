---
title: '符号与单位'
date: 2025-04-17T21:38
authors: lailai
tags: [math]
---

数学、科学中的符号与单位思想。

<!-- truncate -->

## 符号

带符号的量在数学、科学，甚至生活中都很常见。

很多看似“只有大小”的量，其实也可以有正负之分，用来表示方向或性质。

例如角度、面积、长度、位移、海拔、温度、记账等。

带符号有一个明显的优势：可以直接代入公式，自动处理方向，简化计算与判断。

:::example

<Tabs>
<TabItem value="海拔">

一个人从海拔 $0$ 米出发，连续经过以下高度变化：

上升 $300$ 米；下降 $120$ 米；上升 $50$ 米；下降 $80$ 米；下降 $100$ 米；上升 $60$ 米。

如果不用正负号，每一步都要先判断方向，再决定加减，过程繁琐。

但如果用正负数来表示（上升为正，下降为负），变成：

$$
(+300)+(-120)+(+50)+(-80)+(-100)+(+60)=110
$$

这样，只需把这些数值直接相加，就能快速算出最终高度。

</TabItem>
<TabItem value="记账">

一个人从余额 $0$ 元开始，连续经过以下收支变化：

收入 $300$ 元；支出 $120$ 元；收入 $50$ 元；支出 $80$ 元；支出 $100$ 元；收入 $60$ 元。

如果不用正负号，每一步都要先判断性质，再决定加减，过程繁琐。

但如果用正负数来表示（收入为正，支出为负），变成：

$$
(+300)+(-120)+(+50)+(-80)+(-100)+(+60)=110
$$

这样，只需把这些数值直接相加，就能快速算出最终余额。

</TabItem>
<TabItem value="角度">

一个机器人从正前方（$0^\circ$）开始，连续经过以下旋转变化：

左转 $300^\circ$；右转 $120^\circ$；左转 $50^\circ$；右转 $80^\circ$；右转 $100^\circ$；左转 $60^\circ$。

如果不用正负号，每一步都要先判断方向，再决定加减，过程繁琐。

但如果用正负角度表示（左转为正，右转为负），变成：

$$
(+300)+(-120)+(+50)+(-80)+(-100)+(+60)=110
$$

这样，只需把这些角度直接相加，就能快速算出最终方向。

</TabItem>
</Tabs>

:::

## 单位

澳大利亚的陆地面积略多于 **十万公吨光年每毫米汞柱每年每三十秒**。

$$
\begin{aligned}
  S_{\text{Australia}} &= 7.692×10^6\mathrm{km^2} \\
  &> 10^5\times\mathrm{t}\cdot\mathrm{ly}/\mathrm{mmHg}/\mathrm{year}/30\mathrm{s} \\
  &= 10^5\times\frac{1000\mathrm{kg}\cdot9.4607\times 10^{15}\mathrm{m}}{133.322387415\mathrm{Pa}\cdot 31556926\mathrm{s}\cdot 30\mathrm{s}} \\
  &= 10^5\times\frac{1000\cdot9.4607\times 10^{15}}{133.322387415\cdot 31556926\cdot 30}\times\frac{\mathrm{kg}\cdot\mathrm{m}}{\mathrm{Pa}\cdot\mathrm{s}\cdot\mathrm{s}} \\
  &= 10^5\times\frac{9.4607\times 10^{18}}{1.2617\times 10^{11}}\times\frac{\mathrm{kg}\cdot\mathrm{m}}{\mathrm{N}\cdot\mathrm{m^{-2}}\cdot\mathrm{s}\cdot\mathrm{s}} \\
  &= 10^5\times 7.4983\times 10^7\times\frac{\mathrm{kg}\cdot\mathrm{m}}{\mathrm{kg}\cdot\mathrm{m}\cdot\mathrm{s^{-2}}\cdot\mathrm{m^{-2}}\cdot\mathrm{s}\cdot\mathrm{s}} \\
  &= 10^{12}\times 7.4983\mathrm{m^2}=10^6\times 7.4983\mathrm{km^2}
\end{aligned}
$$
