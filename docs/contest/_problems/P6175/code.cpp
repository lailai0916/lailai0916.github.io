#include <bits/stdc++.h>
using namespace std;

const int inf=0x1f1f1f1f;
const int N=105;
int a[N][N],b[N][N];
int main()
{
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)
	{
		for(int j=1;j<=n;j++)
		{
			a[i][j]=b[i][j]=i==j?0:inf;
		}
	}
	while(m--)
	{
		int u,v,w;
		cin>>u>>v>>w;
		a[u][v]=b[u][v]=min(a[u][v],w);
		a[v][u]=b[v][u]=min(a[v][u],w);
	}
	int ans=inf;
	for(int k=1;k<=n;k++)
	{
		for(int i=1;i<k;i++)
		{
			for(int j=i+1;j<k;j++)
			{
				ans=min(ans,a[i][j]+b[i][k]+b[k][j]);
			}
		}
		for(int i=1;i<=n;i++)
		{
			for(int j=1;j<=n;j++)
			{
				a[i][j]=min(a[i][j],a[i][k]+a[k][j]);
			}
		}
	}
	if(ans==inf)cout<<"No solution."<<'\n';
	else cout<<ans<<'\n';
	return 0;
}
