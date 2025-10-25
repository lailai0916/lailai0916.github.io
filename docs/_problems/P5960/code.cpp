#include <bits/stdc++.h>
using namespace std;

const int inf=0x3f3f3f3f;
const int N=5005;
vector<pair<int,int>> G[N];
int dis[N],cnt[N];
bool vis[N];
bool spfa(int s,int n)
{
	memset(dis,0x3f,sizeof dis);
	dis[s]=0;vis[s]=1;
	queue<int> q;
	q.push(s);
	while(!q.empty())
	{
		int u=q.front();
		q.pop();
		vis[u]=0;
		for(auto [v,w]:G[u])
		{
			if(dis[v]<=dis[u]+w)continue;
			dis[v]=dis[u]+w;
			cnt[v]=cnt[u]+1;
			if(cnt[v]>=n+1)return 0;
			if(!vis[v]){q.push(v);vis[v]=1;}
		}
	}
	return 1;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)G[0].push_back({i,0});
	while(m--)
	{
		int u,v,w;
		cin>>u>>v>>w;
		G[v].push_back({u,w});
	}
	if(!spfa(0,n))
	{
		cout<<"NO"<<'\n';
		return 0;
	}
	for(int i=1;i<=n;i++)
	{
		cout<<dis[i]<<' ';
	}
	return 0;
}
