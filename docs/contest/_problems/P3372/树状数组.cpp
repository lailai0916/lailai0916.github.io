#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=100005;
ll c1[N],c2[N];
void add(int u,ll v)
{
	ll w=u*v;
	while(u<N)
	{
		c1[u]+=v;
		c2[u]+=w;
		u+=u&-u;
	}
}
ll sum(ll *c,int u)
{
	ll res=0;
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
		ll x;
		cin>>x;
		add(i,x);
		add(i+1,-x);
	}
	while(m--)
	{
		int op,x,y;
		ll k;
		cin>>op;
		if(op==1)
		{
			cin>>x>>y>>k;
			add(x,k);
			add(y+1,-k);
		}
		else if(op==2)
		{
			cin>>x>>y;
			cout<<sum(c1,y)*(y+1)-sum(c1,x-1)*x-(sum(c2,y)-sum(c2,x-1))<<'\n';
		}
	}
	return 0;
}
