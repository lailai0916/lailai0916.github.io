#include <bits/stdc++.h>
using namespace std;

#define ls (u<<1)
#define rs (u<<1|1)
#define mid (l+r>>1)

using ll=long long;
const int N=500005;
const int inf=0x3f3f3f3f;
int a[N];
ll sum[N];
int mx[N],mx2[N],cmx[N],hmx[N];
int ad[N],ad2[N],adh[N],adh2[N];

void up(int u)
{
	sum[u]=sum[ls]+sum[rs];
	hmx[u]=max(hmx[ls],hmx[rs]);
	if(mx[ls]==mx[rs])
	{
		mx[u]=mx[ls];
		cmx[u]=cmx[ls]+cmx[rs];
		mx2[u]=max(mx2[ls],mx2[rs]);
	}
	else if(mx[ls]>mx[rs])
	{
		mx[u]=mx[ls];
		cmx[u]=cmx[ls];
		mx2[u]=max(mx2[ls],mx[rs]);
	}
	else
	{
		mx[u]=mx[rs];
		cmx[u]=cmx[rs];
		mx2[u]=max(mx[ls],mx2[rs]);
	}
}

void add(int u,int len,int va,int vah,int va2,int vah2)
{
	sum[u]+=(ll)va*cmx[u]+(ll)va2*(len-cmx[u]);
	hmx[u]=max(hmx[u],mx[u]+vah);
	adh[u]=max(adh[u],ad[u]+vah);
	mx[u]+=va;
	ad[u]+=va;
	adh2[u]=max(adh2[u],ad2[u]+vah2);
	ad2[u]+=va2;
	if(mx2[u]!=-inf)mx2[u]+=va2;
}

void down(int u,int l,int r)
{
	int t=max(mx[ls],mx[rs]);
	if(mx[ls]==t)add(ls,mid-l+1,ad[u],adh[u],ad2[u],adh2[u]);
	else add(ls,mid-l+1,ad2[u],adh2[u],ad2[u],adh2[u]);
	if(mx[rs]==t)add(rs,r-mid,ad[u],adh[u],ad2[u],adh2[u]);
	else add(rs,r-mid,ad2[u],adh2[u],ad2[u],adh2[u]);
	ad[u]=ad2[u]=adh[u]=adh2[u]=0;
}

void build(int u,int l,int r)
{
	adh[u]=adh2[u]=-inf;
	if(l==r)
	{
		sum[u]=mx[u]=hmx[u]=a[l];
		mx2[u]=-inf;
		cmx[u]=1;
		return;
	}
	build(ls,l,mid);
	build(rs,mid+1,r);
	up(u);
}

void update_add(int u,int l,int r,int ql,int qr,int k)
{
	if(ql<=l&&r<=qr)
	{
		add(u,r-l+1,k,k,k,k);
		return;
	}
	down(u,l,r);
	if(ql<=mid)update_add(ls,l,mid,ql,qr,k);
	if(qr>mid)update_add(rs,mid+1,r,ql,qr,k);
	up(u);
}

void update_min(int u,int l,int r,int ql,int qr,int v)
{
	if(v>=mx[u])return;
	if(ql<=l&&r<=qr&&mx2[u]<v)
	{
		add(u,r-l+1,v-mx[u],v-mx[u],0,0);
		return;
	}
	down(u,l,r);
	if(ql<=mid)update_min(ls,l,mid,ql,qr,v);
	if(qr>mid)update_min(rs,mid+1,r,ql,qr,v);
	up(u);
}

ll query_sum(int u,int l,int r,int ql,int qr)
{
	if(ql<=l&&r<=qr)return sum[u];
	down(u,l,r);
	ll res=0;
	if(ql<=mid)res+=query_sum(ls,l,mid,ql,qr);
	if(qr>mid)res+=query_sum(rs,mid+1,r,ql,qr);
	return res;
}

int query_max(int u,int l,int r,int ql,int qr)
{
	if(ql<=l&&r<=qr)return mx[u];
	down(u,l,r);
	int res=-inf;
	if(ql<=mid)res=max(res,query_max(ls,l,mid,ql,qr));
	if(qr>mid)res=max(res,query_max(rs,mid+1,r,ql,qr));
	return res;
}

int query_hmax(int u,int l,int r,int ql,int qr)
{
	if(ql<=l&&r<=qr)return hmx[u];
	down(u,l,r);
	int res=-inf;
	if(ql<=mid)res=max(res,query_hmax(ls,l,mid,ql,qr));
	if(qr>mid)res=max(res,query_hmax(rs,mid+1,r,ql,qr));
	return res;
}

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)cin>>a[i];
	build(1,1,n);
	while(m--)
	{
		int op,l,r;
		cin>>op>>l>>r;
		if(op==1)
		{
			int k;
			cin>>k;
			update_add(1,1,n,l,r,k);
		}
		else if(op==2)
		{
			int v;
			cin>>v;
			update_min(1,1,n,l,r,v);
		}
		else if(op==3)cout<<query_sum(1,1,n,l,r)<<'\n';
		else if(op==4)cout<<query_max(1,1,n,l,r)<<'\n';
		else cout<<query_hmax(1,1,n,l,r)<<'\n';
	}
	return 0;
}
