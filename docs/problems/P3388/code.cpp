#include <bits/stdc++.h>
using namespace std;

const int N=20005;
vector<int> G[N];
int dfn[N],low[N];
int cnt=0,bcc_cnt=0;
stack<int> s;
int a[N];
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
					a[x]++;
					if(x==v)break;
				}
				a[u]++;
			}
		}
		else if(v!=fa)
		{
			low[u]=min(low[u],dfn[v]);
		}
	}
	if(fa==0&&son==0)a[u]++;
}
vector<int> ans;
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
	for(int i=1;i<=n;i++)
	{
		if(a[i]>1)ans.push_back(i);
	}
	cout<<ans.size()<<'\n';
	for(auto x:ans)cout<<x<<' ';
	return 0;
}
