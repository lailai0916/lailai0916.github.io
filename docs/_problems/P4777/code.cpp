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
ll exgcd(ll a,ll b,ll &x,ll &y)
{
	if(b==0){x=1;y=0;return a;}
	ll d=exgcd(b,a%b,y,x);
	y-=a/b*x;
	return d;
}
ll ai[N],mi[N];
ll excrt(int n)
{
	ll x,y;
	ll m1=mi[1],a1=ai[1];
	ll res=ai[1]%mi[1];
	for(int i=2;i<=n;i++)
	{
		ll a2=ai[i],m2=mi[i];
		ll a=m1,b=m2,c=(a2-a1%m2+m2)%m2;
		ll d=exgcd(a,b,x,y);
		if(c%d!=0)return -1;
		x=mul(x,c/d,b/d);
		res=a1+x*m1;
		m1=m2/d*m1;
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
	for(int i=1;i<=n;i++)
	{
		cin>>mi[i]>>ai[i];
	}
	cout<<excrt(n)<<'\n';
	return 0;
}
