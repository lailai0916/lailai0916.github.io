# 排列组合

## 参考资料

- [排列组合 - OI Wiki](https://oi-wiki.org/math/combinatorics/combination/)
- [卢卡斯定理 - OI Wiki](https://oi-wiki.org/math/number-theory/lucas/)
- [组合数学 - 维基百科](https://zh.wikipedia.org/zh-cn/组合数学)

## 实现

### 初始化（线性逆元）

$$
i^{-1}=-\left\lfloor\frac{p}{i}\right\rfloor(p\bmod i)^{-1}
$$

```cpp
ll inv[N],fac[N],jv[N];
void init()
{
	fac[0]=jv[0]=1;
	for(int i=1;i<N;i++)
	{
		inv[i]=i==1?1:(mod-mod/i)*inv[mod%i]%mod;
		fac[i]=fac[i-1]*i%mod;
		jv[i]=jv[i-1]*inv[i]%mod;
	}
}
```

### 组合

$$
C_{n}^{m}=\frac{n!}{m!(n-m)!}
$$

```cpp
ll C(ll n,ll m)
{
	if(n<m||m<0)return 0;
	return fac[n]*jv[n-m]%mod*jv[m]%mod;
}
```

### 排列

$$
A_{n}^{m}=\frac{n!}{(n-m)!}
$$

```cpp
ll A(ll n,ll m)
{
	if(n<m||m<0)return 0;
	return fac[n]*jv[n-m]%mod;
}
```

### 卢卡斯定理

$$
C_{n}^{m}=C_{m/p}^{n/p}\cdot C_{m\bmod p}^{n\bmod p}\pmod p
$$

```cpp
ll lucas(ll n,ll m)
{
	if(m==0)return 1;
	return C(n%mod,m%mod)*lucas(n/mod,m/mod)%mod;
}
```

## 例题

### 洛谷 P3807 【模板】卢卡斯定理/Lucas 定理

<Problem id="P3807" />
