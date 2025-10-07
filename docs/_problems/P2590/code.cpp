#include <bits/stdc++.h>
#define ls (u<<1)
#define rs (u<<1|1)
#define mid (l+r>>1)
using namespace std;

const int inf=0x3f3f3f3f;
const int N=30005;
vector<int> G[N];
int fa[N],son[N],siz[N],dep[N];
int top[N],dfn[N],rnk[N],out[N];
int cnt=0;
void dfs1(int u)
{
	siz[u]=1;
	dep[u]=dep[fa[u]]+1;
	for(auto v:G[u])
	{
		if(v==fa[u])continue;
		fa[v]=u;
		dfs1(v);
		siz[u]+=siz[v];
		if(siz[v]>siz[son[u]])son[u]=v;
	}
}
void dfs2(int u,int t)
{
	top[u]=t;
	dfn[u]=++cnt;
	rnk[cnt]=u;
	if(son[u])dfs2(son[u],t);
	for(auto v:G[u])
	{
		if(v==fa[u]||v==son[u])continue;
		dfs2(v,v);
	}
	out[u]=cnt;
}
int a[N],val[N<<2],mx[N<<2];
void push_up(int u)
{
	val[u]=val[ls]+val[rs];
	mx[u]=max(mx[ls],mx[rs]);
}
void build(int u,int l,int r)
{
	if(l==r){val[u]=mx[u]=a[rnk[l]];return;}
	build(ls,l,mid);
	build(rs,mid+1,r);
	push_up(u);
}
void update(int u,int l,int r,int x,int v)
{
	if(l==r){val[u]=mx[u]=v;return;}
	if(x<=mid)update(ls,l,mid,x,v);
	else update(rs,mid+1,r,x,v);
	push_up(u);
}
int query_max(int u,int l,int r,int x,int y)
{
	if(x<=l&&r<=y)return mx[u];
	int res=-inf;
	if(x<=mid)res=max(res,query_max(ls,l,mid,x,y));
	if(y>mid)res=max(res,query_max(rs,mid+1,r,x,y));
	return res;
}
int query_sum(int u,int l,int r,int x,int y)
{
	if(x<=l&&r<=y)return val[u];
	int res=0;
	if(x<=mid)res+=query_sum(ls,l,mid,x,y);
	if(y>mid)res+=query_sum(rs,mid+1,r,x,y);
	return res;
}
int query_path_max(int x,int y,int n)
{
	int res=-inf;
	while(top[x]!=top[y])
	{
		if(dep[top[x]]<dep[top[y]])swap(x,y);
		res=max(res,query_max(1,1,n,dfn[top[x]],dfn[x]));
		x=fa[top[x]];
	}
	if(dep[x]<dep[y])swap(x,y);
	res=max(res,query_max(1,1,n,dfn[y],dfn[x]));
	return res;
}
int query_path_sum(int x,int y,int n)
{
	int res=0;
	while(top[x]!=top[y])
	{
		if(dep[top[x]]<dep[top[y]])swap(x,y);
		res+=query_sum(1,1,n,dfn[top[x]],dfn[x]);
		x=fa[top[x]];
	}
	if(dep[x]<dep[y])swap(x,y);
	res+=query_sum(1,1,n,dfn[y],dfn[x]);
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<n;i++)
	{
		int u,v;
		cin>>u>>v;
		G[u].push_back(v);
		G[v].push_back(u);
	}
	dfs1(1);
	dfs2(1,1);
	for(int i=1;i<=n;i++)cin>>a[i];
	build(1,1,n);
	int m;
	cin>>m;
	while(m--)
	{
		string op;
		int u,v;
		cin>>op>>u>>v;
		if(op=="CHANGE")update(1,1,n,dfn[u],v);
		else if(op=="QMAX")cout<<query_path_max(u,v,n)<<'\n';
		else if(op=="QSUM")cout<<query_path_sum(u,v,n)<<'\n';
	}
	return 0;
}
