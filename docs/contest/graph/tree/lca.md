# 最近公共祖先（LCA）

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
