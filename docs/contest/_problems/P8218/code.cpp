#include <bits/stdc++.h>
using namespace std;

const int N=100005;
int a[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
		a[i]+=a[i-1];
	}
	int m;
	cin>>m;
	while(m--)
	{
		int l,r;
		cin>>l>>r;
		cout<<a[r]-a[l-1]<<'\n';
	}
	return 0;
}
