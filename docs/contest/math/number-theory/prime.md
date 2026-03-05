---
title: '素数'
---

## 参考资料

- [素数 - OI Wiki](https://oi-wiki.org/math/number-theory/prime/)
- [素数 - 维基百科](https://zh.wikipedia.org/wiki/质数)
- [素数列表 - 维基百科](https://zh.wikipedia.org/wiki/質數列表)

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

## 常见素数

- $100$ 以内：$2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97$。
- 常见模数：$1009,10007,10009,100003,1000003,100000007=10^8+7,1000000007=10^9+7,1000000009=10^9+9,1000000000000000009=10^{18}+9,998244353=119\times 2^{23}+1$。
- 梅森素数：$3=2^2-1,7=2^3-1,31=2^5-1,127=2^7-1,8191=2^{13}-1,131071=2^{17}-1,524287=2^{19}-1,2147483647=2^{31}-1,\dots,2^{136279841}-1$。
- 日期素数：$19260817,19370707,19491001,19970701,20200123$。
- 特殊含义：$13331,13337,23333,314159,2718281,1618033,1145141,52013141,23456789$。

## 例题

<Problem id="P1217" />
