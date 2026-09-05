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
	int tmp=0;
	for(int i=1;i<=n;i++)
	{
		int x;
		cin>>x;
		add(i,x-tmp);
		tmp=x;
	}
	while(m--)
	{
		int op,x,y,k;
		cin>>op;
		if(op==1)
		{
			cin>>x>>y>>k;
			add(x,k);
			add(y+1,-k);
		}
		else if(op==2)
		{
			cin>>x;
			cout<<sum(x)<<'\n';
		}
	}
	return 0;
}