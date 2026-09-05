#include <bits/stdc++.h>
#define ls (u<<1)
#define rs (u<<1|1)
#define mid (l+r>>1)
using namespace std;

using ll=long long;
const int N=100005;
ll a[N],val[N<<2],mul[N<<2],add[N<<2];
int mod;
void gx(int u,ll v1,ll v2,int len)
{
	val[u]=(val[u]*v1+len*v2)%mod;
	mul[u]=(mul[u]*v1)%mod;
	add[u]=(add[u]*v1+v2)%mod;
}
void push_up(int u)
{
	val[u]=(val[ls]+val[rs])%mod;
}
void push_down(int u,int l,int r)
{
	gx(ls,mul[u],add[u],mid-l+1);
	gx(rs,mul[u],add[u],r-mid);
	mul[u]=1;
	add[u]=0;
}
void build(int u,int l,int r)
{
	mul[u]=1;
	if(l==r){val[u]=a[l]%mod;return;}
	build(ls,l,mid);
	build(rs,mid+1,r);
	push_up(u);
}
void update(int u,int l,int r,int x,int y,ll v1,ll v2)
{
	if(x<=l&&r<=y){gx(u,v1,v2,r-l+1);return;}
	push_down(u,l,r);
	if(x<=mid)update(ls,l,mid,x,y,v1,v2);
	if(y>mid)update(rs,mid+1,r,x,y,v1,v2);
	push_up(u);
}
ll query(int u,int l,int r,int x,int y)
{
	if(x<=l&&r<=y)return val[u]%mod;
	push_down(u,l,r);
	ll res=0;
	if(x<=mid)res=(res+query(ls,l,mid,x,y))%mod;
	if(y>mid)res=(res+query(rs,mid+1,r,x,y))%mod;
	return res%mod;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,q;
	cin>>n>>q>>mod;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
	}
	build(1,1,n);
	while(q--)
	{
		int op,x,y;
		ll k;
		cin>>op;
		if(op==1)
		{
			cin>>x>>y>>k;
			update(1,1,n,x,y,k,0);
		}
		else if(op==2)
		{
			cin>>x>>y>>k;
			update(1,1,n,x,y,1,k);
		}
		else if(op==3)
		{
			cin>>x>>y;
			cout<<query(1,1,n,x,y)<<'\n';
		}
	}
	return 0;
}
