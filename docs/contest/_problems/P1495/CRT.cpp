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
	vector<pair<ll,ll>> a(n);
	__int128 sum=1;
	for(auto &[u,v]:a)
	{
		cin>>u>>v;
		sum*=u;
	}
	__int128 ans=0;
	for(auto [u,v]:a)
	{
		ll k=sum/u;
		auto [g,x,y]=exgcd(k,u);
		ans=(ans+k*x%sum*v%sum+sum)%sum;
	}
	cout<<ll(ans)<<'\n';
	return 0;
}
