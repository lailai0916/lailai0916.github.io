# 置换与排列

## 参考资料

- [置换和排列 - OI Wiki](https://oi-wiki.org/math/permutation/)
- [康托展开 - 维基百科](https://zh.wikipedia.org/zh-cn/康托展开)

## 康托展开

$$
x=\sum_{i=1}^n(n-i)!\sum_{j=i}^n[a_j<a_i]
$$

序号通常从 $1$ 开始，所以初始 `ans=1`。

```cpp
ll ans=1;
for(int i=n;i>=1;i--)
{
	ans=(ans+fac[n-i]*sum(a[i]))%mod;
	add(a[i]);
}
```

## 例题

### 洛谷 P5367 【模板】康托展开

<Problem id="P5367" />

### 洛谷 UVA11525 Permutation

<Problem id="UVA11525" />
