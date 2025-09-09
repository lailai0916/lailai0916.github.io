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

### 洛谷 P3367 【模板】并查集

<Problem id="P3367" />

### 洛谷 P1525 [NOIP 2010 提高组] 关押罪犯

<Problem id="P1525" />

### 洛谷 P1892 [BalticOI 2003] 团伙

<Problem id="P1892" />

### 洛谷 P2024 [NOI2001] 食物链

<Problem id="P2024" />
