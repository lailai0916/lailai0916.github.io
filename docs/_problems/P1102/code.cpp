#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=200005;
int a[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,c;
	cin>>n>>c;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
	}
	sort(a+1,a+n+1);
	ll ans=0;
	int l=1,r=1;
	for(int i=1;i<=n;i++)
	{
		if(a[i]!=a[i-1])
		{
			l=r;
			while(a[l]<a[i]+c&&l<=n)l++;
			r=l;
			while(a[r]==a[i]+c&&r<=n)r++;
		}
		ans+=r-l;
	}
	cout<<ans<<'\n';
	return 0;
}
