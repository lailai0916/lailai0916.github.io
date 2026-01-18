#include <bits/stdc++.h>
using namespace std;

const int inf=0x3f3f3f3f;
const int N=105;
int a[N][N];
void init(int n)
{
	for(int i=1;i<=n;i++)
	{
		for(int j=1;j<=n;j++)
		{
			a[i][j]=i==j?0:inf;
		}
	}
}
void floyd(int n)
{
	for(int k=1;k<=n;k++)
	{
		for(int i=1;i<=n;i++)
		{
			for(int j=1;j<=n;j++)
			{
				a[i][j]=min(a[i][j],a[i][k]+a[k][j]);
			}
		}
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	init(n);
	while(m--)
	{
		int u,v,w;
		cin>>u>>v>>w;
		a[u][v]=min(a[u][v],w);
		a[v][u]=min(a[v][u],w);
	}
	floyd(n);
	for(int i=1;i<=n;i++)
	{
		for(int j=1;j<=n;j++)
		{
			cout<<a[i][j]<<' ';
		}
		cout<<'\n';
	}
	return 0;
}