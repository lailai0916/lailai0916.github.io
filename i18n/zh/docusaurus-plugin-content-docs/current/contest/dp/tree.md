# 树形 DP

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

## 例题

### 洛谷 P1352 没有上司的舞会

<Problem id="P1352" />

### 洛谷 P3478 [POI 2008] STA-Station

<Problem id="P3478" />
