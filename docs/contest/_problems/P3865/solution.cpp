#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=100005;
ll a[N][20];
void init(int n)
{
	for(int k=1;k<=__lg(n);k++)
	{
		for(int i=1;i<=n-(1<<k)+1;i++)
		{
			a[i][k]=max(a[i][k-1],a[i+(1<<(k-1))][k-1]);
		}
	}
}
ll query(int l,int r)
{
	int k=__lg(r-l+1);
	return max(a[l][k],a[r-(1<<k)+1][k]);
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i][0];
	}
	init(n);
	while(m--)
	{
		int l,r;
		cin>>l>>r;
		cout<<query(l,r)<<'\n';
	}
	return 0;
}