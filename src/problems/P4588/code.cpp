#include <bits/stdc++.h>
#define ls (u<<1)
#define rs (u<<1|1)
#define mid (l+r>>1)
using namespace std;

using ll=long long;
const int N=400005;
ll val[N];
int mod;
void push_up(int u)
{
	val[u]=val[ls]*val[rs]%mod;
}
void build(int u,int l,int r)
{
	if(l==r){val[u]=1;return;}
	build(ls,l,mid);
	build(rs,mid+1,r);
	push_up(u);
}
void update(int u,int l,int r,int x,ll v)
{
	if(l==r){val[u]=v;return;}
	if(x<=mid)update(ls,l,mid,x,v);
	else update(rs,mid+1,r,x,v);
	push_up(u);
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int T;
	cin>>T;
	while(T--)
	{
		int q;
		cin>>q>>mod;
		build(1,1,q);
		for(int i=1;i<=q;i++)
		{
			int op,x;
			cin>>op>>x;
			if(op==1)update(1,1,q,i,x);
			else if(op==2)update(1,1,q,x,1);
			cout<<val[1]<<'\n';
		}
	}
	return 0;
}
