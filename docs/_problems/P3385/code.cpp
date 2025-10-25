#include <bits/stdc++.h>
using namespace std;

const int N=2005;
vector<pair<int,int>> G[N];
int dis[N],cnt[N];
bool vis[N];
bool spfa(int s,int n)
{
	memset(dis,0x3f,sizeof dis);
	memset(cnt,0,sizeof cnt);
	memset(vis,0,sizeof vis);
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
			if(cnt[v]>=n)return 0;
			if(!vis[v]){q.push(v);vis[v]=1;}
		}
	}
	return 1;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int T;
	cin>>T;
	while(T--)
	{
		int n,m;
		cin>>n>>m;
		while(m--)
		{
			int u,v,w;
			cin>>u>>v>>w;
			G[u].push_back({v,w});
			if(w>=0)G[v].push_back({u,w});
		}
		cout<<(spfa(1,n)?"NO":"YES")<<'\n';
		for(int i=1;i<=n;i++)G[i].clear();
	}
	return 0;
}
