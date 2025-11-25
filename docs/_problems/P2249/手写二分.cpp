#include <bits/stdc++.h>
using namespace std;

const int N=1000005;
int a[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)cin>>a[i];
	while(m--)
	{
		int q;
		cin>>q;
		int l=1,r=n+1;
		while(l<r)
		{
			int mid=l+r>>1;
			if(a[mid]>=q)r=mid;
			else l=mid+1;
		}
		cout<<(l<n&&a[l]==q?l:-1)<<' ';
	}
	return 0;
}
