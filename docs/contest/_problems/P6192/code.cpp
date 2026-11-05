#include <bits/stdc++.h>
using namespace std;

const int N=105;
const int inf=0x3f3f3f3f;
int dis[N][N],f[1<<9][N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m,cnt;
	cin>>n>>m>>cnt;
	memset(dis,0x3f,sizeof dis);
	for(int i=1;i<=n;i++)dis[i][i]=0;
	for(int i=1;i<=m;i++)
	{
		int u,v,w;
		cin>>u>>v>>w;
		dis[u][v]=dis[v][u]=min(dis[u][v],w);
	}
	int lim=1<<cnt-1;
	for(int i=1;i<lim;i++)fill(f[i]+1,f[i]+n+1,inf);
	for(int i=0;i<cnt-1;i++)
	{
		int u;
		cin>>u;
		f[1<<i][u]=0;
	}
	int rt;
	cin>>rt;
	for(int i=1;i<=n;i++)
	{
		for(int j=1;j<=n;j++)
		{
			for(int k=1;k<=n;k++)dis[j][k]=min(dis[j][k],dis[j][i]+dis[i][k]);
		}
	}
	for(int i=1;i<lim;i++)
	{
		int p=i&(i-1);
		for(int j=p;j;j=(j-1)&p)
		{
			for(int k=1;k<=n;k++)f[i][k]=min(f[i][k],f[j][k]+f[i^j][k]);
		}
		for(int j=1;j<=n;j++)
		{
			for(int k=1;k<=n;k++)f[i][k]=min(f[i][k],f[i][j]+dis[j][k]);
		}
	}
	cout<<f[lim-1][rt]<<'\n';
	return 0;
}
