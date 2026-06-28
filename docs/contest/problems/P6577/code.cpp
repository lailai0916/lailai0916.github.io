#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const ll inf=1e18;
const int N=505;
int n;
ll w[N][N],lx[N],ly[N],slack[N];
int matchy[N],pre[N];
bool visy[N];
void bfs(int s)
{
	for(int i=1;i<=n;i++)
	{
		slack[i]=inf;
		visy[i]=0;
		pre[i]=0;
	}
	int y=0;
	matchy[0]=s;
	do
	{
		int x=matchy[y],nxt=0;
		ll d=inf;
		visy[y]=1;
		for(int i=1;i<=n;i++)
		{
			if(visy[i])continue;
			ll t=lx[x]+ly[i]-w[x][i];
			if(t<slack[i])
			{
				slack[i]=t;
				pre[i]=y;
			}
			if(slack[i]<d)
			{
				d=slack[i];
				nxt=i;
			}
		}
		for(int i=0;i<=n;i++)
		{
			if(visy[i])
			{
				lx[matchy[i]]-=d;
				ly[i]+=d;
			}
			else slack[i]-=d;
		}
		y=nxt;
	}while(matchy[y]);
	while(y)
	{
		matchy[y]=matchy[pre[y]];
		y=pre[y];
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)
	{
		for(int j=1;j<=n;j++)w[i][j]=-inf;
	}
	for(int i=1;i<=m;i++)
	{
		int x,y;
		ll v;
		cin>>x>>y>>v;
		w[x][y]=v;
	}
	for(int i=1;i<=n;i++)
	{
		lx[i]=-inf;
		for(int j=1;j<=n;j++)lx[i]=max(lx[i],w[i][j]);
	}
	for(int i=1;i<=n;i++)bfs(i);
	ll ans=0;
	for(int i=1;i<=n;i++)ans+=w[matchy[i]][i];
	cout<<ans<<'\n';
	for(int i=1;i<=n;i++)cout<<matchy[i]<<' ';
	return 0;
}
