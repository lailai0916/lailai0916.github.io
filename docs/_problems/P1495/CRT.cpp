#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=15;
ll a[N],b[N];
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
	__int128 sum=1;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i]>>b[i];
		sum*=a[i];
	}
	__int128 ans=0;
	for(int i=1;i<=n;i++)
	{
		ll k=sum/a[i];
		auto [g,x,y]=exgcd(k,a[i]);
		ans=(ans+k*x%sum*b[i]%sum+sum)%sum;
	}
	cout<<ll(ans)<<'\n';
	return 0;
}
