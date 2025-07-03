---
title: '题解：AT_nikkei2019ex_e コラッツ問題'
date: 2023-05-31T21:10
authors: [lailai]
tags: [solution, atcoder]
---

## 原题链接

- [洛谷 AT_nikkei2019ex_e コラッツ問題](https://www.luogu.com.cn/problem/AT_nikkei2019ex_e)

<!-- truncate -->

## 解题思路

设 $p=f(x)$，则有：

$$
p-1=
\begin{cases}
  f\left(\frac{x}{2}\right)&x\bmod2=0 \\
  f(3x+1)&x\bmod2=1
\end{cases}
$$

样例 #2 给了 $p=1000$ 的一个解 $x=1789997546303$，根据结论倒推即可。

## 参考代码

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll=long long;
int main()
{
	int p;
	cin>>p;
	ll f=1789997546303;
	for(int i=999;i>=p;i--)
	{
		if(f&1)f=f*3+1;
		else f>>=1;
	}
	cout<<f<<'\n';
	return 0;
}
```
