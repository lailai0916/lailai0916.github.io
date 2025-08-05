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
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
	}
	while(m--)
	{
		int q;
		cin>>q;
		int k=lower_bound(a+1,a+n+1,q)-a;
		cout<<(a[k]==q?k:-1)<<' ';
	}
	return 0;
}
