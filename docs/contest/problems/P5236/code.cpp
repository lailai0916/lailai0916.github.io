#include <bits/stdc++.h>
using namespace std;

const int N=40005;
const int M=20005;
int head[N],to[M<<1],nxt[M<<1],ew[M<<1],ecnt=1;
int hh[N],tt[N<<1],nn[N<<1],ww[N<<1],cc;
int dfn[N],low[N],dep[N],fa[N][17],fw[N];
int s[N],clen[N],dist[N];
int n,m,q,tot,idx;
void add(int u,int v,int w)
{
	to[++ecnt]=v;
	ew[ecnt]=w;
	nxt[ecnt]=head[u];
	head[u]=ecnt;
}
void link(int u,int v,int w)
{
	tt[++cc]=v;
	ww[cc]=w;
	nn[cc]=hh[u];
	hh[u]=cc;
}
void build(int u,int v,int w)
{
	int len=w;
	for(int x=v;x!=u;x=fa[x][0])
	{
		s[x]=len;
		len+=fw[x];
	}
	tot++;
	clen[tot]=len;
	link(u,tot,0);
	for(int x=v;x!=u;x=fa[x][0])
	{
		link(tot,x,min(s[x],len-s[x]));
	}
}
void tarjan(int u,int pe)
{
	dfn[u]=low[u]=++idx;
	for(int i=head[u];i;i=nxt[i])
	{
		if((i^1)==pe)continue;
		int v=to[i];
		if(!dfn[v])
		{
			fa[v][0]=u;
			fw[v]=ew[i];
			tarjan(v,i);
			low[u]=min(low[u],low[v]);
			if(low[v]>dfn[u])link(u,v,ew[i]);
		}
		else low[u]=min(low[u],dfn[v]);
	}
	for(int i=head[u];i;i=nxt[i])
	{
		int v=to[i];
		if(fa[v][0]!=u&&dfn[v]>dfn[u])build(u,v,ew[i]);
	}
}
void dfs(int u,int f)
{
	dep[u]=dep[f]+1;
	fa[u][0]=f;
	for(int i=1;i<17;i++)fa[u][i]=fa[fa[u][i-1]][i-1];
	for(int i=hh[u];i;i=nn[i])
	{
		int v=tt[i];
		dist[v]=dist[u]+ww[i];
		dfs(v,u);
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>n>>m>>q;
	tot=n;
	for(int i=1;i<=m;i++)
	{
		int u,v,w;
		cin>>u>>v>>w;
		add(u,v,w);
		add(v,u,w);
	}
	for(int i=1;i<=n;i++)
	{
		if(!dfn[i])tarjan(i,0);
	}
	for(int i=1;i<=n;i++)
	{
		if(!dep[i])dfs(i,0);
	}
	while(q--)
	{
		int u,v;
		cin>>u>>v;
		int x=u,y=v;
		if(dep[x]<dep[y])swap(x,y);
		for(int i=16;i>=0;i--)
		{
			if(dep[fa[x][i]]>=dep[y])x=fa[x][i];
		}
		if(x==y)
		{
			cout<<abs(dist[u]-dist[v])<<'\n';
			continue;
		}
		for(int i=16;i>=0;i--)
		{
			if(fa[x][i]!=fa[y][i])
			{
				x=fa[x][i];
				y=fa[y][i];
			}
		}
		int p=fa[x][0];
		if(p<=n)
		{
			cout<<dist[u]+dist[v]-2*dist[p]<<'\n';
		}
		else
		{
			int d=abs(s[x]-s[y]);
			int on=min(d,clen[p]-d);
			cout<<dist[u]-dist[x]+dist[v]-dist[y]+on<<'\n';
		}
	}
	return 0;
}
