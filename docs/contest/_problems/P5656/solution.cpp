#include <bits/stdc++.h>
using namespace std;

using ll=long long;
ll exgcd(ll a,ll b,ll &x,ll &y)
{
	if(b==0){x=1;y=0;return a;}
	ll d=exgcd(b,a%b,y,x);
	y-=a/b*x;
	return d;
}
int main()
{
	int T;
	cin>>T;
	while(T--)
	{
		ll a,b,c,x,y;
		cin>>a>>b>>c;
		ll d=exgcd(a,b,x,y);
		if(c%d){cout<<"-1"<<'\n';continue;}
		x*=c/d;y*=c/d;
		ll x1=b/d,y1=a/d;
		ll x_min=(x%x1+x1-1)%x1+1,y_min=(y%y1+y1-1)%y1+1;
		ll x_max=(c-b*y_min)/a,y_max=(c-a*x_min)/b;
		if(y_max<=0)cout<<x_min<<' '<<y_min<<'\n';
		else cout<<(x_max-x_min)/x1+1<<' '<<x_min<<' '<<y_min<<' '<<x_max<<' '<<y_max<<'\n';
	}
	return 0;
}