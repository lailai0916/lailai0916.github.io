#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int mod=1e9+9;
const int N=20;
void fmt(ll *a,int n,int type)
{
	if(n==1)return;
	int mid=n>>1;
	ll *a0=a,*a1=a+mid;
	fmt(a0,mid,type);
	fmt(a1,mid,type);
	for(int i=0;i<mid;i++)a1[i]=(a1[i]+a0[i]*type+mod)%mod;
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
