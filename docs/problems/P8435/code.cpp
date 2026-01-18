#include <bits/stdc++.h>
using namespace std;

const int N=500005;
vector<int> G[N];
int dfn[N],low[N];
int cnt=0,bcc_cnt=0;
stack<int> s;
vector<int> ans[N];
void tarjan(int u,int fa)
{
	low[u]=dfn[u]=++cnt;
	s.push(u);
	int son=0;
	for(auto v:G[u])
	{
		if(!dfn[v])
		{
			son++;
			tarjan(v,u);
			low[u]=min(low[u],low[v]);
			if(low[v]>=dfn[u])
			{
				bcc_cnt++;
				while(1)
				{
					int x=s.top();
					s.pop();
					ans[bcc_cnt].push_back(x);
					if(x==v)break;
				}
				ans[bcc_cnt].push_back(u);
			}
		}
		else if(v!=fa)
		{
			low[u]=min(low[u],dfn[v]);
		}
	}
	if(fa==0&&son==0)ans[++bcc_cnt].push_back(u);
}
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
		G[v].push_back(u);
	}
	for(int i=1;i<=n;i++)
	{
		if(!dfn[i])tarjan(i,0);
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
