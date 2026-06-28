#include <bits/stdc++.h>
using namespace std;

const int N=10005;
const int K=10000005;
struct edge
{
	int v,w;
};
vector<edge> G[N];
int n,m;
int qry[105];
bool ans[105];
bool vis[N],ok[K];
int siz[N],mx[N],rt,sum;
int dis[N],cnt;
int st[N],top;
void get_root(int u,int fa)
{
	siz[u]=1;
	mx[u]=0;
	for(auto e:G[u])
	{
		if(e.v==fa||vis[e.v])continue;
		get_root(e.v,u);
		siz[u]+=siz[e.v];
		mx[u]=max(mx[u],siz[e.v]);
	}
	mx[u]=max(mx[u],sum-siz[u]);
	if(mx[u]<mx[rt])rt=u;
}
void get_dis(int u,int fa,int d)
{
	if(d<K)
	{
		dis[++cnt]=d;
		st[++top]=d;
	}
	for(auto e:G[u])
	{
		if(e.v==fa||vis[e.v])continue;
		get_dis(e.v,u,d+e.w);
	}
}
void calc(int u)
{
	ok[0]=1;
	top=0;
	for(auto e:G[u])
	{
		if(vis[e.v])continue;
		cnt=0;
		get_dis(e.v,u,e.w);
		for(int i=1;i<=cnt;i++)
		{
			for(int j=1;j<=m;j++)
			{
				if(qry[j]>=dis[i]&&qry[j]-dis[i]<K&&ok[qry[j]-dis[i]])ans[j]=1;
			}
		}
		for(int i=1;i<=cnt;i++)
		{
			if(dis[i]<K)ok[dis[i]]=1;
		}
	}
	ok[0]=0;
	for(int i=1;i<=top;i++)ok[st[i]]=0;
}
void solve(int u)
{
	vis[u]=1;
	calc(u);
	for(auto e:G[u])
	{
		if(vis[e.v])continue;
		sum=siz[e.v];
		rt=0;
		get_root(e.v,u);
		solve(rt);
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>n>>m;
	for(int i=1;i<n;i++)
	{
		int u,v,w;
		cin>>u>>v>>w;
		G[u].push_back({v,w});
		G[v].push_back({u,w});
	}
	for(int i=1;i<=m;i++)cin>>qry[i];
	mx[0]=N;
	sum=n;
	rt=0;
	get_root(1,0);
	solve(rt);
	for(int i=1;i<=m;i++)cout<<(ans[i]?"AYE":"NAY")<<'\n';
	return 0;
}
