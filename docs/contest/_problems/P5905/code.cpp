#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=3005;
const ll inf=0x3f3f3f3f3f3f3f3f;
vector<pair<int,int>> G[N];
ll h[N],dis[N];
int cnt[N];
bool vis[N];
bool spfa(int s,int n)
{
	memset(h,0x3f,sizeof h);
	h[s]=0;vis[s]=1;
	queue<int> q;
	q.push(s);
	while(!q.empty())
	{
		int u=q.front();
		q.pop();
		vis[u]=0;
		for(auto [v,w]:G[u])
		{
			if(h[v]<=h[u]+w)continue;
			h[v]=h[u]+w;
			cnt[v]=cnt[u]+1;
			if(cnt[v]>=n)return 0;
			if(!vis[v]){q.push(v);vis[v]=1;}
		}
	}
	return 1;
}
void dijkstra(int s)
{
	memset(dis,0x3f,sizeof dis);
	memset(vis,0,sizeof vis);
	priority_queue<pair<ll,int>> q;
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
	int n,m;
	cin>>n>>m;
	while(m--)
	{
		int u,v,w;
		cin>>u>>v>>w;
		G[u].push_back({v,w});
	}
	for(int i=1;i<=n;i++)G[0].push_back({i,0});
	if(!spfa(0,n+1))
	{
		cout<<-1<<'\n';
		return 0;
	}
	for(int u=1;u<=n;u++)for(auto &[v,w]:G[u])w+=h[u]-h[v];
	for(int i=1;i<=n;i++)
	{
		dijkstra(i);
		ll ans=0;
		for(int j=1;j<=n;j++)
		{
			ans+=j*(dis[j]==inf?1000000000ll:dis[j]+h[j]-h[i]);
		}
		cout<<ans<<'\n';
	}
	return 0;
}
