#include <bits/stdc++.h>
#define mid (l+r>>1)
using namespace std;

using ll=long long;
const int N=100005;
int root[N],son[N*80][2],val[N*80];
ll tag[N*80];
int cnt=0;
void push_up(int u)
{
	bool t=val[son[u][0]]<val[son[u][1]];
	val[u]=val[son[u][t]];
	tag[u]=tag[son[u][t]];
}
void update(int &u,int l,int r,int x,int v)
{
	if(!u)u=++cnt;
	if(l==r){val[u]+=v;tag[u]=l;return;}
	if(x<=mid)update(son[u][0],l,mid,x,v);
	else update(son[u][1],mid+1,r,x,v);
	push_up(u);
}
int merge(int u1,int u2,int l,int r)
{
	if(!u1||!u2)return u1|u2;
	if(l==r){val[u1]+=val[u2];return u1;}
	son[u1][0]=merge(son[u1][0],son[u2][0],l,mid);
	son[u1][1]=merge(son[u1][1],son[u2][1],mid+1,r);
	push_up(u1);
	return u1;
}
vector<int> G[N];
ll ans[N];
void dfs(int u,int fa)
{
	for(auto v:G[u])
	{
		if(v==fa)continue;
		dfs(v,u);
		root[u]=merge(root[u],root[v],1,100000);
	}
	ans[u]=val[root[u]]>0?tag[root[u]]:0;
}
int siz[N],fa[N],top[N],dep[N],sonn[N];
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
		if(siz[v]>siz[sonn[u]])sonn[u]=v;
	}
}
void dfs2(int u,int h)
{
	top[u]=h;
	if(sonn[u])dfs2(sonn[u],h);
	for(auto v:G[u])
	{
		if(v==fa[u]||v==sonn[u])continue;
		dfs2(v,v);
	}
}
int lca(int x,int y)
{
	while(top[x]!=top[y])
	{
		if(dep[top[x]]>dep[top[y]])x=fa[top[x]];
		else y=fa[top[y]];
	}
	return dep[x]<dep[y]?x:y;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=1;i<n;i++)
	{
		int u,v;
		cin>>u>>v;
		G[u].push_back(v);
		G[v].push_back(u);
	}
	dfs1(1);
	dfs2(1,1);
	while(m--)
	{
		int x,y,z;
		cin>>x>>y>>z;
		int l=lca(x,y);
		update(root[x],1,100000,z,1);
		update(root[y],1,100000,z,1);
		update(root[l],1,100000,z,-1);
		if(l!=1)update(root[fa[l]],1,100000,z,-1);
	}
	dfs(1,0);
	for(int i=1;i<=n;i++)
	{
		cout<<ans[i]<<'\n';
	}
	return 0;
}
