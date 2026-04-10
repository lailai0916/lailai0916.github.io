---
title: AT_wupc2012_6 最後の問題
date: 2026-03-21T18:04
tags: [solution, atcoder]
---

<Solution pid="AT_wupc2012_6" aid="mloeaze9" />

{/* truncate */}

## 题意简述

给定平面上 $n$ 个点的坐标 $(x_i,y_i)$，求满足条件的最大矩阵面积：

- 每条边都与坐标轴平行。
- 内部（不包括边）不能包含其他点。

## 解题思路

由于矩形的每条边都与坐标轴平行，因此只需要枚举左下角和右上角两个点，再判断另外两个点是否存在，即可确定一个矩形。

由于坐标值域较小，可以用二维数组记录每个点，并预处理二维前缀和，这样就能 $O(1)$ 查询矩形内部的点数是否为 $0$。

## 参考代码

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N=1005;
int s[N][N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	vector<pair<int,int>> a(n);
	for(auto &[x,y]:a)
	{
		cin>>x>>y;
		x++;
		y++;
		s[x][y]=1;
	}
	for(int i=1;i<N;i++)
	{
		for(int j=1;j<N;j++)
		{
			s[i][j]=s[i][j]+s[i-1][j]+s[i][j-1]-s[i-1][j-1];
		}
	}
	auto sum=[&](int x1,int y1,int x2,int y2)
	{
		return s[x2][y2]-s[x1-1][y2]-s[x2][y1-1]+s[x1-1][y1-1];
	};
	int ans=0;
	for(auto [x1,y1]:a)
	{
		for(auto [x2,y2]:a)
		{
			if(x1>=x2||y1>=y2)continue;
			if(!sum(x1,y2,x1,y2)||!sum(x2,y1,x2,y1))continue;
			if(sum(x1+1,y1+1,x2-1,y2-1))continue;
			ans=max(ans,(x2-x1)*(y2-y1));
		}
	}
	cout<<ans<<'\n';
	return 0;
}
```
