#include <bits/stdc++.h>
#define ls (u<<1)
#define rs (u<<1|1)
#define mid (l+r>>1)
using namespace std;

using ll=long long;
const int N=1000005;
double a[N],v1[N<<2],v2[N<<2],tag[N<<2];
void gx(int u,double v,int len)
{
	v2[u]+=v1[u]*v*2+v*v*len;
	v1[u]+=v*len;
	tag[u]+=v;
}
void push_up(int u)
{
	v1[u]=v1[ls]+v1[rs];
	v2[u]=v2[ls]+v2[rs];
}
void push_down(int u,int l,int r)
{
	gx(ls,tag[u],mid-l+1);
	gx(rs,tag[u],r-mid);
	tag[u]=0;
}
void build(int u,int l,int r)
{
	if(l==r){v1[u]=a[l];v2[u]=a[l]*a[l];return;}
	build(ls,l,mid);
	build(rs,mid+1,r);
	push_up(u);
}
void update(int u,int l,int r,int x,int y,double v)
{
	if(x<=l&&r<=y){gx(u,v,r-l+1);return;}
	push_down(u,l,r);
	if(x<=mid)update(ls,l,mid,x,y,v);
	if(y>mid)update(rs,mid+1,r,x,y,v);
	push_up(u);
}
double query1(int u,int l,int r,int x,int y)
{
	if(x<=l&&r<=y)return v1[u];
	push_down(u,l,r);
	double ans=0;
	if(x<=mid)ans+=query1(ls,l,mid,x,y);
	if(y>mid)ans+=query1(rs,mid+1,r,x,y);
	return ans;
}
double query2(int u,int l,int r,int x,int y)
{
	if(x<=l&&r<=y)return v2[u];
	push_down(u,l,r);
	double ans=0;
	if(x<=mid)ans+=query2(ls,l,mid,x,y);
	if(y>mid)ans+=query2(rs,mid+1,r,x,y);
	return ans;
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
		double k;
		cin>>op;
		if(op==1)
		{
			cin>>x>>y>>k;
			update(1,1,n,x,y,k);
		}
		else
		{
			cin>>x>>y;
			double ave=query1(1,1,n,x,y)/(y-x+1);
			double ans=op==2?ave:query2(1,1,n,x,y)/(y-x+1)-ave*ave;
			cout<<fixed<<setprecision(4)<<ans<<'\n';
		}
	}
	return 0;
}
