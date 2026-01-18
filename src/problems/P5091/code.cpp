#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int mod=1e9+7;
ll phi(ll n)
{
	ll res=n;
	for(ll i=2;i*i<=n;i++)
	{
		if(n%i==0)
		{
			res=res/i*(i-1);
			while(n%i==0)n/=i;
		}
	}
	if(n>1)res=res/n*(n-1);
	return res;
}
ll Pow(ll a,ll b,ll mod)
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
ll Mod(string s,ll mod)
{
	ll res=0,f=0;
	for(auto c:s)
	{
		res=res*10+(c-'0');
		if(res>=mod)f=1;
		res%=mod;
	}
	return res+mod*f;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	ll a,mod;
	string b;
	cin>>a>>mod>>b;
	cout<<Pow(a,Mod(b,phi(mod)),mod)<<'\n';
	return 0;
}
