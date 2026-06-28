#include <bits/stdc++.h>
using namespace std;

const int inf=0x3f3f3f3f;
const int N=1405;
const int M=700005;
int head[N],to[M],nxt[M],cap[M],ecnt;
int cur[N],lev[N],ex[N];
int TT;
void init(int tot)
{
	for(int i=0;i<=tot;i++)head[i]=-1;
	ecnt=0;
}
void add(int u,int v,int c)
{
	to[ecnt]=v;cap[ecnt]=c;nxt[ecnt]=head[u];head[u]=ecnt++;
	to[ecnt]=u;cap[ecnt]=0;nxt[ecnt]=head[v];head[v]=ecnt++;
}
void addb(int u,int v,int lo,int hi)
{
	add(u,v,hi-lo);
	ex[v]+=lo;
	ex[u]-=lo;
}
bool bfs(int s,int t)
{
	for(int i=0;i<=TT;i++)lev[i]=-1;
	queue<int> q;
	q.push(s);
	lev[s]=0;
	while(!q.empty())
	{
		int u=q.front();
		q.pop();
		for(int i=head[u];~i;i=nxt[i])
		{
			int v=to[i];
			if(cap[i]>0&&lev[v]<0)
			{
				lev[v]=lev[u]+1;
				q.push(v);
			}
		}
	}
	return lev[t]>=0;
}
int dfs(int u,int t,int f)
{
	if(u==t)return f;
	int res=0;
	for(int &i=cur[u];~i;i=nxt[i])
	{
		int v=to[i];
		if(cap[i]>0&&lev[v]==lev[u]+1)
		{
			int d=dfs(v,t,min(f-res,cap[i]));
			cap[i]-=d;
			cap[i^1]+=d;
			res+=d;
			if(res==f)return res;
		}
	}
	if(!res)lev[u]=-1;
	return res;
}
int dinic(int s,int t)
{
	int flow=0;
	while(bfs(s,t))
	{
		for(int i=0;i<=TT;i++)cur[i]=head[i];
		flow+=dfs(s,t,inf);
	}
	return flow;
}
int main()
{
	int n,m,S,T,SS;
	bool first=true;
	while(cin>>n>>m)
	{
		S=n+m+1;
		T=n+m+2;
		SS=n+m+3;
		TT=n+m+4;
		init(TT);
		for(int i=0;i<=TT;i++)ex[i]=0;
		for(int x=1;x<=m;x++)
		{
			int g;
			cin>>g;
			addb(x,T,g,inf);
		}
		for(int i=1;i<=n;i++)
		{
			int c,d;
			cin>>c>>d;
			int day=m+i;
			addb(S,day,0,d);
			while(c--)
			{
				int tt,l,r;
				cin>>tt>>l>>r;
				addb(day,tt+1,l,r);
			}
		}
		add(T,S,inf);
		int back=ecnt-2;
		int need=0;
		for(int i=1;i<=T;i++)
		{
			if(ex[i]>0)
			{
				add(SS,i,ex[i]);
				need+=ex[i];
			}
			else if(ex[i]<0)add(i,TT,-ex[i]);
		}
		int f=dinic(SS,TT);
		if(!first)cout<<'\n';
		first=false;
		if(f<need)
		{
			cout<<-1<<'\n';
			continue;
		}
		for(int i=head[SS];~i;i=nxt[i])
		{
			cap[i]=0;
			cap[i^1]=0;
		}
		for(int i=head[TT];~i;i=nxt[i])
		{
			cap[i]=0;
			cap[i^1]=0;
		}
		int ans=cap[back^1];
		cap[back]=0;
		cap[back^1]=0;
		ans+=dinic(S,T);
		cout<<ans<<'\n';
	}
	return 0;
}
