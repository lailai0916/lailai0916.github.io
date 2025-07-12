#include <bits/stdc++.h>
using namespace std;

using ll=long long;
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int T;
	cin>>T;
	while(T--)
	{
		int n;
		cin>>n;
		ll ans=0;
		for(ll l=1,r;l<=n;l=r+1)
		{
			r=n/(n/l);
			ans+=(r-l+1)*(n/l);
		}
		cout<<ans<<'\n';
	}
	return 0;
}