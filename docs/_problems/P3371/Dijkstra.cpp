#include <bits/stdc++.h>
using namespace std;

const int inf=0x3f3f3f3f;
const int N=10005;
vector<pair<int,int>> G[N];
int dis[N];
bool vis[N];
void dijkstra(int s)
{
	memset(dis,0x3f,sizeof dis);
	priority_queue<pair<int,int>> q;
	q.push({dis[s]=0,s});
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
		cout<<(dis[i]!=inf?dis[i]:INT_MAX)<<' ';
	}
	return 0;
}
