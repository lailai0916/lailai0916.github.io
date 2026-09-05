#include <bits/stdc++.h>
#define mid (l+r>>1)
using namespace std;

using ull=unsigned long long;
const int N=100005;
ull val[N*120],tag[N*120];
int son[N*120][2];
int cnt=0;
void gx(int u,ull v,int len)
{
	val[u]+=v*len;
	tag[u]+=v;
}
void push_up(int u)
{
	val[u]=(son[u][0]?val[son[u][0]]:0)+(son[u][1]?val[son[u][1]]:0);
}
void push_down(int u,int l,int r)
{
	if(l==r||!tag[u])return;
	if(!son[u][0])son[u][0]=++cnt;
	if(!son[u][1])son[u][1]=++cnt;
	gx(son[u][0],tag[u],mid-l+1);
	gx(son[u][1],tag[u],r-mid);
	tag[u]=0;
}
void update(int &u,int l,int r,int x,int y,ull v)
{
	if(!u)u=++cnt;
	if(x<=l&&r<=y){gx(u,v,r-l+1);return;}
	push_down(u,l,r);
	if(x<=mid)update(son[u][0],l,mid,x,y,v);
	if(y>mid)update(son[u][1],mid+1,r,x,y,v);
	push_up(u);
}
ull query(int u,int l,int r,int x,int y)
{
	if(!u)return 0;
	if(x<=l&&r<=y)return val[u];
	push_down(u,l,r);
	ull res=0;
	if(x<=mid)res+=query(son[u][0],l,mid,x,y);
	if(y>mid)res+=query(son[u][1],mid+1,r,x,y);
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m,rt=0;
	cin>>n>>m;
	for(int i=1;i<=m;i++)
	{
		int op,x,y,k;
		cin>>op;
		if(op==1)
		{
			cin>>x>>y>>k;
			update(rt,1,1e9,x,y,k);
		}
		else if(op==2)
		{
			cin>>x>>y;
			cout<<query(rt,1,1e9,x,y)+1ll*(x+y)*(y-x+1)/2<<'\n';
		}
	}
	return 0;
}
