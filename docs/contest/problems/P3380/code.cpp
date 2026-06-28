#include <bits/stdc++.h>
using namespace std;

#define ls (u<<1)
#define rs (u<<1|1)
#define mid (l+r>>1)

const int N=200005;
const int inf=2147483647;
int n,m,a[N];

int tot,ch[N*20][2],rnd[N*20],siz[N*20],key[N*20];

int newnode(int v)
{
	int u=++tot;
	ch[u][0]=ch[u][1]=0;
	rnd[u]=rand();
	siz[u]=1;
	key[u]=v;
	return u;
}

void up(int u)
{
	siz[u]=siz[ch[u][0]]+siz[ch[u][1]]+1;
}

void rotate(int &u,int t)
{
	int p=ch[u][t];
	ch[u][t]=ch[p][t^1];
	ch[p][t^1]=u;
	up(u);
	up(p);
	u=p;
}

void insert(int &u,int v)
{
	if(!u)
	{
		u=newnode(v);
		return;
	}
	siz[u]++;
	int t=v<key[u]?0:1;
	insert(ch[u][t],v);
	if(rnd[ch[u][t]]<rnd[u])rotate(u,t);
}

void erase(int &u,int v)
{
	if(!u)return;
	if(key[u]==v)
	{
		if(!ch[u][0]||!ch[u][1])
		{
			u=ch[u][0]+ch[u][1];
			return;
		}
		int t=rnd[ch[u][0]]<rnd[ch[u][1]]?0:1;
		rotate(u,t);
		erase(ch[u][t^1],v);
		up(u);
	}
	else
	{
		siz[u]--;
		erase(ch[u][v<key[u]?0:1],v);
	}
}

int less_cnt(int u,int v)
{
	int res=0;
	while(u)
	{
		if(key[u]<v)
		{
			res+=siz[ch[u][0]]+1;
			u=ch[u][1];
		}
		else u=ch[u][0];
	}
	return res;
}

int pre(int u,int v)
{
	int res=-inf;
	while(u)
	{
		if(key[u]<v)
		{
			res=max(res,key[u]);
			u=ch[u][1];
		}
		else u=ch[u][0];
	}
	return res;
}

int suc(int u,int v)
{
	int res=inf;
	while(u)
	{
		if(key[u]>v)
		{
			res=min(res,key[u]);
			u=ch[u][0];
		}
		else u=ch[u][1];
	}
	return res;
}

int rt[N<<2];

void build(int u,int l,int r)
{
	for(int i=l;i<=r;i++)insert(rt[u],a[i]);
	if(l==r)return;
	build(ls,l,mid);
	build(rs,mid+1,r);
}

void modify(int u,int l,int r,int pos,int x,int v)
{
	erase(rt[u],x);
	insert(rt[u],v);
	if(l==r)return;
	if(pos<=mid)modify(ls,l,mid,pos,x,v);
	else modify(rs,mid+1,r,pos,x,v);
}

int ql,qr;
int ask_less(int u,int l,int r,int v)
{
	if(ql<=l&&r<=qr)return less_cnt(rt[u],v);
	int res=0;
	if(ql<=mid)res+=ask_less(ls,l,mid,v);
	if(qr>mid)res+=ask_less(rs,mid+1,r,v);
	return res;
}

int ask_pre(int u,int l,int r,int v)
{
	if(ql<=l&&r<=qr)return pre(rt[u],v);
	int res=-inf;
	if(ql<=mid)res=max(res,ask_pre(ls,l,mid,v));
	if(qr>mid)res=max(res,ask_pre(rs,mid+1,r,v));
	return res;
}

int ask_suc(int u,int l,int r,int v)
{
	if(ql<=l&&r<=qr)return suc(rt[u],v);
	int res=inf;
	if(ql<=mid)res=min(res,ask_suc(ls,l,mid,v));
	if(qr>mid)res=min(res,ask_suc(rs,mid+1,r,v));
	return res;
}

int kth(int v)
{
	int lo=0,hi=1e8,res=0;
	while(lo<=hi)
	{
		int x=lo+hi>>1;
		if(ask_less(1,1,n,x)+1<=v)
		{
			res=x;
			lo=x+1;
		}
		else hi=x-1;
	}
	return res;
}

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>n>>m;
	for(int i=1;i<=n;i++)cin>>a[i];
	build(1,1,n);
	while(m--)
	{
		int op,k;
		cin>>op;
		if(op==3)
		{
			int pos;
			cin>>pos>>k;
			modify(1,1,n,pos,a[pos],k);
			a[pos]=k;
			continue;
		}
		cin>>ql>>qr>>k;
		if(op==1)cout<<ask_less(1,1,n,k)+1<<'\n';
		else if(op==2)cout<<kth(k)<<'\n';
		else if(op==4)cout<<ask_pre(1,1,n,k)<<'\n';
		else cout<<ask_suc(1,1,n,k)<<'\n';
	}
	return 0;
}
