---
title: '题解：AT_arc168_a [ARC168A] <Inversion>'
date: 2023-11-28T21:25
authors: [lailai]
tags: [solution, atcoder]
---

## 原题链接

- [洛谷 AT_arc168_a [ARC168A] \<Inversion\>](https://www.luogu.com.cn/problem/AT_arc168_a)

<!-- truncate -->

## 解题思路

构造一个最优的序列，然后归并排序求逆序对。

为了使逆序对数量尽可能少，就要让后面的数尽可能大。

1. 令 $x_1=0$。

2. 对于每个 $k\in[1,n-1]$ 分类讨论：

- 如果 $s_k$ 为 `>`，即 $x_k>x_{k+1}$：$x_{k+1}$ 比 $x_k$ 小，但又要尽可能大，可以让 $x_{k+1}\gets x_k-1$。
- 否则 $s_k$ 为 `<`，即 $x_k<x_{k+1}$：$x_{k+1}$ 要尽可能大，可以让 $x_{k+1}\gets x_k+\infty$。

3. 这里的 $\infty$ 是相对于数据范围 $250000$ 的，多个 $\infty$ 允许叠加，且 $2\cdot\infty\gg\infty\gg0$。

4. 最后用归并排序求 $x_i$ 的逆序对数量。

## 参考代码

```cpp
#include <bits/stdc++.h>
#define mid (l+r>>1)
using namespace std;

using ll=long long;
const int N=250005;
const int inf=0x3f3f3f3f;
ll a[N],b[N];
ll ans=0;
void msort(int l,int r)
{
	if(l==r)return;
	msort(l,mid);
	msort(mid+1,r);
	int p1=l,p2=mid+1,k=l;
	while(p1<=mid&&p2<=r)
	{
		if(a[p1]<=a[p2])
		{
			b[k++]=a[p1++];
		}
		else
		{
			b[k++]=a[p2++];
			ans+=mid-p1+1;
		}
	}
	while(p1<=mid)b[k++]=a[p1++];
	while(p2<=r)b[k++]=a[p2++];
	for(int i=l;i<=r;i++)a[i]=b[i];
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	string s;
	cin>>n>>s;
	for(int i=0;i<n-1;i++)
	{
		if(s[i]=='>')a[i+1]=a[i]-1;
		else a[i+1]=a[i]+inf;
	}
	msort(0,n-1);
	cout<<ans<<'\n';
	return 0;
}
```
