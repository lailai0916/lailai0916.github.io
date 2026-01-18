#include <bits/stdc++.h>
using namespace std;

using ll=long long;
tuple<ll,ll,ll> exgcd(ll a,ll b)
{
	if(!b)return {a,1,0};
	auto [g,x,y]=exgcd(b,a%b);
	return {g,y,x-a/b*y};
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	__int128 ans=0,sum=1;
	while(n--)
	{
		ll a,b;
		cin>>a>>b;
		auto [g,x,y]=exgcd(sum,a);
		ans-=(ans-b)/g*x*sum;
		sum*=a/g;
		ans=(ans%sum+sum)%sum;
	}
	cout<<ll(ans)<<'\n';
	return 0;
}
