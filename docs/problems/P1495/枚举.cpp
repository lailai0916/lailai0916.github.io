#include <bits/stdc++.h>
using namespace std;

using ll=long long;
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	ll ans=0,sum=1;
	while(n--)
	{
		ll a,b;
		cin>>a>>b;
		while(ans%a!=b)ans+=sum;
		sum*=a;
	}
	cout<<ans<<'\n';
	return 0;
}
