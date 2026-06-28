#include <bits/stdc++.h>
using namespace std;

const int N=1005;
vector<int> G[N];
int n,m,match[N],pre[N],fa[N],typ[N],vis[N],tic;
queue<int> q;
int find(int x)
{
	return fa[x]==x?x:fa[x]=find(fa[x]);
}
int lca(int u,int v)
{
	tic++;
	u=find(u);
	v=find(v);
	while(vis[u]!=tic)
	{
		vis[u]=tic;
		u=find(pre[match[u]]);
		if(v)swap(u,v);
	}
	return u;
}
void blossom(int u,int v,int p)
{
	while(find(u)!=p)
	{
		pre[u]=v;
		v=match[u];
		if(typ[v]==1)
		{
			typ[v]=0;
			q.push(v);
		}
		if(find(u)==u)fa[u]=p;
		if(find(v)==v)fa[v]=p;
		u=pre[v];
	}
}
bool augment(int s)
{
	for(int i=1;i<=n;i++)
	{
		fa[i]=i;
		typ[i]=-1;
		pre[i]=0;
	}
	while(!q.empty())q.pop();
	q.push(s);
	typ[s]=0;
	while(!q.empty())
	{
		int u=q.front();
		q.pop();
		for(int v:G[u])
		{
			if(typ[v]==-1)
			{
				pre[v]=u;
				typ[v]=1;
				if(!match[v])
				{
					for(int x=v,y=u,z;y;x=z,y=pre[x])
					{
						z=match[y];
						match[y]=x;
						match[x]=y;
					}
					return 1;
				}
				typ[match[v]]=0;
				q.push(match[v]);
			}
			else if(!typ[v]&&find(u)!=find(v))
			{
				int p=lca(u,v);
				blossom(u,v,p);
				blossom(v,u,p);
			}
		}
	}
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
		cin>>u>>v;
		G[u].push_back(v);
		G[v].push_back(u);
	}
	int ans=0;
	for(int i=1;i<=n;i++)
	{
		if(!match[i]&&augment(i))ans++;
	}
	cout<<ans<<'\n';
	for(int i=1;i<=n;i++)cout<<match[i]<<' ';
	cout<<'\n';
	return 0;
}
