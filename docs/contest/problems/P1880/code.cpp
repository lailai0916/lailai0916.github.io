#include <bits/stdc++.h>
using namespace std;

const int N=205;
const int inf=0x3f3f3f3f;
int a[N],s[N][N];
int f1[N][N],f2[N][N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
		a[i]+=a[i-1];
	}
	for(int i=1;i<=n;i++)
	{
		s[i][i]=i;
		s[i+n][i+n]=i+n;
		a[i+n]=a[i]+a[n];
	}
	for(int i=n*2;i>=1;i--)
	{
		for(int j=i+1;j<=n*2;j++)
		{
			f2[i][j]=max(f2[i+1][j],f2[i][j-1])+a[j]-a[i-1];
			int tmp=inf,qwq;
			for(int k=s[i][j-1];k<=s[i+1][j];k++)
			{
				if(tmp>f1[i][k]+f1[k+1][j]+a[j]-a[i-1])
				{
					tmp=f1[i][k]+f1[k+1][j]+a[j]-a[i-1];
					qwq=k;
				}
			}
			f1[i][j]=tmp;
			s[i][j]=qwq;
		}
	}
	int mx=0,mn=inf;
	for(int i=1;i<=n;i++)
	{
		mn=min(mn,f1[i][i+n-1]);
		mx=max(mx,f2[i][i+n-1]);
	}
	cout<<mn<<'\n'<<mx<<'\n';
	return 0;
}
