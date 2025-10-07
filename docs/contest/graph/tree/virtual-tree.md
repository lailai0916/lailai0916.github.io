# 虚树

## 参考资料

- [虚树 - OI Wiki](https://oi-wiki.org/graph/virtual-tree/)

## 二次排序

```cpp
int build(int k)
{
	sort(h+1,h+k+1,cmp);
	for(int i=1;i<k;i++)h[k+i]=lca(h[i],h[i+1]);
	h[k<<=1]=1;
	sort(h+1,h+k+1,cmp);
	k=unique(h+1,h+k+1)-h-1;
	for(int i=1;i<k;i++)
	{
		int u=lca(h[i],h[i+1]),v=h[i+1];
		H[u].push_back({v,dis[v]});
	}
	return k;
}
```

## 单调栈

```cpp
void build(int k)
{
	sort(h+1,h+k+1,cmp);
	s[1]=1;
	int t=1;
	for(int i=1;i<=k;i++)
	{
		if(h[i]==1)continue;
		int l=lca(h[i],s[t]);
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
		s[++t]=h[i];
	}
	while(t>1)
	{
		int u=s[t-1],v=s[t--];
		H[u].push_back({v,dis[v]});
	}
}
```

## 例题

### 洛谷 P2495 [SDOI2011] 消耗战

<Problem id="P2495" />
