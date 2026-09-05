#include <bits/stdc++.h>
using namespace std;

const int N=500005;
vector<pair<int,int>> G[N];
int dfn[N],low[N],bccno[N];
int cnt=0,bcc_cnt=0;
stack<int> s;
void tarjan(int u,int k)
{
	low[u]=dfn[u]=++cnt;
	s.push(u);
	for(auto [v,i]:G[u])
	{
		if(!dfn[v])
		{
			tarjan(v,i);
			low[u]=min(low[u],low[v]);
		}
		else if(i!=k)
		{
			low[u]=min(low[u],dfn[v]);
		}
	}
	if(low[u]==dfn[u])
	{
		bcc_cnt++;
		while(1)
		{
			int x=s.top();
			s.pop();
			bccno[x]=bcc_cnt;
			if(x==u)break;
		}
	}
}
vector<int> ans[N];
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
		G[u].push_back({v,i});
		G[v].push_back({u,i});
	}
	for(int i=1;i<=n;i++)
	{
		if(!dfn[i])tarjan(i,-1);
	}
	for(int i=1;i<=n;i++)
	{
		ans[bccno[i]].push_back(i);
	}
	cout<<bcc_cnt<<'\n';
	for(int i=1;i<=bcc_cnt;i++)
	{
		cout<<ans[i].size()<<' ';
		for(auto x:ans[i])cout<<x<<' ';
		cout<<'\n';
	}
	return 0;
}
