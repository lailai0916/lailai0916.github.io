#include <bits/stdc++.h>
using namespace std;

const int N=5005;
const int M=100005;
const int inf=0x3f3f3f3f;
int head[N],to[M<<1],nxt[M<<1],cap[M<<1],cost[M<<1],tot=1;
int dis[N],pre[N],fl[N];
bool vis[N];
int s,t;
void add(int u,int v,int w,int c)
{
	to[++tot]=v;cap[tot]=w;cost[tot]=c;nxt[tot]=head[u];head[u]=tot;
	to[++tot]=u;cap[tot]=0;cost[tot]=-c;nxt[tot]=head[v];head[v]=tot;
}
bool spfa()
{
	memset(dis,0x3f,sizeof(dis));
	queue<int> q;
	q.push(s);
	dis[s]=0;
	fl[s]=inf;
	vis[s]=1;
	while(!q.empty())
	{
		int u=q.front();
		q.pop();
		vis[u]=0;
		for(int i=head[u];i;i=nxt[i])
		{
			int v=to[i];
			if(cap[i]&&dis[v]>dis[u]+cost[i])
			{
				dis[v]=dis[u]+cost[i];
				fl[v]=min(fl[u],cap[i]);
				pre[v]=i;
				if(!vis[v])
				{
					vis[v]=1;
					q.push(v);
				}
			}
		}
	}
	return dis[t]<inf;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m>>s>>t;
	for(int i=1;i<=m;i++)
	{
		int u,v,w,c;
		cin>>u>>v>>w>>c;
		add(u,v,w,c);
	}
	int mf=0;
	long long mc=0;
	while(spfa())
	{
		int f=fl[t];
		mf+=f;
		mc+=(long long)f*dis[t];
		for(int u=t;u!=s;u=to[pre[u]^1])
		{
			cap[pre[u]]-=f;
			cap[pre[u]^1]+=f;
		}
	}
	cout<<mf<<' '<<mc<<'\n';
	return 0;
}
