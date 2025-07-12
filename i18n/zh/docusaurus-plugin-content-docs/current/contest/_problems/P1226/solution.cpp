#include <bits/stdc++.h>
using namespace std;

using ll=long long;
int mod;
ll Pow(ll x,ll y)
{
	x%=mod;
	ll res=1;
	while(y)
	{
		if(y&1)res=res*x%mod;
		x=x*x%mod;
		y>>=1;
	}
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	ll a,b;
	cin>>a>>b>>mod;
	cout<<a<<'^'<<b<<" mod "<<mod<<'='<<Pow(a,b)<<'\n';
	return 0;
}