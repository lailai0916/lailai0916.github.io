# 排列组合

## 参考资料

- [排列组合 - OI Wiki](https://oi-wiki.org/math/combinatorics/combination/)
- [卢卡斯定理 - OI Wiki](https://oi-wiki.org/math/number-theory/lucas/)
- [组合数学 - 维基百科](https://zh.wikipedia.org/zh-cn/组合数学)

## 加法原理

完成一个工程可以有 $n$ 类办法，$a_i(1 \le i \le n)$ 代表第 $i$ 类方法的数目。那么完成这件事不同的方案数为：

$$
S=a_1+a_2+\cdots +a_n
$$

## 乘法原理

完成一个工程需要分 $n$ 个步骤，$a_i(1 \le i \le n)$ 代表第 $i$ 个步骤的不同方法数目。那么完成这件事不同的方案数为：

$$
S = a_1 \times a_2 \times \cdots \times a_n
$$

## 排列

$$
\mathrm A_n^m = \mathrm P_n^m = n(n-1)(n-2) \cdots (n-m+1) = \frac{n!}{(n - m)!}
$$

## 组合

$$
\mathrm C_n^m = \dbinom{n}{m}=\frac{\mathrm A_n^m}{m!} = \frac{n!}{m!(n - m)!}
$$

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
