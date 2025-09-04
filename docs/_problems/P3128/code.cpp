#include <bits/stdc++.h>
using namespace std;

const int N=50005;
vector<int> G[N];
int fa[N],son[N],siz[N],dep[N],top[N];
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
void dfs2(int u,int e)
{
	top[u]=e;
	if(son[u])dfs2(son[u],e);
	for(auto v:G[u])
	{
		if(v==fa[u]||v==son[u])continue;
		dfs2(v,v);
	}
}
int lca(int u,int v)
{
	while(top[u]!=top[v])
	{
		if(dep[top[u]]<dep[top[v]])swap(u,v);
		u=fa[top[u]];
	}
	return dep[u]<dep[v]?u:v;
}
int a[N],ans=0;
void dfs(int u)
{
	for(auto v:G[u])
	{
		if(v==fa[u])continue;
		dfs(v);
		a[u]+=a[v];
	}
	ans=max(ans,a[u]);
}
int main()
{
	int n,k;
	cin>>n>>k;
	for(int i=1;i<n;i++)
	{
		int u,v;
		cin>>u>>v;
		G[u].push_back(v);
		G[v].push_back(u);
	}
	dfs1(1);
	dfs2(1,1);
	while(k--)
	{
		int x,y;
		cin>>x>>y;
		a[fa[lca(x,y)]]--;
		a[lca(x,y)]--;
		a[x]++;
		a[y]++;
	}
	dfs(1);
	cout<<ans<<'\n';
	return 0;
}