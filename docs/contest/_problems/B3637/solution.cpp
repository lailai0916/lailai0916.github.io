#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int inf=0x3f3f3f3f;
const int N=5005;
int a[N],b[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)cin>>a[i];
	for(int i=1;i<=n;i++)b[i]=inf;
	int ans=0;
	for(int i=1;i<=n;i++)
	{
		int k=lower_bound(b+1,b+n+1,a[i])-b;
		b[k]=a[i];
		ans=max(ans,k);
	}
	cout<<ans<<'\n';
	return 0;
}