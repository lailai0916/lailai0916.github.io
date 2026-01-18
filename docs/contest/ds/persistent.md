# 可持久化数据结构

## 参考资料

- [可持久化数据结构简介 - OI Wiki](https://oi-wiki.org/ds/persistent/)

## 可持久化线段树

**可持久化线段树** 也称为 **主席树**，详见 [知乎讨论](https://www.zhihu.com/question/59195374)。

```cpp
#include <bits/stdc++.h>
#define mid (l+r>>1)
using namespace std;

const int N=1000005;
struct Node
{
	int ls,rs,val;
}G[N*25];
int a[N],root[N],cnt=0;
void build(int &u,int l,int r)
{
	u=++cnt;
	if(l==r){G[u].val=a[l];return;}
	build(G[u].ls,l,mid);
	build(G[u].rs,mid+1,r);
}
void update(int &u,int o,int l,int r,int x,int v)
{
	u=++cnt;
	G[u]=G[o];
	if(l==r){G[u].val=v;return;}
	if(x<=mid)update(G[u].ls,G[o].ls,l,mid,x,v);
	else update(G[u].rs,G[o].rs,mid+1,r,x,v);
}
int query(int u,int l,int r,int x)
{
	if(l==r)return G[u].val;
	if(x<=mid)return query(G[u].ls,l,mid,x);
	else return query(G[u].rs,mid+1,r,x);
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
	}
	build(root[0],1,n);
	for(int i=1;i<=m;i++)
	{
		int v,op,x,y;
		cin>>v>>op;
		if(op==1)
		{
			cin>>x>>y;
			update(root[i],root[v],1,n,x,y);
		}
		else if(op==2)
		{
			cin>>x;
			root[i]=root[v];
			cout<<query(root[v],1,n,x)<<'\n';
		}
	}
	return 0;
}
```

## 例题

<Problem id="P3919" />

<Problem id="P3834" />
