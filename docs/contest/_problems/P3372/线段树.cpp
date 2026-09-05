#include <bits/stdc++.h>
#define ls (u<<1)
#define rs (u<<1|1)
#define mid (l+r>>1)
using namespace std;

using ll=long long;
const int N=100005;
ll a[N],val[N<<2],tag[N<<2];
void gx(int u,ll v,int len){val[u]+=v*len;tag[u]+=v;}
void push_up(int u){val[u]=val[ls]+val[rs];}
void push_down(int u,int l,int r)
{
	gx(ls,tag[u],mid-l+1);
	gx(rs,tag[u],r-mid);
	tag[u]=0;
}
void build(int u,int l,int r)
{
	if(l==r){val[u]=a[l];return;}
	build(ls,l,mid);
	build(rs,mid+1,r);
	push_up(u);
}
void update(int u,int l,int r,int x,int y,ll v)
{
	if(x<=l&&r<=y){gx(u,v,r-l+1);return;}
	push_down(u,l,r);
	if(x<=mid)update(ls,l,mid,x,y,v);
	if(y>mid)update(rs,mid+1,r,x,y,v);
	push_up(u);
}
ll query(int u,int l,int r,int x,int y)
{
	if(x<=l&&r<=y)return val[u];
	push_down(u,l,r);
	ll res=0;
	if(x<=mid)res+=query(ls,l,mid,x,y);
	if(y>mid)res+=query(rs,mid+1,r,x,y);
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
		cin>>a[i];
	}
	build(1,1,n);
	while(m--)
	{
		int op,x,y;
		ll k;
		cin>>op;
		if(op==1)
		{
			cin>>x>>y>>k;
			update(1,1,n,x,y,k);
		}
		else if(op==2)
		{
			cin>>x>>y;
			cout<<query(1,1,n,x,y)<<'\n';
		}
	}
	return 0;
}
