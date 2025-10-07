#include <bits/stdc++.h>
using namespace std;

using ll=long long;
using uint=unsigned int;
const int N=500005;
vector<int> G[N];
int fa[N],son[N],siz[N],dep[N];
int top[N],dfn[N],rnk[N],out[N];
int cnt=0;
void dfs1(int u)
{
	siz[u]=1;
	dep[u]=dep[fa[u]]+1;
	for(auto v:G[u])
	{
		fa[v]=u;
		dfs1(v);
		siz[u]+=siz[v];
		if(siz[v]>siz[son[u]])son[u]=v;
	}
}
void dfs2(int u,int t)
{
	top[u]=t;
	dfn[u]=++cnt;
	rnk[cnt]=u;
	if(son[u])dfs2(son[u],t);
	for(auto v:G[u])
	{
		if(v==fa[u]||v==son[u])continue;
		dfs2(v,v);
	}
	out[u]=cnt;
}
int query(int u,int k)
{
	while(dep[u]-dep[top[u]]<k)
	{
		k-=dep[u]-dep[top[u]]+1;
		u=fa[top[u]];
	}
	return rnk[dfn[u]-k];
}
uint s;
inline uint get(uint x)
{
	x^=x<<13;
	x^=x>>17;
	x^=x<<5;
	return s=x; 
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,q;
	cin>>n>>q>>s;
	int r;
	for(int i=1;i<=n;i++)
	{
		int f;
		cin>>f;
		if(f==0){r=i;continue;}
		G[f].push_back(i);
	}
	dfs1(r);
	dfs2(r,r);
	ll ans=0,last=0;
	for(int i=1;i<=q;i++)
	{
		int x=(get(s)^last)%n+1,k=(get(s)^last)%dep[x];
		last=query(x,k);
		ans^=i*last;
	}
	cout<<ans<<'\n';
	return 0;
}
