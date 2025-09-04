#include <bits/stdc++.h>
using namespace std;

const int N=500005;
vector<int> G[N];
int fa[N],dep[N],siz[N],son[N];
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
void dfs2(int u,int e)
{
	top[u]=e;
	dfn[u]=++cnt;
	rnk[cnt]=u;
	if(son[u])dfs2(son[u],e);
	for(auto v:G[u])
	{
		if(v==fa[u]||v==son[u])continue;
		dfs2(v,v);
	}
	out[u]=cnt;
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
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m,s;
	cin>>n>>m>>s;
	for(int i=1;i<n;i++)
	{
		int u,v;
		cin>>u>>v;
		G[u].push_back(v);
		G[v].push_back(u);
	}
	dfs1(s);
	dfs2(s,s);
	while(m--)
	{
		int u,v;
		cin>>u>>v;
		cout<<lca(u,v)<<'\n';
	}
	return 0;
}
