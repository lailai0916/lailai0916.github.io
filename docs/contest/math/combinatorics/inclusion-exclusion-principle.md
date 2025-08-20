# 容斥原理

## 参考资料

- [容斥原理 - 维基百科](https://zh.wikipedia.org/zh-cn/排容原理)
- [容斥原理 - OI Wiki](https://oi-wiki.org/math/combinatorics/inclusion-exclusion-principle/)

## 容斥原理

### 两个集合

$$
|A\cup B|=|A|+|B|-|A\cap B|
$$

### 三个集合

$$
|A\cup B\cup C|=|A|+|B|+|C|-|A\cap B|-|A\cap C|-|B\cap C|+|A\cap B\cap C|
$$

### 多个集合

$$
\left|\bigcup_{i=1}^{n}S_i\right|=\sum_{m=1}^n(-1)^{m-1}\sum_{a_i<a_{i+1} }\left|\bigcap_{i=1}^mS_{a_i}\right|
$$

## Min-max 容斥

$$
\max{S}=\sum_{T\subseteq S}{(-1)^{|T|-1}\min{T}}
$$

$$
\min{S}=\sum_{T\subseteq S}{(-1)^{|T|-1}\max{T}}
$$
