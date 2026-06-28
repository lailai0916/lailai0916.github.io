#include <bits/stdc++.h>
using namespace std;

const int N=3005;
const int M=10005;
const double eps=1e-10;
int to[M],nxt[M],head[N],tot;
double w[M];
double dis[N];
int cnt[N];
bool vis[N];
int n,m;

void add(int u,int v,double c)
{
	to[++tot]=v;
	w[tot]=c;
	nxt[tot]=head[u];
	head[u]=tot;
}

bool dfs(int u,double mid)
{
	vis[u]=1;
	for(int i=head[u];i;i=nxt[i])
	{
		int v=to[i];
		if(dis[u]+w[i]-mid<dis[v])
		{
			dis[v]=dis[u]+w[i]-mid;
			if(vis[v]||dfs(v,mid))
			{
				vis[u]=0;
				return 1;
			}
		}
	}
	vis[u]=0;
	return 0;
}

bool check(double mid)
{
	for(int i=1;i<=n;i++)
	{
		dis[i]=0;
		vis[i]=0;
	}
	for(int i=1;i<=n;i++)
		if(dfs(i,mid))return 1;
	return 0;
}

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>n>>m;
	for(int i=1;i<=m;i++)
	{
		int u,v;
		double c;
		cin>>u>>v>>c;
		add(u,v,c);
	}
	double l=-1e7,r=1e7;
	while(r-l>eps)
	{
		double mid=(l+r)/2;
		if(check(mid))r=mid;
		else l=mid;
	}
	cout<<fixed<<setprecision(8)<<l<<'\n';
	return 0;
}
