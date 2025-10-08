# 虚树

## 参考资料

- [虚树 - OI Wiki](https://oi-wiki.org/graph/virtual-tree/)

## 二次排序

```cpp
int build(int k)
{
	auto cmp=[](int u,int v){return dfn[u]<dfn[v];};
	sort(a+1,a+k+1,cmp);
	for(int i=1;i<k;i++)a[k+i]=lca(a[i],a[i+1]);
	a[k<<=1]=1;
	sort(a+1,a+k+1,cmp);
	k=unique(a+1,a+k+1)-a-1;
	for(int i=1;i<k;i++)H[lca(a[i],a[i+1])].push_back(a[i+1]);
	}
	return k;
}
```

## 单调栈

```cpp
void build(int k)
{
	auto cmp=[](int u,int v){return dfn[u]<dfn[v];};
	sort(a+1,a+k+1,cmp);
	s[1]=1;
	int t=1;
	for(int i=1;i<=k;i++)
	{
		if(a[i]==1)continue;
		int l=lca(a[i],s[t]);
		while(dep[s[t-1]]>=dep[l])H[s[t-1]].push_back(s[t--]);
		if(s[t]!=l){H[l].push_back(s[t]);s[t]=l;}
		s[++t]=a[i];
	}
	while(t>1)H[s[t-1]].push_back(s[t--]);
}
```

## 例题

### 洛谷 P2495 [SDOI2011] 消耗战 /【模板】虚树

<Problem id="P2495" />
