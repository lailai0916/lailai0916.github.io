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
	}
	sort(a+1,a+n+1);
	for(int i=1;i<=n;i++)
	{
		cout<<a[i]<<' ';
	}
	return 0;
}