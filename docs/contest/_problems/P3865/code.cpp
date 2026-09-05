#include <bits/stdc++.h>
using namespace std;

const int N=100005;
int a[20][N];
void init(int n)
{
	for(int i=1;i<=__lg(n);i++)
	{
		for(int j=1;j<=n-(1<<i)+1;j++)
		{
			a[i][j]=max(a[i-1][j],a[i-1][j+(1<<(i-1))]);
		}
	}
}
int query(int l,int r)
{
	int k=__lg(r-l+1);
	return max(a[k][l],a[k][r-(1<<k)+1]);
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)cin>>a[0][i];
	init(n);
	while(m--)
	{
		int l,r;
		cin>>l>>r;
		cout<<query(l,r)<<'\n';
	}
	return 0;
}
