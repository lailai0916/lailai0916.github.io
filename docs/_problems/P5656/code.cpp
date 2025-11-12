#include <bits/stdc++.h>
using namespace std;

using ll=long long;
tuple<ll,ll,ll> exgcd(ll a,ll b)
{
	if(b==0)return {a,1,0};
	auto [g,x,y]=exgcd(b,a%b);
	return {g,y,x-(a/b)*y};
}
int main()
{
	int T;
	cin>>T;
	while(T--)
	{
		ll a,b,c;
		cin>>a>>b>>c;
		auto [g,x,y]=exgcd(a,b);
		if(c%g){cout<<-1<<'\n';continue;}
		x*=c/g;y*=c/g;
		ll dx=b/g,dy=a/g;
		ll x_min=(x%dx+dx-1)%dx+1,y_min=(y%dy+dy-1)%dy+1,x_max=(c-b*y_min)/a,y_max=(c-a*x_min)/b;
		if(y_max>0)cout<<(x_max-x_min)/dx+1<<' '<<x_min<<' '<<y_min<<' '<<x_max<<' '<<y_max<<'\n';
		else cout<<x_min<<' '<<y_min<<'\n';
	}
	return 0;
}
