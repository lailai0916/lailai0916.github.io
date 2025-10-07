# 最小生成树

## 参考资料

- [最小生成树 - OI Wiki](https://oi-wiki.org/graph/mst/)
- [最小生成树 - 维基百科](https://zh.wikipedia.org/zh-cn/最小生成树)

## Kruskal 算法

```cpp
struct Edge
{
	int u,v,w;
	bool operator<(const Edge &x) const{return w<x.w;}
};
vector<Edge> E;
int fa[N];
int find(int u){return u==fa[u]?u:fa[u]=find(fa[u]);}
int kruskal(int n,int m)
{
	for(int i=1;i<=n;i++)fa[i]=i;
	sort(E.begin(),E.end());
	int ans=0,cnt=0;
	for(auto [u,v,w]:E)
	{
		int x=find(u),y=find(v);
		if(x==y)continue;
		fa[x]=y;
		ans+=w;
		cnt++;
	}
	return cnt==n-1?ans:-1;
}
```

## 例题

### 洛谷 P3366 【模板】最小生成树

<Problem id="P3366" />

### 洛谷 P1195 口袋的天空

<Problem id="P1195" />
