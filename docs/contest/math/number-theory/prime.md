---
title: '素数'
---

## 参考资料

- [素数 - OI Wiki](https://oi-wiki.org/math/number-theory/prime/)

## 素性测试

### 试除法

时间复杂度为 $O(\sqrt{n})$。

```cpp
bool prime(int n)
{
	if(n<2)return 0;
	for(int i=2;i*i<=n;i++)
	{
		if(n%i==0)return 0;
	}
	return 1;
}
```

### Fermat 素性测试

时间复杂度为 $O(k\log n)$。

```cpp
ll Pow(ll x,ll y,ll mod)
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
bool prime(int n,int k)
{
	if(n<3)return n==2;
	while(k--)
	{
		if(Pow(rand()%(n-2)+2,n-1,n)!=1)return 0;
	}
	return 1;
}
```

### Miller–Rabin 素性测试

时间复杂度为 $O(k\log^3{n})$。

```cpp
ll Pow(ll x,ll y,ll mod)
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
bool prime(int n,int k)
{
	if(n<3||n%2==0)return n==2;
	if(n%3==0)return n==3;
	int u=n-1,t=0;
	while(u%2==0){u>>=1;t++;}
	while(k--)
	{
		ll v=Pow(rand()%(n-3)+2,u,n);
		if(v==1)continue;
		int s;
		for(s=0;s<t;s++)
		{
			if(v==n-1)break;
			v=v*v%n;
		}
		if(s==t)return 0;
	}
	return 1;
}
```

## 例题

<Problem id="P1217" />
