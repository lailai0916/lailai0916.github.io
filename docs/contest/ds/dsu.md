# 并查集

## 参考资料

- [并查集 - OI Wiki](https://oi-wiki.org/ds/dsu/)
- [并查集 - 维基百科](https://zh.wikipedia.org/zh-cn/并查集)

## 实现

```cpp
struct DSU
{
	int fa[N];
	void init(int n){for(int i=1;i<=n;i++)fa[i]=i;}
	int find(int u){return u==fa[u]?u:fa[u]=find(fa[u]);}
	void merge(int u,int v){fa[find(u)]=find(v);}
	bool query(int u,int v){return find(u)==find(v);}
};
```

## 例题

<Problem id="P3367" />

<Problem id="P1525" />

<Problem id="P1892" />

<Problem id="P2024" />
