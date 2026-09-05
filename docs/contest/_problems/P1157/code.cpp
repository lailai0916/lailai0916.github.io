#include <bits/stdc++.h>
using namespace std;

const int N=25;
int a[N];
void dfs(int u,int n,int r)
{
	if(u>r)
	{
		for(int i=1;i<=r;i++)
		{
			cout<<setw(3)<<a[i];
		}
		cout<<'\n';
		return;
	}
	for(int i=a[u-1]+1;i<=n;i++)
	{
		a[u]=i;
		dfs(u+1,n,r);
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,r;
	cin>>n>>r;
	dfs(1,n,r);
	return 0;
}
