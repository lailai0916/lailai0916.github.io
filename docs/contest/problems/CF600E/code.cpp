#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=100005;
vector<int> G[N];
int n,col[N];
int siz[N],son[N];
int cnt[N],mx;
ll sum,ans[N];
void dfs1(int u,int fa)
{
	siz[u]=1;
	for(int v:G[u])
	{
		if(v==fa)continue;
		dfs1(v,u);
		siz[u]+=siz[v];
		if(siz[v]>siz[son[u]])son[u]=v;
	}
}
void upd(int u,int fa,int sk,int v)
{
	cnt[col[u]]+=v;
	if(cnt[col[u]]>mx)
	{
		mx=cnt[col[u]];
		sum=col[u];
	}
	else if(cnt[col[u]]==mx)
	{
		sum+=col[u];
	}
	for(int w:G[u])
	{
		if(w==fa||w==sk)continue;
		upd(w,u,sk,v);
	}
}
void dfs2(int u,int fa,bool keep)
{
	for(int v:G[u])
	{
		if(v==fa||v==son[u])continue;
		dfs2(v,u,0);
	}
	if(son[u])dfs2(son[u],u,1);
	upd(u,fa,son[u],1);
	ans[u]=sum;
	if(!keep)
	{
		upd(u,fa,0,-1);
		mx=0;
		sum=0;
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>n;
	for(int i=1;i<=n;i++)cin>>col[i];
	for(int i=1;i<n;i++)
	{
		int x,y;
		cin>>x>>y;
		G[x].push_back(y);
		G[y].push_back(x);
	}
	dfs1(1,0);
	dfs2(1,0,1);
	for(int i=1;i<=n;i++)cout<<ans[i]<<' ';
	return 0;
}
