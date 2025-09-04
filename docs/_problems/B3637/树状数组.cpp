#include <bits/stdc++.h>
using namespace std;

const int N=1000005;
int a[N],c[N];
void update(int u,int v)
{
	while(u<N)
	{
		c[u]=max(c[u],v);
		u+=u&-u;
	}
}
int query(int u)
{
	int res=0;
	while(u)
	{
		res=max(res,c[u]);
		u-=u&-u;
	}
	return res;
}
int main()
{
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
	}
	int ans=0;
	for(int i=1;i<=n;i++)
	{
		int k=query(a[i]-1)+1;
		update(a[i],k);
		ans=max(ans,k);
	}
	cout<<ans<<'\n';
	return 0;
}
