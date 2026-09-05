#include <bits/stdc++.h>
using namespace std;

const int N=6005;
vector<int> G[N];
int f[N][2];
void dfs(int u)
{
	for(auto v:G[u])
	{
		dfs(v);
		f[u][0]+=max(f[v][0],f[v][1]);
		f[u][1]+=f[v][0];
	}
}
bool t[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		cin>>f[i][1];
	}
	for(int i=1;i<n;i++)
	{
		int u,v;
		cin>>u>>v;
		G[v].push_back(u);
		t[u]=1;
	}
	int r;
	for(int i=1;i<=n;i++)
	{
		if(!t[i])r=i;
	}
	dfs(r);
	cout<<max(f[r][0],f[r][1])<<'\n';
	return 0;
}