---
title: '插值'
---

## 参考资料

- [插值 - OI Wiki](https://oi-wiki.org/math/numerical/interp/)

## 拉格朗日插值

$$
f(x)=\sum_{i=1}^{n}y_i\cdot\prod_{j\ne i}\frac{x-x_j}{x_i-x_j}
$$

```cpp
ll lagrange(int n,int k)
{
	ll ans=0;
	for(int i=1;i<=n;i++)
	{
		ll p=1,q=1;
		for(int j=1;j<=n;j++)
		{
			if(i==j)continue;
			p=p*(k-x[j])%mod;
			q=q*(x[i]-x[j])%mod;
		}
		ans=(ans+y[i]*(p*Pow(q,mod-2)%mod)%mod)%mod;
	}
	return (ans+mod)%mod;
}
```

## 例题

<Problem id="P4781" />
