#include <bits/stdc++.h>
using namespace std;

const int N=10005;
vector<int> G[N];
int dep[N],w=0;
void dfs(int u,int fa)
{
	for(auto v:G[u])
	{
		if(v==fa)continue;
		dep[v]=dep[u]+1;
		if(dep[v]>dep[w])w=v;
		dfs(v,u);
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
	dfs(1,0);
	dep[w]=0;
	dfs(w,0);
	cout<<dep[w]<<'\n';
	return 0;
}
