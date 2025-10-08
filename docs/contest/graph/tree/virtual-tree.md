# 虚树

## 参考资料

- [虚树 - OI Wiki](https://oi-wiki.org/graph/virtual-tree/)

## 二次排序

```cpp
int build(int k)
{
	sort(a+1,a+k+1,cmp);
	for(int i=1;i<k;i++)a[k+i]=lca(a[i],a[i+1]);
	a[k<<=1]=1;
	sort(a+1,a+k+1,cmp);
	k=unique(a+1,a+k+1)-a-1;
	for(int i=1;i<k;i++)
	{
		int u=lca(a[i],a[i+1]),v=a[i+1];
		H[u].push_back({v,dis[v]});
	}
	return k;
}
```

## 单调栈

```cpp
void build(int k)
{
	sort(a+1,a+k+1,cmp);
	s[1]=1;
	int t=1;
	for(int i=1;i<=k;i++)
	{
		if(a[i]==1)continue;
		int l=lca(a[i],s[t]);
		while(t>1&&dep[s[t-1]]>=dep[l])
		{
			int u=s[t-1],v=s[t--];
			H[u].push_back({v,dis[v]});
		}
		if(s[t]!=l)
		{
			H[l].push_back({s[t],dis[s[t]]});
			s[t]=l;
		}
		s[++t]=a[i];
	}
	while(t>1)
	{
		int u=s[t-1],v=s[t--];
		H[u].push_back({v,dis[v]});
	}
}
```

## 例题

### 洛谷 P2495 [SDOI2011] 消耗战 /【模板】虚树

<Problem id="P2495" />
