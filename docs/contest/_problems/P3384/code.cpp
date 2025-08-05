#include <bits/stdc++.h>
#define ls (u<<1)
#define rs (u<<1|1)
#define mid (l+r>>1)
using namespace std;

using ll=long long;
const int N=100005;
vector<int> G[N];
int fa[N],son[N],siz[N],dep[N];
int top[N],dfn[N],rnk[N],out[N];
int mod,cnt=0;
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
ll a[N],val[N<<2],tag[N<<2];
void gx(int u,ll v,int len)
{
	val[u]=(val[u]+v*len%mod)%mod;
	tag[u]=(tag[u]+v)%mod;
}
void push_up(int u)
{
	val[u]=(val[ls]+val[rs])%mod;
}
void push_down(int u,int l,int r)
{
	gx(ls,tag[u],mid-l+1);
	gx(rs,tag[u],r-mid);
	tag[u]=0;
}
void build(int u,int l,int r)
{
	if(l==r){val[u]=a[rnk[l]]%mod;return;}
	build(ls,l,mid);
	build(rs,mid+1,r);
	push_up(u);
}
void update(int u,int l,int r,int x,int y,ll v)
{
	if(x<=l&&r<=y){gx(u,v,r-l+1);return;}
	push_down(u,l,r);
	if(x<=mid)update(ls,l,mid,x,y,v);
	if(y>mid)update(rs,mid+1,r,x,y,v);
	push_up(u);
}
ll query(int u,int l,int r,int x,int y)
{
	if(x<=l&&r<=y)return val[u]%mod;
	push_down(u,l,r);
	ll res=0;
	if(x<=mid)res=(res+query(ls,l,mid,x,y))%mod;
	if(y>mid)res=(res+query(rs,mid+1,r,x,y))%mod;
	return res;
}
void update_path(int n,int x,int y,ll v)
{
	while(top[x]!=top[y])
	{
		if(dep[top[x]]<dep[top[y]])swap(x,y);
		update(1,1,n,dfn[top[x]],dfn[x],v);
		x=fa[top[x]];
	}
	if(dep[x]<dep[y])swap(x,y);
	update(1,1,n,dfn[y],dfn[x],v);
}
ll query_path(int n,int x,int y)
{
	ll res=0;
	while(top[x]!=top[y])
	{
		if(dep[top[x]]<dep[top[y]])swap(x,y);
		res=(res+query(1,1,n,dfn[top[x]],dfn[x]))%mod;
		x=fa[top[x]];
	}
	if(dep[x]<dep[y])swap(x,y);
	res=(res+query(1,1,n,dfn[y],dfn[x]))%mod;
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m,r;
	cin>>n>>m>>r>>mod;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
	}
	for(int i=1;i<n;i++)
	{
		int u,v;
		cin>>u>>v;
		G[u].push_back(v);
		G[v].push_back(u);
	}
	dfs1(r);
	dfs2(r,r);
	build(1,1,n);
	while(m--)
	{
		int op,x,y;
		ll z;
		cin>>op;
		if(op==1)
		{
			cin>>x>>y>>z;
			update_path(n,x,y,z);
		}
		else if(op==2)
		{
			cin>>x>>y;
			cout<<query_path(n,x,y)<<'\n';
		}
		else if(op==3)
		{
			cin>>x>>z;
			update(1,1,n,dfn[x],out[x],z);
		}
		else if(op==4)
		{
			cin>>x;
			cout<<query(1,1,n,dfn[x],out[x])<<'\n';
		}
	}
	return 0;
}