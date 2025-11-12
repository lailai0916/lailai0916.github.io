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
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	ll a,b;
	cin>>a>>b;
	auto [g,x,y]=exgcd(a,b);
	cout<<(x%b+b)%b<<'\n';
	return 0;
}
