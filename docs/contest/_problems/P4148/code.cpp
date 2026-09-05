#include <bits/stdc++.h>
using namespace std;

const int N=200005;
const double al=0.75;
int n,rt,tot;
int ls[N],rs[N],d[N][2],L[N][2],R[N][2],sz[N],sum[N],val[N];
int newnode(int x,int y,int v)
{
	int u=++tot;
	ls[u]=rs[u]=0;
	d[u][0]=x;
	d[u][1]=y;
	val[u]=v;
	return u;
}
void up(int u)
{
	sz[u]=sz[ls[u]]+sz[rs[u]]+1;
	sum[u]=sum[ls[u]]+sum[rs[u]]+val[u];
	for(int t=0;t<2;t++)
	{
		L[u][t]=R[u][t]=d[u][t];
		if(ls[u])
		{
			L[u][t]=min(L[u][t],L[ls[u]][t]);
			R[u][t]=max(R[u][t],R[ls[u]][t]);
		}
		if(rs[u])
		{
			L[u][t]=min(L[u][t],L[rs[u]][t]);
			R[u][t]=max(R[u][t],R[rs[u]][t]);
		}
	}
}
int g[N],gc;
void flatten(int u)
{
	if(!u)return;
	flatten(ls[u]);
	g[++gc]=u;
	flatten(rs[u]);
}
int build(int l,int r,int k)
{
	if(l>r)return 0;
	int m=l+r>>1;
	nth_element(g+l,g+m,g+r+1,[&](int x,int y){return d[x][k]<d[y][k];});
	int u=g[m];
	ls[u]=build(l,m-1,k^1);
	rs[u]=build(m+1,r,k^1);
	up(u);
	return u;
}
int rebuild(int u)
{
	gc=0;
	flatten(u);
	return build(1,gc,0);
}
void insert(int &u,int x,int y,int v,int k)
{
	if(!u)
	{
		u=newnode(x,y,v);
		up(u);
		return;
	}
	if(x==d[u][0]&&y==d[u][1])
	{
		val[u]+=v;
		up(u);
		return;
	}
	if(d[u][k]<x||(d[u][k]==x&&k==0&&d[u][1]<y))insert(rs[u],x,y,v,k^1);
	else insert(ls[u],x,y,v,k^1);
	up(u);
	if(max(sz[ls[u]],sz[rs[u]])>sz[u]*al)u=rebuild(u);
}
int qx1,qy1,qx2,qy2;
int query(int u)
{
	if(!u||R[u][0]<qx1||L[u][0]>qx2||R[u][1]<qy1||L[u][1]>qy2)return 0;
	if(qx1<=L[u][0]&&R[u][0]<=qx2&&qy1<=L[u][1]&&R[u][1]<=qy2)return sum[u];
	int res=0;
	if(qx1<=d[u][0]&&d[u][0]<=qx2&&qy1<=d[u][1]&&d[u][1]<=qy2)res+=val[u];
	res+=query(ls[u])+query(rs[u]);
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>n;
	int last=0,op;
	while(cin>>op&&op!=3)
	{
		if(op==1)
		{
			int x,y,v;
			cin>>x>>y>>v;
			x^=last;
			y^=last;
			v^=last;
			insert(rt,x,y,v,0);
		}
		else if(op==2)
		{
			cin>>qx1>>qy1>>qx2>>qy2;
			qx1^=last;
			qy1^=last;
			qx2^=last;
			qy2^=last;
			last=query(rt);
			cout<<last<<'\n';
		}
	}
	return 0;
}
