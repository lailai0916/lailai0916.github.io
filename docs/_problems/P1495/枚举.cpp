#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=15;
ll a[N],b[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)cin>>a[i]>>b[i];
	ll ans=b[1],sum=a[1];
	for(int i=2;i<=n;i++)
	{
		while(ans%a[i]!=b[i])ans+=sum;
		sum*=a[i];
	}
	cout<<ans<<'\n';
	return 0;
}
