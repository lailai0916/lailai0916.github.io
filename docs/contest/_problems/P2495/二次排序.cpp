#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=250005;
const int inf=0x3f3f3f3f;
vector<pair<int,int>> G[N];
int fa[N],dep[N],siz[N],son[N];
int top[N],dfn[N],dis[N];
int cnt=0;
void dfs1(int u)
{
	siz[u]=1;
	dep[u]=dep[fa[u]]+1;
	for(auto [v,w]:G[u])
	{
		if(v==fa[u])continue;
		fa[v]=u;
		dis[v]=min(dis[u],w);
		dfs1(v);
		siz[u]+=siz[v];
		if(siz[v]>siz[son[u]])son[u]=v;
	}
}
void dfs2(int u,int t)
{
	top[u]=t;
	dfn[u]=++cnt;
	if(son[u])dfs2(son[u],t);
	for(auto [v,w]:G[u])
	{
		if(v==fa[u]||v==son[u])continue;
		dfs2(v,v);
	}
}
int lca(int u,int v)
{
	while(top[u]!=top[v])
	{
		if(dep[top[u]]<dep[top[v]])swap(u,v);
		u=fa[top[u]];
	}
	return dep[u]<dep[v]?u:v;
}
vector<int> H[N];
int a[N<<1];
bool tag[N];
int build(int k)
{
	auto cmp=[](int u,int v){return dfn[u]<dfn[v];};
	sort(a+1,a+k+1,cmp);
	for(int i=1;i<k;i++)a[k+i]=lca(a[i],a[i+1]);
	a[k<<=1]=1;
	sort(a+1,a+k+1,cmp);
	k=unique(a+1,a+k+1)-a-1;
	for(int i=1;i<k;i++)H[lca(a[i],a[i+1])].push_back(a[i+1]);
	return k;
}
ll dfs(int u)
{
	ll res=0;
	for(auto v:H[u])
	{
		ll w=dis[v],t=dfs(v);
		res+=tag[v]?w:min(w,t);
	}
	H[u].clear();
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<n;i++)
	{
		int u,v,w;
		cin>>u>>v>>w;
		G[u].push_back({v,w});
		G[v].push_back({u,w});
	}
	dis[1]=inf;
	dfs1(1);
	dfs2(1,1);
	int m;
	cin>>m;
	while(m--)
	{
		int k;
		cin>>k;
		for(int i=1;i<=k;i++)
		{
			cin>>a[i];
			tag[a[i]]=1;
		}
		k=build(k);
		cout<<dfs(1)<<'\n';
		for(int i=1;i<=k;i++)tag[a[i]]=0;
	}
	return 0;
}
