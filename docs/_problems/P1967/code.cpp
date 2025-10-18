#include <bits/stdc++.h>
using namespace std;

const int N=20005;
struct Edge
{
	int u,v,w;
	bool operator<(const Edge &x) const{return w>x.w;}
};
vector<Edge> E;
vector<int> G[N];
int fa[N],val[N];
int find(int u){return u==fa[u]?u:fa[u]=find(fa[u]);}
int kruskal(int n)
{
	for(int i=1;i<=n<<1;i++)fa[i]=i;
	sort(E.begin(),E.end());
	int cnt=0,t=n;
	for(auto [u,v,w]:E)
	{
		if(cnt==n-1)break;
		int x=find(u),y=find(v);
		if(x==y)continue;
		fa[x]=fa[y]=++t;
		G[t].push_back(x);
		G[t].push_back(y);
		val[t]=w;
		cnt++;
	}
	return t;
}
int f[N],son[N],siz[N],dep[N],top[N];
void dfs1(int u)
{
	siz[u]=1;
	dep[u]=dep[f[u]]+1;
	for(auto v:G[u])
	{
		f[v]=u;
		dfs1(v);
		siz[u]+=siz[v];
		if(siz[v]>siz[son[u]])son[u]=v;
	}
}
void dfs2(int u,int t)
{
	top[u]=t;
	if(son[u])dfs2(son[u],t);
	for(auto v:G[u])
	{
		if(v==son[u])continue;
		dfs2(v,v);
	}
}
int lca(int u,int v)
{
	while(top[u]!=top[v])
	{
		if(dep[top[u]]<dep[top[v]])swap(u,v);
		u=f[top[u]];
	}
	return dep[u]<dep[v]?u:v;
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
		E.push_back({u,v,w});
	}
	n=kruskal(n);
	for(int i=1;i<=n;i++)
	{
		if(find(i)==i)
		{
			dfs1(i);
			dfs2(i,i);
		}
	}
	int q;
	cin>>q;
	while(q--)
	{
		int x,y;
		cin>>x>>y;
		cout<<(find(x)==find(y)?val[lca(x,y)]:-1)<<'\n';
	}
	return 0;
}
