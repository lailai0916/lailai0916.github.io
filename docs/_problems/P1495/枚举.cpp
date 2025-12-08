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
	for(int i=1;i<=n;i++)
	{
		ll a,b;
		cin>>a>>b;
		while(ans%a!=b)ans+=sum;
		sum*=a;
	}
	cout<<ans<<'\n';
	return 0;
}
