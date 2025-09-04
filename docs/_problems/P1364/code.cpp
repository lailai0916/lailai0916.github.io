#include<bits/stdc++.h>
using namespace std;

const int inf=0x3f3f3f3f;
const int N=105;
int G[N][2];
int siz[N],f[N];
void dfs1(int u)
{
	for(auto v:G[u])
	{
		if(!v)continue;
		dfs1(v);
		siz[u]+=siz[v];
		f[1]+=siz[v];
	}
}
void dfs2(int u)
{
	for(auto v:G[u])
	{
		if(!v)continue;
		f[v]=f[u]-siz[v]*2+siz[1];
		dfs2(v);
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		cin>>siz[i]>>G[i][0]>>G[i][1];
	}
	dfs1(1);
	dfs2(1);
	int ans=inf;
	for(int i=1;i<=n;i++)
	{
		ans=min(ans,f[i]);
	}
	cout<<ans<<'\n';
	return 0;
}
