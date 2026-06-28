#include <bits/stdc++.h>
using namespace std;

using ll=long long;
ll p,w;
struct cp
{
	ll x,y;
};
cp mul(cp a,cp b)
{
	cp c;
	c.x=((a.x*b.x%p+a.y*b.y%p*w)%p+p)%p;
	c.y=(a.x*b.y%p+a.y*b.x%p)%p;
	return c;
}
ll Pow(ll x,ll y)
{
	x%=p;
	ll res=1;
	while(y)
	{
		if(y&1)res=res*x%p;
		x=x*x%p;
		y>>=1;
	}
	return res;
}
cp Pow(cp x,ll y)
{
	cp res={1,0};
	while(y)
	{
		if(y&1)res=mul(res,x);
		x=mul(x,x);
		y>>=1;
	}
	return res;
}
ll cipolla(ll n)
{
	n%=p;
	if(n==0)return 0;
	if(Pow(n,(p-1)/2)!=1)return -1;
	mt19937 rng(time(0));
	ll a;
	while(1)
	{
		a=rng()%p;
		w=((a*a%p-n)%p+p)%p;
		if(Pow(w,(p-1)/2)==p-1)break;
	}
	cp res=Pow({a,1},(p+1)/2);
	return res.x;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int T;
	cin>>T;
	while(T--)
	{
		ll n;
		cin>>n>>p;
		ll x=cipolla(n);
		if(x==-1)cout<<"Hola!"<<'\n';
		else if(x==0)cout<<0<<'\n';
		else
		{
			ll y=p-x;
			if(x>y)swap(x,y);
			cout<<x<<' '<<y<<'\n';
		}
	}
	return 0;
}
