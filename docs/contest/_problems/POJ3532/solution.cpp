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
			if(fabs(a[t][i])<fabs(a[j][i]))t=j;
		}
		if(fabs(a[t][i])<eps)return 0;
		swap(a[i],a[t]);
		double tmp=a[i][i];
		for(int j=1;j<=n+1;j++)a[i][j]/=tmp;
		for(int j=1;j<=n;j++)
		{
			if(i==j)continue;
			tmp=a[j][i]/a[i][i];
			for(int k=1;k<=n+1;k++)
			{
				a[j][k]-=a[i][k]*tmp;
			}
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
		a[u][u]-=g;
		a[v][v]-=g;
		a[u][v]+=g;
		a[v][u]+=g;
	}
	for(int i=1;i<=n;i++)a[n][i]=(i==1);
	a[1][n+1]=1;
	gauss(n);
	cout<<fixed<<setprecision(2)<<a[n][n+1]<<'\n';
	return 0;
}