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
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	ll a,b,x,y;
	cin>>a>>b;
	exgcd(a,b,x,y);
	cout<<(x%b+b)%b<<'\n';
	return 0;
}