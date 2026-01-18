#include <bits/stdc++.h>
using namespace std;

const int N=505;
vector<int> G[N<<1];
int a[N<<1];
bool vis[N<<1];
bool match(int u)
{
	for(auto v:G[u])
	{
		if(vis[v])continue;
		vis[v]=1;
		if(!a[v]||match(a[v]))
		{
			a[v]=u;
			return 1;
		}
	}
	return 0;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m,e;
	cin>>n>>m>>e;
	while(e--)
	{
		int u,v;
		cin>>u>>v;
		G[u].push_back(v+n);
	}
	int ans=0;
	for(int i=1;i<=n;i++)
	{
		for(int i=1;i<=n+m;i++)vis[i]=0;
		if(match(i))ans++;
	}
	cout<<ans<<'\n';
	return 0;
}
