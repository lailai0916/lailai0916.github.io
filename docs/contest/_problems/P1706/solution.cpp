#include <bits/stdc++.h>
using namespace std;

const int N=15;
int a[N];
bool vis[N];
void dfs(int s,int n)
{
	if(s>n)
	{
		for(int i=1;i<=n;i++)
		{
			cout<<setw(5)<<a[i];
		}
		cout<<'\n';
		return;
	}
	for(int i=1;i<=n;i++)
	{
		if(!vis[i])
		{
			a[s]=i;
			vis[i]=1;
			dfs(s+1,n);
			vis[i]=0;
		}
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	dfs(1,n);
	return 0;
}