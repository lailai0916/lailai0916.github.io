#include <bits/stdc++.h>
using namespace std;

const int N=500005;
int f[N][20],dep[N];
vector<int> G[N];
bool vis[N];
void dfs(int u,int fa)
{
	f[u][0]=fa;
	dep[u]=dep[fa]+1;
	for(auto v:G[u])
	{
		if(v!=fa)dfs(v,u);
	}
}
int lca(int u,int v)
{
	if(dep[u]<dep[v])swap(u,v);
	for(int i=22;i>=0;i--)
	{
		if(dep[f[u][i]]>=dep[v])u=f[u][i];
	}
	if(u==v)return u;
	for(int i=22;i>=0;i--)
	{
		if(f[u][i]!=f[v][i])
		{
			u=f[u][i];
			v=f[v][i];
		}
	}
	return f[u][0];
}
void init(int n)
{
	for(int j=1;(1<<j)<=n;j++)
	{
		for(int i=1;i<=n;i++)
		{
			f[i][j]=f[f[i][j-1]][j-1];
		}
	}
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
	dfs(s,0);
	init(n);
	while(m--)
	{
		int u,v;
		cin>>u>>v;
		cout<<lca(u,v)<<'\n';
	}
	return 0;
}
