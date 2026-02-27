#include <bits/stdc++.h>
using namespace std;

const double eps=1e-8;
const int N=55;
double a[N][N];
int gauss(int n)
{
	int r,c;
	for(r=1,c=1;r<=n&&c<=n;r++,c++)
	{
		int t=r;
		for(int j=r+1;j<=n;j++)
		{
			if(fabs(a[j][c])>fabs(a[t][c]))t=j;
		}
		swap(a[r],a[t]);
		if(fabs(a[r][c])<eps)
		{
			r--;
			continue;
		}
		for(int j=r+1;j<=n;j++)
		{
			if(fabs(a[j][c])<eps)continue;
			double f=a[j][c]/a[r][c];
			for(int k=c;k<=n+1;k++)a[j][k]-=a[r][k]*f;
			a[j][c]=0;
		}
	}
	for(int i=r;i<=n;i++)
	{
		if(fabs(a[i][n+1])>eps)return -1;
	}
	if(r<=n)return n-r+1;
	for(int i=n;i>=1;i--)
	{
		for(int j=i+1;j<=n;j++)a[i][n+1]-=a[i][j]*a[j][0];
		a[i][0]=a[i][n+1]/a[i][i];
	}
	return 0;
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
	int ans=gauss(n);
	if(ans==-1){cout<<-1<<'\n';return 0;}
	if(ans>0){cout<<0<<'\n';return 0;}
	for(int i=1;i<=n;i++)
	{
		cout<<fixed<<setprecision(2)<<'x'<<i<<'='<<a[i][0]<<'\n';
	}
	return 0;
}
