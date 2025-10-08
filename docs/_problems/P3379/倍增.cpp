#include <bits/stdc++.h>
using namespace std;

const int N=500005;
int a[N][25],dep[N];
vector<int> G[N];
bool vis[N];
void dfs(int u,int fa)
{
	a[u][0]=fa;
	for(int i=1;i<=20;i++)a[u][i]=a[a[u][i-1]][i-1];
	dep[u]=dep[fa]+1;
	for(auto v:G[u])if(v!=fa)dfs(v,u);
}
int lca(int u,int v)
{
	if(dep[u]<dep[v])swap(u,v);
	for(int i=20;i>=0;i--)
	{
		if(dep[a[u][i]]>=dep[v])u=a[u][i];
	}
	if(u==v)return u;
	for(int i=20;i>=0;i--)
	{
		if(a[u][i]!=a[v][i])
		{
			u=a[u][i];
			v=a[v][i];
		}
	}
	return a[u][0];
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
	while(m--)
	{
		int u,v;
		cin>>u>>v;
		cout<<lca(u,v)<<'\n';
	}
	return 0;
}
