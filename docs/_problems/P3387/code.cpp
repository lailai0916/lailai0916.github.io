#include <bits/stdc++.h>
using namespace std;

const int N=10005;
vector<int> G[N],H[N];
int dfn[N],low[N],scc[N];
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
		else if(!scc[v])
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
			scc[x]=scc_cnt;
			if(x==u)break;
		}
	}
}
int a[N],b[N],dp[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
	}
	while(m--)
	{
		int u,v;
		cin>>u>>v;
		G[u].push_back(v);
	}
	for(int i=1;i<=n;i++)
	{
		if(!dfn[i])tarjan(i);
	}
	for(int i=1;i<=n;i++)
	{
		b[scc[i]]+=a[i];
		for(auto j:G[i])
		{
			if(scc[i]!=scc[j])
			{
				H[scc[i]].push_back(scc[j]);
			}
		}
	}
	int ans=0;
	for(int i=1;i<=scc_cnt;i++)
	{
		dp[i]=b[i];
		for(auto j:H[i])
		{
			dp[i]=max(dp[i],dp[j]+b[i]);
		}
		ans=max(ans,dp[i]);
	}
	cout<<ans<<'\n';
	return 0;
}
