#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int inf=0x3f3f3f3f;
const int mod=1e9+7;
const int N=100005;
vector<pair<int,int>> G[N];
int dis[N];
bool vis[N];
void dijkstra(int s)
{
	memset(dis,0x3f,sizeof dis);
	dis[s]=0;
	priority_queue<pair<int,int>> q;
	q.push({0,s});
	while(!q.empty())
	{
		int u=q.top().second;
		q.pop();
		if(vis[u])continue;
		vis[u]=1;
		for(auto [v,w]:G[u])
		{
			if(dis[v]>dis[u]+w)
			{
				dis[v]=dis[u]+w;
				q.push({-dis[v],v});
			}
		}
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m,s;
	cin>>n>>m>>s;
	while(m--)
	{
		int u,v,w;
		cin>>u>>v>>w;
		G[u].push_back({v,w});
	}
	dijkstra(s);
	for(int i=1;i<=n;i++)
	{
		cout<<dis[i]<<' ';
	}
	return 0;
}