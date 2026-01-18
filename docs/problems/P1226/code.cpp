#include <bits/stdc++.h>
using namespace std;

using ll=long long;
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
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	ll a,b,mod;
	cin>>a>>b>>mod;
	cout<<a<<'^'<<b<<" mod "<<mod<<'='<<Pow(a,b,mod)<<'\n';
	return 0;
}
