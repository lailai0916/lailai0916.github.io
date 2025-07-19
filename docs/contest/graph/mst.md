# 最小生成树（MST）

## 参考资料

- [最小生成树 - OI Wiki](https://oi-wiki.org/graph/mst/)
- [最小生成树 - 维基百科](https://zh.wikipedia.org/zh-cn/最小生成树)

## Kruskal 算法

```cpp
struct Edge
{
	int u,v,w;
	bool operator<(const Edge &x) const{return w<x.w;}
}e[M];
int fa[N];
int find(int u){return u==fa[u]?u:fa[u]=find(fa[u]);}
int kruskal(int n,int m)
{
	for(int i=1;i<=n;i++)fa[i]=i;
	sort(e+1,e+m+1);
	int ans=0,cnt=0;
	for(int i=1;i<=m;i++)
	{
		int x=find(e[i].u),y=find(e[i].v);
		if(x==y)continue;
		fa[x]=y;
		ans+=e[i].w;
		cnt++;
	}
	return cnt==n-1?ans:-1;
}
```

## 例题

### 洛谷 P3366 【模板】最小生成树

<Problem id="P3366" />
