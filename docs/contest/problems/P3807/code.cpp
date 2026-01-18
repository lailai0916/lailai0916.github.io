#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=100005;
int mod;
ll inv[N],fac[N],jv[N];
void init()
{
	fac[0]=jv[0]=1;
	for(int i=1;i<N;i++)
	{
		inv[i]=i==1?1:(mod-mod/i)*inv[mod%i]%mod;
		fac[i]=fac[i-1]*i%mod;
		jv[i]=jv[i-1]*inv[i]%mod;
	}
}
ll C(ll n,ll m)
{
	if(n<m||m<0)return 0;
	return fac[n]*jv[n-m]%mod*jv[m]%mod;
}
ll lucas(ll n,ll m)
{
	if(m==0)return 1;
	return C(n%mod,m%mod)*lucas(n/mod,m/mod)%mod;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int T;
	cin>>T;
	while(T--)
	{
		int n,m;
		cin>>n>>m>>mod;
		init();
		cout<<lucas(n+m,n)<<'\n';
	}
	return 0;
}
