# 树链剖分

## 参考资料

- [树链剖分 - OI Wiki](https://oi-wiki.org/graph/hld/)

## 实现

```cpp
vector<int> G[N];
int fa[N],son[N],siz[N],dep[N];
int top[N],dfn[N],rnk[N],out[N];
int cnt=0;
void dfs1(int u)
{
	siz[u]=1;
	dep[u]=dep[fa[u]]+1;
	for(auto v:G[u])
	{
		if(v==fa[u])continue;
		fa[v]=u;
		dfs1(v);
		siz[u]+=siz[v];
		if(siz[v]>siz[son[u]])son[u]=v;
	}
}
void dfs2(int u,int t)
{
	top[u]=t;
	dfn[u]=++cnt;
	rnk[cnt]=u;
	if(son[u])dfs2(son[u],t);
	for(auto v:G[u])
	{
		if(v==fa[u]||v==son[u])continue;
		dfs2(v,v);
	}
	out[u]=cnt;
}
```

## 应用

详见 [最近公共祖先](lca)

## 例题

### 洛谷 P3384 【模板】重链剖分/树链剖分

<Problem id="P3384" />

### 洛谷 P5903 【模板】树上 K 级祖先

<Problem id="P5903" />

### 洛谷 P3379 【模板】最近公共祖先（LCA）

<Problem id="P3379" />

### 洛谷 P2590 [ZJOI2008] 树的统计

<Problem id="P2590" />
