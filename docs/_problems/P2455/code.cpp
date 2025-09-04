#include <bits/stdc++.h>
using namespace std;

const double eps=1e-8;
const int N=55;
double a[N][N],x[N];
int sgn(double x){return (x>eps)-(x<-eps);}
int gauss(int n)
{
	int r,c;
	for(r=1,c=1;r<=n&&c<=n;r++,c++)
	{
		int x=r;
		for(int j=r+1;j<=n;j++)
		{
			if(fabs(a[x][c])<fabs(a[j][c]))x=j;
		}
		swap(a[r],a[x]);
		if(sgn(a[r][c])==0)
		{
			r--;
			continue;
		}
		for(int j=r+1;j<=n;j++)
		{
			if(sgn(a[j][c])==0)continue;
			double tmp=a[j][c]/a[r][c];
			for(int k=c;k<=n+1;k++)
			{
				a[j][k]-=a[r][k]*tmp;
			}
			a[j][c]=0;
		}
	}
	for(int i=r;i<=n;i++)
	{
		if(sgn(a[i][c])!=0)return -1;
	}
	if(r<=n)return n-r+1;
	for(int i=n;i>=1;i--)
	{
		for(int j=i+1;j<=n;j++)
		{
			a[i][n+1]-=a[i][j]*x[j];
		}
		x[i]=a[i][n+1]/a[i][i];
	}
	return 0;
}
int main()
{
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
	if(ans==-1)cout<<-1<<'\n';
	else if(ans>0)cout<<0<<'\n';
	else
	{
		for(int i=1;i<=n;i++)
		{
			cout<<fixed<<setprecision(2)<<'x'<<i<<'='<<x[i]<<'\n';
		}
	}
	return 0;
}