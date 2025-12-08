# 快速幂

## 参考资料

- [快速幂 - OI Wiki](https://oi-wiki.org/math/binary-exponentiation/)
- [平方求幂 - 维基百科](https://zh.wikipedia.org/zh-cn/平方求幂)

## 快速幂

```cpp
ll Pow(ll x,ll y)
{
	x%=mod;
	ll res=1;
	while(y)
	{
		if(y&1)res=res*x%mod;
		x=x*x%mod;
		y>>=1;
	}
	return res;
}
```

## 龟速乘

龟速乘用于计算 $xy\bmod p$，可以防止直接计算 $xy$ 过大导致溢出。

```cpp
ll mul(ll x,ll y)
{
	x%=mod;
	ll res=0;
	while(y)
	{
		if(y&1)res=(res+x)%mod;
		x=(x+x)%mod;
		y>>=1;
	}
	return res;
}
```

## 例题

### 洛谷 P1226 【模板】快速幂

<Problem id="P1226" />
