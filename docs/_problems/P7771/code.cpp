#include <bits/stdc++.h>
using namespace std;

const int N=100005;
vector<int> G[N];
int a[N],in[N];
stack<int> ans;
void dfs(int u)
{
	while(a[u]<G[u].size())dfs(G[u][a[u]++]);
	ans.push(u);
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=m;i++)
	{
		int u,v;
		cin>>u>>v;
		G[u].push_back(v);
		in[v]++;
	}
	int s=0;
	for(int i=1;i<=n;i++)
	{
		sort(G[i].begin(),G[i].end());
		if(abs(int(G[i].size())-in[i])>1){cout<<"No"<<'\n';return 0;}
		if(G[i].size()<=in[i])continue;
		if(s){cout<<"No"<<'\n';return 0;}
		s=i;
	}
	dfs(s?s:1);
	if(ans.size()<=m){cout<<"No"<<'\n';return 0;}
	while(!ans.empty()){cout<<ans.top()<<' ';ans.pop();}
	return 0;
}
