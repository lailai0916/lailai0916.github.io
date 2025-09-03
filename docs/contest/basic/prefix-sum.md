# 前缀和 & 差分

## 参考资料

- [前缀和 & 差分 - OI Wiki](https://oi-wiki.org/basic/prefix-sum/)

## 前缀和

前缀和可以简单理解为「数列的前 $n$ 项的和」，是一种重要的预处理方式，能大大降低查询的时间复杂度。

$$
S_k=\sum_{i=1}^k A_i=A_1+A_2+\dots+A_k
$$

$$
\sum_{i=a}^b A_i=S_b-S_{a-1}
$$

## 差分

差分是一种和前缀和相对的策略，可以当做是求和的逆运算。

$$
A_k=S_k-S_{k-1}
$$

## STL

- [`std::partial_sum`](https://en.cppreference.com/w/cpp/algorithm/partial_sum.html)
- [`std::adjacent_difference`](https://en.cppreference.com/w/cpp/algorithm/adjacent_difference.html)

## 例题

### 洛谷 P8218 【深进1.例1】求区间和

<Problem id="P8218" />
