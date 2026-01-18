#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int inf=0x3f3f3f3f;
const int mod=998244353;
const int N=2005;
ll x[N],y[N];
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
ll lagrange(int n,int k)
{
	ll ans=0;
	for(int i=1;i<=n;i++)
	{
		ll p=1,q=1;
		for(int j=1;j<=n;j++)
		{
			if(i==j)continue;
			p=p*(k-x[j])%mod;
			q=q*(x[i]-x[j])%mod;
		}
		ans=(ans+y[i]*(p*Pow(q,mod-2)%mod)%mod)%mod;
	}
	return (ans+mod)%mod;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,k;
	cin>>n>>k;
	for(int i=1;i<=n;i++)
	{
		cin>>x[i]>>y[i];
	}
	cout<<lagrange(n,k)<<'\n';
	return 0;
}