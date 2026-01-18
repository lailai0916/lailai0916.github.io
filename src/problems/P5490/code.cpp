#include <bits/stdc++.h>
#define ls (u<<1)
#define rs (u<<1|1)
#define mid (l+r>>1)
using namespace std;

using ll=long long;
const int N=200005;
struct Node
{
	int l,r,h,op;
	bool operator<(const Node &x) const{return h<x.h;}
}node[N];
int a[N],val[N<<2],cnt[N<<2];
void push_up(int u,int l,int r)
{
	if(cnt[u])val[u]=a[r+1]-a[l];
	else if(l==r)val[u]=0;
	else val[u]=val[ls]+val[rs];
}
void update(int u,int l,int r,int x,int y,int v)
{
	if(x<=l&&r<=y)
	{
		cnt[u]+=v;
		push_up(u,l,r);
		return;
	}
	if(x<=mid)update(ls,l,mid,x,y,v);
	if(y>mid)update(rs,mid+1,r,x,y,v);
	push_up(u,l,r);
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m=0;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		int x1,y1,x2,y2;
		cin>>x1>>y1>>x2>>y2;
		node[++m]={x1,x2,y1,1};a[m]=x1;
		node[++m]={x1,x2,y2,-1};a[m]=x2;
	}
	sort(node+1,node+m+1);
	sort(a+1,a+m+1);
	m=unique(a+1,a+m+1)-a-1;
	ll ans=0;
	for(int i=1;i<=n<<1;i++)
	{
		int l=lower_bound(a+1,a+m+1,node[i].l)-a;
		int r=lower_bound(a+1,a+m+1,node[i].r)-a;
		update(1,1,m,l,r-1,node[i].op);
		ans+=(ll)val[1]*(node[i+1].h-node[i].h);
	}
	cout<<ans<<'\n';
	return 0;
}
