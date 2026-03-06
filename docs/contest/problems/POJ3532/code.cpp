#include <bits/stdc++.h>
using namespace std;

const double eps=1e-8;
const int N=105;
double a[N][N];
bool gauss(int n)
{
	for(int i=1;i<=n;i++)
	{
		int t=i;
		for(int j=i+1;j<=n;j++)
		{
			if(fabs(a[j][i])>fabs(a[t][i]))t=j;
		}
		if(fabs(a[t][i])<eps)return 0;
		swap(a[i],a[t]);
		for(int j=n+1;j>=i;j--)a[i][j]/=a[i][i];
		for(int j=1;j<=n;j++)
		{
			if(i==j)continue;
			for(int k=n+1;k>i;k--)a[j][k]-=a[i][k]*a[j][i];
		}
	}
	return 1;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	while(m--)
	{
		int u,v;
		double r;
		cin>>u>>v>>r;
		double g=1/r;
		a[u][u]+=g;
		a[u][v]-=g;
		a[v][v]+=g;
		a[v][u]-=g;
	}
	a[1][n+1]=1;
	a[n][n+1]=-1;
	for(int i=1;i<=n+1;i++)a[n][i]=0;
	a[n][n]=1;
	a[n][n+1]=0;
	gauss(n);
	cout<<fixed<<setprecision(2)<<a[1][n+1]<<'\n';
	return 0;
}
