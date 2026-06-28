#include <bits/stdc++.h>
#define ls (u<<1)
#define rs (u<<1|1)
#define mid (l+r>>1)
using namespace std;

const double eps=1e-9;
const int N=39989;
const int M=100005;
double k[M],b[M];
int cnt,tree[N<<2];
double calc(int id,int x){return k[id]*x+b[id];}
void add(int x0,int y0,int x1,int y1)
{
	cnt++;
	if(x0==x1)
	{
		k[cnt]=0;
		b[cnt]=max(y0,y1);
	}
	else
	{
		k[cnt]=1.0*(y1-y0)/(x1-x0);
		b[cnt]=y0-k[cnt]*x0;
	}
}
int cmp(int x,int u,int v)
{
	double a=calc(u,x),c=calc(v,x);
	if(a-c>eps)return u;
	if(c-a>eps)return v;
	return u<v?u:v;
}
void update(int u,int l,int r,int x,int y,int id)
{
	if(x<=l&&r<=y)
	{
		if(!tree[u]){tree[u]=id;return;}
		if(cmp(mid,id,tree[u])==id)swap(id,tree[u]);
		double a=calc(id,l),al=calc(tree[u],l);
		double c=calc(id,r),cr=calc(tree[u],r);
		if(a-al>eps||(fabs(a-al)<eps&&id<tree[u]))update(ls,l,mid,x,y,id);
		if(c-cr>eps||(fabs(c-cr)<eps&&id<tree[u]))update(rs,mid+1,r,x,y,id);
		return;
	}
	if(x<=mid)update(ls,l,mid,x,y,id);
	if(y>mid)update(rs,mid+1,r,x,y,id);
}
int query(int u,int l,int r,int x)
{
	if(l==r)return tree[u];
	int res=tree[u];
	int son=x<=mid?query(ls,l,mid,x):query(rs,mid+1,r,x);
	if(son)
	{
		if(!res)res=son;
		else res=cmp(x,res,son);
	}
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	int last=0;
	while(n--)
	{
		int op;
		cin>>op;
		if(op==0)
		{
			int x;
			cin>>x;
			x=(x+last-1)%39989+1;
			last=query(1,1,N,x);
			cout<<last<<'\n';
		}
		else if(op==1)
		{
			int x0,y0,x1,y1;
			cin>>x0>>y0>>x1>>y1;
			x0=(x0+last-1)%39989+1;
			y0=(y0+last-1)%1000000000+1;
			x1=(x1+last-1)%39989+1;
			y1=(y1+last-1)%1000000000+1;
			if(x0>x1){swap(x0,x1);swap(y0,y1);}
			add(x0,y0,x1,y1);
			update(1,1,N,x0,x1,cnt);
		}
	}
	return 0;
}
