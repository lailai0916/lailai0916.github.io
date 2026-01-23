---
title: '树形 DP'
---

## 参考资料

- [树形 DP - OI Wiki](https://oi-wiki.org/dp/tree/)

## 实现

```cpp
void dfs(int u)
{
	for(auto v:G[u])
	{
		dfs(v);
		f[u][0]+=max(f[v][0],f[v][1]);
		f[u][1]+=f[v][0];
	}
}
```

## 换根 DP

详见 [树的重心](../graph/tree/centroid)。

## 例题

<Problem id="P1352" />

<Problem id="P3478" />
