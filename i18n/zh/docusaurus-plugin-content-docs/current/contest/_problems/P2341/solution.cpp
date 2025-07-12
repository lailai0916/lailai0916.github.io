#include <bits/stdc++.h>
using namespace std;

const int N=10005;
vector<int> G[N];
int dfn[N],low[N],sccno[N];
int cnt=0,scc_cnt=0;
stack<int> s;
void tarjan(int u)
{
	low[u]=dfn[u]=++cnt;
	s.push(u);
	for(auto v:G[u])
	{
		if(!dfn[v])
		{
			tarjan(v);
			low[u]=min(low[u],low[v]);
		}
		else if(!sccno[v])
		{
			low[u]=min(low[u],dfn[v]);
		}
	}
	if(low[u]==dfn[u])
	{
		scc_cnt++;
		while(1)
		{
			int x=s.top();
			s.pop();
			sccno[x]=scc_cnt;
			if(x==u)break;
		}
	}
}
vector<pair<int,int>> E;
int deg[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	while(m--)
	{
		int u,v;
		cin>>u>>v;
		G[u].push_back(v);
		E.push_back({u,v});
	}
	for(int i=1;i<=n;i++)
	{
		if(!dfn[i])tarjan(i);
	}
	for(auto [u,v]:E)
	{
		if(sccno[u]!=sccno[v])deg[sccno[u]]++;
	}
	int k=0;
	for(int i=1;i<=scc_cnt;i++)
	{
		if(!deg[i])
		{
			if(k)
			{
				cout<<0<<'\n';
				return 0;
			}
			k=i;
		}
	}
	int ans=0;
	for(int i=1;i<=n;i++)
	{
		if(sccno[i]==k)ans++;
	}
	cout<<ans<<'\n';
	return 0;
}