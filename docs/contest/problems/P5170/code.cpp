#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int mod=998244353;
const ll i2=(mod+1)/2;
const ll i6=166374059;
struct node
{
	ll f,g,h;
};
node solve(ll a,ll b,ll c,ll n)
{
	ll an=a%mod,bn=b%mod,cn=c%mod,nn=n%mod;
	node res{0,0,0};
	if(!a)
	{
		ll m=b/c%mod;
		res.f=m*(nn+1)%mod;
		res.g=m*nn%mod*(nn+1)%mod*i2%mod;
		res.h=m*m%mod*(nn+1)%mod;
		return res;
	}
	ll s1=nn*(nn+1)%mod*i2%mod;
	ll s2=nn*(nn+1)%mod*(2*nn+1)%mod*i6%mod;
	if(a>=c||b>=c)
	{
		ll da=a/c%mod,db=b/c%mod;
		node t=solve(a%c,b%c,c,n);
		res.f=(t.f+da*s1+db*(nn+1))%mod;
		res.g=(t.g+da*s2+db*s1)%mod;
		res.h=(t.h+da*da%mod*s2+db*db%mod*(nn+1)+2*da%mod*db%mod*s1
			+2*da%mod*t.g+2*db%mod*t.f)%mod;
		return res;
	}
	ll m=((__int128)a*n+b)/c;
	ll mm=m%mod;
	node t=solve(c,c-b-1,a,m-1);
	res.f=((nn*mm-t.f)%mod+mod)%mod;
	res.g=((mm*nn%mod*(nn+1)-t.h-t.f)%mod+mod)%mod*i2%mod;
	res.h=((nn*mm%mod*(mm+1)-2*t.g-2*t.f-res.f)%mod+mod)%mod;
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int t;
	cin>>t;
	while(t--)
	{
		ll n,a,b,c;
		cin>>n>>a>>b>>c;
		node res=solve(a,b,c,n);
		cout<<res.f<<' '<<res.h<<' '<<res.g<<'\n';
	}
	return 0;
}
