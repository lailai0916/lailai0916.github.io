---
title: 'AT_utpc2021_a UTPC'
date: 2023-05-20T15:33
authors: [lailai]
tags: [solution, atcoder]
---

## 原题链接

- [洛谷 AT_utpc2021_a UTPC](https://www.luogu.com.cn/problem/AT_utpc2021_a)

<!-- truncate -->

## 题意简述

每次操作交换两个字符，使字符串 $S$ 包含至少 $1$ 个连续子串 `UTPC`，求最小操作次数。

## 解题思路

1. 设 $f(i)$ 为把 $S_i\sim S_{i+3}$ 改为 `UTPC` 的操作次数，则最终的答案为 $\min_{i=0}^{|S|-4}f(i)$。

2. 在每个子串中，如果某个位置的字符不同，有两种解决方案：

- 和子串内的字符交换。
- 和子串外的字符交换。（$S$ 至少包含一个 `U`、`T`、`P` 和 `C`，如果子串内没有，子串外一定有）

3. 由于只有 $4$ 个字符，可以递归枚举所有方案求出 $f(i)$。

## 参考代码

```cpp
#include <bits/stdc++.h>
using namespace std;

char a[4]={'U','T','P','C'};
string s;
int f(int x,int k)
{
	if(k>=4)return 0;
	if(s[x+k]==a[k])return f(x,k+1);
	int res=f(x,k+1)+1;
	for(int i=k+1;i<4;i++)
	{
		if(s[x+i]==a[k])
		{
			swap(s[x+k],s[x+i]);
			res=min(res,f(x,k+1)+1);
			swap(s[x+k],s[x+i]);
		}
	}
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n>>s;
	int ans=4;
	for(int i=0;i<n-3;i++)
	{
		ans=min(ans,f(i,0));
	}
	cout<<ans<<'\n';
	return 0;
}
```
