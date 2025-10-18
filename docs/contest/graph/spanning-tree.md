# 生成树问题

## 参考资料

- [最小生成树 - OI Wiki](https://oi-wiki.org/graph/mst/)
- [最小生成树 - 维基百科](https://zh.wikipedia.org/zh-cn/最小生成树)

## 算法对比

$n$ 代表图的点数，$m$ 代表图的边数。

|   算法名称   |    时间复杂度    |
| :----------: | :--------------: |
| Kruskal 算法 |   $O(m\log m)$   |
|  Prim 算法   | $O((n+m)\log n)$ |
| Boruvka 算法 |   $O(m\log n)$   |

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
int kruskal(int n)
{
	for(int i=1;i<=n;i++)fa[i]=i;
	sort(E.begin(),E.end());
	int ans=0,cnt=0;
	for(auto [u,v,w]:E)
	{
		if(cnt==n-1)break;
		int x=find(u),y=find(v);
		if(x==y)continue;
		fa[x]=y;
		ans+=w;
		cnt++;
	}
	return cnt==n-1?ans:-1;
}
```

## Kruskal 重构树

## 例题

### 洛谷 P3366 【模板】最小生成树

<Problem id="P3366" />

### 洛谷 P1195 口袋的天空

<Problem id="P1195" />

### 洛谷 P1967 [NOIP 2013 提高组] 货车运输

<Problem id="P1967" />

### 洛谷 P2245 星际导航

<Problem id="P2245" />
