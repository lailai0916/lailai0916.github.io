# 容斥原理

## 参考资料

- [容斥原理 - 维基百科](https://zh.wikipedia.org/zh-cn/排容原理)
- [容斥原理 - OI Wiki](https://oi-wiki.org/math/combinatorics/inclusion-exclusion-principle/)

## 容斥原理

### 两个集合

$$
\left | A \cup B \right | = \left | A \right | + \left | B \right | - \left | A \cap B \right |
$$

### 三个集合

$$
\left | A \cup B \cup C \right | = \left | A \right | + \left | B \right | + \left | C \right | - \left | A \cap B \right | - \left | A \cap C \right | - \left | B \cap C \right | + \left | A \cap B \cap C \right |
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
