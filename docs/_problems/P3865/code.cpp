#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=100005;
ll a[N][25];
void init(int n)
{
	for(int j=1;j<=__lg(n);j++)
	{
		for(int i=1;i<=n-(1<<j)+1;i++)
		{
			a[i][j]=max(a[i][j-1],a[i+(1<<(j-1))][j-1]);
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
	for(int i=1;i<=n;i++)cin>>a[i][0];
	init(n);
	while(m--)
	{
		int l,r;
		cin>>l>>r;
		cout<<query(l,r)<<'\n';
	}
	return 0;
}
