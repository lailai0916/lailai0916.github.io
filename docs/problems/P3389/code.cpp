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
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		for(int j=1;j<=n+1;j++)
		{
			cin>>a[i][j];
		}
	}
	if(gauss(n)==0)
	{
		cout<<"No Solution"<<'\n';
		return 0;
	}
	for(int i=1;i<=n;i++)
	{
		cout<<fixed<<setprecision(2)<<a[i][n+1]<<'\n';
	}
	return 0;
}