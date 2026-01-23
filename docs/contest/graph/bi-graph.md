---
title: '二分图'
---

## 参考资料

- [二分图 - OI Wiki](https://oi-wiki.org/graph/bi-graph/)
- [二分图最大匹配 - OI Wiki](https://oi-wiki.org/graph/graph-matching/bigraph-match/)

## 匈牙利算法

```cpp
bool match(int u)
{
	for(auto v:G[u])
	{
		if(vis[v])continue;
		vis[v]=1;
		if(!a[v]||match(a[v]))
		{
			a[v]=u;
			return 1;
		}
	}
	return 0;
}
```

## 例题

<Problem id="P3386" />

<Problem id="P10937" />
