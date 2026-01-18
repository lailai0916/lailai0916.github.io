#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int mod=1e9+9;
const int N=20;
void fmt(ll *a,int n,int type)
{
	for(int i=1;i<n;i<<=1)
	{
		for(int j=0;j<n;j++)
		{
			if(i&j)a[j]=(a[j]+a[i^j]*type+mod)%mod;
		}
	}
}
ll a[N+1][1<<N],b[N+1][1<<N],c[N+1][1<<N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	int m=1<<n;
	for(int i=0;i<m;i++)
	{
		cin>>a[__builtin_popcount(i)][i];
	}
	for(int i=0;i<m;i++)
	{
		cin>>b[__builtin_popcount(i)][i];
	}
	for(int i=0;i<=n;i++)
	{
		fmt(a[i],m,1);
		fmt(b[i],m,1);
	}
	for(int i=0;i<=n;i++)
	{
		for(int j=0;j<=i;j++)
		{
			for(int k=0;k<m;k++)
			{
				c[i][k]=(c[i][k]+a[j][k]*b[i-j][k])%mod;
			}
		}
	}
	for(int i=0;i<=n;i++)
	{
		fmt(c[i],m,-1);
	}
	for(int i=0;i<m;i++)
	{
		cout<<c[__builtin_popcount(i)][i]<<' ';
	}
	return 0;
}
