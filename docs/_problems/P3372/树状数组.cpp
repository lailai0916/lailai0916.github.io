#include <bits/stdc++.h>
using namespace std;

const int N=500005;
int c[N];
void add(int u,int v)
{
	while(u<N)
	{
		c[u]+=v;
		u+=u&-u;
	}
}
int sum(int u)
{
	int res=0;
	while(u)
	{
		res+=c[u];
		u-=u&-u;
	}
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)
	{
		int x;
		cin>>x;
		add(i,x);
	}
	while(m--)
	{
		int op,x,y;
		cin>>op>>x>>y;
		if(op==1)add(x,y);
		else if(op==2)cout<<sum(y)-sum(x-1)<<'\n';
	}
	return 0;
}
