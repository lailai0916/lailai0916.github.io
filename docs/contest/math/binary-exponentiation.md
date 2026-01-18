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

龟速乘用于计算 $x\times y\bmod p$，可以防止直接计算 $x\times y$ 过大导致溢出。

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

另外两种实现：

<Tabs>
<TabItem value="__int128">

```cpp
ll mul(ll a,ll b,ll mod)
{
	return __int128(a)*b%mod;
}
```

</TabItem>
<TabItem value="long double">

```cpp
ll mul(ll a,ll b,ll mod)
{
	return (a*b-ll(ld(a)/mod*b+0.5)*mod+mod)%mod;
}
```

</TabItem>
</Tabs>

## 例题

<Problem id="P1226" />
