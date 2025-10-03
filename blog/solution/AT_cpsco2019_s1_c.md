---
title: 'AT_cpsco2019_s1_c Coins'
date: 2023-05-31T22:36
authors: lailai
tags: [solution, atcoder]
---

<Solution pid="AT_cpsco2019_s1_c" aid="7ag0p8ey" />

<!-- truncate -->

## 题意简述

有 $20$ 种硬币（每种硬币数量充足），面值分别为 $1,10,100,\dots,10^{9}$ 和 $5,50,500,\dots,5\times10^{9}$。

给定 $n$ 种水果，每种的价格为 $a_i$ 元。求任意买 $k$ 种水果，使用硬币的最少个数。

## 解题思路

为了让使用硬币的个数尽可能少，对于价格的每一位，最优方案显然是使用相同位数的硬币：

设某位上的值为 $x$，分两种情况考虑（相同位数以 $1$ 开头的硬币称为“硬币一”，以 $5$ 开头的硬币称为“硬币二”）：

- 若 $x<5$ 时，使用 $x$ 个硬币一即可；
- 若 $x\ge5$ 时，将 $5$ 个硬币一换成 $1$ 个硬币二，可节省 $4$ 个硬币。

数据范围 $k\le6$，即最多选择 $6$ 种水果。由于数据较小，可以直接递归枚举选取的水果，计算最终使用硬币的个数并取最小值。

## 参考代码

```cpp
#include <bits/stdc++.h>
using namespace std;

const int inf=0x3f3f3f3f;
const int N=35;
int n,k,ans=inf;
int a[N];
void f(int u,int t,int s)
{
	if(t==k)
	{
		int sum=0;
		while(s)
		{
			if(s%10>=5)sum-=4;
			sum+=s%10;
			s/=10;
		}
		ans=min(ans,sum);
		return;
	}
	if(u>n)return;
	for(int i=0;i<2;i++)
	{
		if(t+i>k)continue;
		f(u+1,t+i,s+i*a[u]);
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>n>>k;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
	}
	f(1,0,0);
	cout<<ans<<'\n';
	return 0;
}
```
