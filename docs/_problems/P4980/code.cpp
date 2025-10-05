#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int inf=0x3f3f3f3f;
const int mod=1e9+7;
const int N=100005;
ll Pow(ll a,ll b)
{
	a%=mod;
	ll res=1;
	while(b)
	{
		if(b&1)res=res*a%mod;
		a=a*a%mod;
		b>>=1;
	}
	return res;
}
ll phi(ll n)
{
	ll res=1;
	for(int i=2;i*i<=n;i++)
	{
		if(n%i==0)
		{
			n/=i;
			res=res*(i-1);
			while(n%i==0)
			{
				n/=i;
				res*=i;
			}
		}
	}
	if(n>1)res*=(n-1);
	return res;
}
ll polya(ll n,ll m)
{
	ll sum=0;
	for(int i=1;i*i<=m;i++)
	{
		if(m%i==0)
		{
			sum=(sum+phi(i)*Pow(n,m/i-1)%mod)%mod;
			if(i*i!=n)sum=(sum+phi(n/i)*Pow(n,i-1)%mod)%mod;
		}
	}
	return sum;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int T;
	cin>>T;
	while(T--)
	{
		int n;
		cin>>n;
		cout<<polya(n,n)<<'\n';
	}
	return 0;
}
