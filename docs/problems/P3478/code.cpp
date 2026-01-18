#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=1000005;
vector<int> G[N];
int fa[N],siz[N],dep[N];
ll f[N];
void dfs1(int u)
{
	siz[u]=1;
	dep[u]=dep[fa[u]]+1;
	f[1]+=dep[u];
	for(auto v:G[u])
	{
		if(v==fa[u])continue;
		fa[v]=u;
		dfs1(v);
		siz[u]+=siz[v];
	}
}
void dfs2(int u)
{
	for(auto v:G[u])
	{
		if(v==fa[u])continue;
		f[v]=f[u]-siz[v]*2+siz[1];
		dfs2(v);
	}
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
	dfs2(1);
	int mx=1;
	for(int i=2;i<=n;i++)
	{
		if(f[i]>f[mx])mx=i;
	}
	cout<<mx<<'\n';
	return 0;
}