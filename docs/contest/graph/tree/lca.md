# 最近公共祖先（LCA）

## 参考资料

- [最近公共祖先 - OI Wiki](https://oi-wiki.org/graph/lca/)

## 倍增

```cpp
int lca(int u,int v)
{
	if(dep[u]<dep[v])swap(u,v);
	for(int i=20;i>=0;i--)
	{
		if(dep[a[u][i]]>=dep[v])u=a[u][i];
	}
	if(u==v)return u;
	for(int i=20;i>=0;i--)
	{
		if(a[u][i]!=a[v][i])
		{
			u=a[u][i];
			v=a[v][i];
		}
	}
	return a[u][0];
}
```

## 树链剖分

```cpp
int lca(int u,int v)
{
	while(top[u]!=top[v])
	{
		if(dep[top[u]]<dep[top[v]])swap(u,v);
		u=fa[top[u]];
	}
	return dep[u]<dep[v]?u:v;
}
```

## 例题

### 洛谷 P3379 【模板】最近公共祖先（LCA）

<Problem id="P3379" />
