#include <bits/stdc++.h>
#define s1 (u<<2)
#define s2 (u<<2|1)
#define s3 (u<<2|2)
#define s4 (u<<2|3)
#define m1 (l+(r-l>>2))
#define m2 (l+r>>1)
#define m3 (r-(r-l>>2))
using namespace std;

using ll=long long;
const int N=100005;
ll a[N],val[N<<5],tag[N<<5];
void gx(int u,ll v,int len)
{
	val[u]+=v*len;
	tag[u]+=v;
}
void push_up(int u)
{
	val[u]=val[s1]+val[s2]+val[s3]+val[s4];
}
void push_down(int u,int l,int r)
{
	if(!tag[u])return;
	if(l<=m1)gx(s1,tag[u],m1-l+1);
	if(m1<m2)gx(s2,tag[u],m2-m1);
	if(m2<m3)gx(s3,tag[u],m3-m2);
	if(r>m3)gx(s4,tag[u],r-m3);
	tag[u]=0;
}
void build(int u,int l,int r)
{
	if(l==r){val[u]=a[l];return;}
	if(l<=m1)build(s1,l,m1);
	if(m1<m2)build(s2,m1+1,m2);
	if(m2<m3)build(s3,m2+1,m3);
	if(r>m3)build(s4,m3+1,r);
	push_up(u);
}
void update(int u,int l,int r,int x,int y,ll v)
{
	if(x>r||y<l)return;
	if(x<=l&&r<=y){gx(u,v,r-l+1);return;}
	push_down(u,l,r);
	if(l<=m1)update(s1,l,m1,x,y,v);
	if(m1<m2)update(s2,m1+1,m2,x,y,v);
	if(m2<m3)update(s3,m2+1,m3,x,y,v);
	if(r>m3)update(s4,m3+1,r,x,y,v);
	push_up(u);
}
ll query(int u,int l,int r,int x,int y)
{
	if(x>r||y<l)return 0;
	if(x<=l&&r<=y)return val[u];
	push_down(u,l,r);
	ll res=0;
	if(l<=m1)res+=query(s1,l,m1,x,y);
	if(m1<m2)res+=query(s2,m1+1,m2,x,y);
	if(m2<m3)res+=query(s3,m2+1,m3,x,y);
	if(r>m3)res+=query(s4,m3+1,r,x,y);
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
