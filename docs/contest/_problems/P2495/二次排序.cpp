#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=250005;
const ll inf=0x3f3f3f3f3f3f3f3f;
vector<pair<int,ll>> G[N];
int fa[N],dep[N],siz[N],son[N];
int top[N],dfn[N],rnk[N],out[N];
int cnt=0;
ll dis[N];
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
void dfs2(int u,int e)
{
	top[u]=e;
	dfn[u]=++cnt;
	rnk[cnt]=u;
	if(son[u])dfs2(son[u],e);
	for(auto [v,w]:G[u])
	{
		if(v==fa[u]||v==son[u])continue;
		dfs2(v,v);
	}
	out[u]=cnt;
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
bool cmp(int u,int v)
{
	return dfn[u]<dfn[v];
}
vector<pair<int,ll>> H[N];
int h[N<<1];
bool tag[N];
ll dp(int u,int fa)
{
	ll res=0;
	for(auto [v,w]:H[u])
	{
		if(v==fa)continue;
		ll t=dp(v,u);
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
		int u,v;
		ll w;
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
			cin>>h[i];
			tag[h[i]]=1;
		}
		sort(h+1,h+k+1,cmp);
		for(int i=1;i<k;i++)
		{
			h[k+i]=lca(h[i],h[i+1]);
		}
		h[k<<=1]=1;
		sort(h+1,h+k+1,cmp);
		k=unique(h+1,h+k+1)-h-1;
		for(int i=1;i<k;i++)
		{
			int u=lca(h[i],h[i+1]),v=h[i+1];
			ll w=min(dis[u],dis[v]);
			H[u].push_back({v,w});
			H[v].push_back({u,w});
		}
		cout<<dp(1,1)<<'\n';
		for(int i=1;i<=k;i++)tag[h[i]]=0;
	}
	return 0;
}
