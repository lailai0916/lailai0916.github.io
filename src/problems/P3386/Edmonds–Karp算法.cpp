#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int inf=0x3f3f3f3f;
const int N=1005;
struct Edge
{
	int v,w,id;
};
vector<Edge> G[N];
int pre[N],fa[N],dis[N];
bool vis[N];
int s,t;
void add(int u,int v)
{
	int uid=G[u].size(),vid=G[v].size();
	G[u].push_back({v,1,vid});
	G[v].push_back({u,0,uid});
}
bool bfs()
{
	memset(vis,0,sizeof vis);
	queue<int> q;
	q.push(s);
	vis[s]=1;
	dis[s]=inf;
	while(!q.empty())
	{
		int u=q.front();
		q.pop();
		for(int i=0;i<G[u].size();i++)
		{
			auto [v,w,id]=G[u][i];
			if(!w||vis[v])continue;
			dis[v]=min(dis[u],w);
			pre[v]=i;
			fa[v]=u;
			q.push(v);
			vis[v]=1;
			if(v==t)return 1;
		}
	}
	return 0;
}
ll ans=0;
void update()
{
	for(int i=t;i!=s;i=fa[i])
	{
		G[fa[i]][pre[i]].w-=dis[t];
		G[i][G[fa[i]][pre[i]].id].w+=dis[t];
	}
	ans+=dis[t];
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m,e;
	cin>>n>>m>>e;
	s=n+m+1;t=n+m+2;
	for(int i=1;i<=n;i++)add(s,i);
	for(int i=n+1;i<=n+m;i++)add(i,t);
	while(e--)
	{
		int u,v;
		cin>>u>>v;
		v+=n;
		add(u,v);
	}
	while(bfs())update();
	cout<<ans<<'\n';
	return 0;
}
