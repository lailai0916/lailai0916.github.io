# 快速沃尔什变换（FWT）

## 参考资料

- [快速沃尔什变换 - OI Wiki](https://oi-wiki.org/math/poly/fwt/)
- [沃尔什转换 - 维基百科](https://zh.wikipedia.org/zh-cn/沃爾什轉換)

## 思路

快速傅立叶变换（FFT）可以在 $O(n\log n)$ 的时间内求解：

$$
C_k=\sum_{i+j=k}A_i\times B_j
$$

如果将求和符号中的 **加号** 换成 **位运算** 符号，就得到了 FWT。

快速沃尔什变换（FWT）可以在 $O(n\log n)$ 的时间内求解：

$$
C_k=\sum_{i\cup j=k}A_i\times B_j
$$

$$
C_k=\sum_{i\cap j=k}A_i\times B_j
$$

$$
C_k=\sum_{i\oplus j=k}A_i\times B_j
$$
