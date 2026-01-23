---
title: 'AT_iroha2019_day2_c 陽気な妖姫'
date: 2023-05-27T16:27
tags: [solution, atcoder]
---

<Solution pid="AT_iroha2019_day2_c" aid="zwqdlgue" />

<!-- truncate -->

## 解题思路

对于每个数，记录输入的数值 $v$ 并保存初始顺序 $id$。

将结构体按数值 $v$ 从小到大排序。

计算每个数排名（数值相等的排名相同）：

- 第一个数的排名为 $1$；
- 后面每个数，如果数值与前一个相等排名不变，否则排名增加 $1$。

将每个数按初始顺序 $id$ 存入答案数组，并按顺序输出答案数组。

## 参考代码

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N=1000005;
struct Node
{
	int v,id;
}a[N];
bool cmp(Node x,Node y)
{
	return x.v<y.v;
}
int ans[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i].v;
		a[i].id=i;
	}
	sort(a+1,a+n+1,cmp);
	int k=0;
	for(int i=1;i<=n;i++)
	{
		if(a[i].v!=a[i-1].v)k++;
		ans[a[i].id]=k;
	}
	for(int i=1;i<=n;i++)
	{
		cout<<ans[i]<<'\n';
	}
	return 0;
}
```
