#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=100005;
ll mul(ll a,ll b,ll m)
{
	ll res=0;
	while(b)
	{
		if(b&1)res=(res+a)%m;
		a=(a+a)%m;
		b>>=1;
	}
	return res;
}
tuple<ll,ll,ll> exgcd(ll a,ll b)
{
	if(b==0)return {a,1,0};
	auto [g,x,y]=exgcd(b,a%b);
	return {g,y,x-a/b*y};
}
ll ai[N],mi[N];
ll excrt(int n)
{
	ll m1=mi[1],a1=ai[1];
	ll res=ai[1]%mi[1];
	for(int i=2;i<=n;i++)
	{
		ll a2=ai[i],m2=mi[i];
		ll a=m1,b=m2,c=(a2-a1%m2+m2)%m2;
		auto [g,x,y]=exgcd(a,b);
		if(c%g)return -1;
		x=mul(x,c/g,b/g);
		res=a1+x*m1;
		m1=m2/g*m1;
		res=(res%m1+m1)%m1;
		a1=res;
	}
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)cin>>mi[i]>>ai[i];
	cout<<excrt(n)<<'\n';
	return 0;
}
