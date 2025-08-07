:::info[[洛谷 P6097 【模板】子集卷积](https://www.luogu.com.cn/problem/P6097)]

给定两个长度为 $2^n$ 的序列 $a_0,a_1,\cdots,a_{2^n-1}$ 和 $b_0,b_1,\cdots,b_{2^n-1}$，你需要求出一个序列 $c_0,c_1,\cdots,c_{2^n-1}$，其中 $c_k$ 满足：

$$
c_k=\sum_{\substack{{i \& j=0}\\{i~\mid~ j=k}}} a_i b_j
$$

其中$~\mid~$表示按位或，$\&$表示按位与。

答案对 $10^9+9$ 取模。

:::
