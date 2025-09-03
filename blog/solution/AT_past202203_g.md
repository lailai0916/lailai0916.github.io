---
title: 'AT_past202203_g 方程式'
date: 2023-05-27T10:14
authors: [lailai]
tags: [solution, atcoder]
---

## 原题链接

- [洛谷 AT_past202203_g 方程式](https://www.luogu.com.cn/problem/AT_past202203_g)

<!-- truncate -->

## 题意简述

求解方程 $ax^5+bx+c=0$ 在区间 $(1,2)$ 内的唯一解。

## 解题思路

设函数 $f(x)=ax^5+bx+c$，求导得 $f'(x)=5ax^4+b$。

由于题目中保证 $a,b\ge1$，并且 $x^4\ge0$，因此可以得出 $f'(x)>0$，说明 $f(x)$ 是严格单调递增的函数。

设方程的根为 $x_0$，即满足 $f(x_0)=0$，基于函数单调递增的性质，可以得到以下结论：

- 若 $f(x_1)>0$，则 $x_1>x_0$；
- 若 $f(x_1)<0$，则 $x_1<x_0$。

因此，可以使用二分法计算出答案。

## 参考代码

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const double eps=1e-12;
ll a,b,c;
double f(double x)
{
	return a*x*x*x*x*x+b*x+c;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>a>>b>>c;
	double l=1,r=2;
	while(r-l>eps)
	{
		double mid=(l+r)/2;
		if(f(mid)>0)r=mid;
		else l=mid;
	}
	cout<<fixed<<setprecision(12)<<l<<'\n';
	return 0;
}
```
