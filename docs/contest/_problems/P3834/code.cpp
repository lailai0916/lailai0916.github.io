#include <bits/stdc++.h>
#define mid (l+r>>1)
using namespace std;

const int N=1000005;
const int inf=0x3f3f3f3f;
struct Node
{
	int ls,rs,val;
}G[N*35];
int a[N],root[N],cnt=0;
void update(int &u,int o,int l,int r,int x)
{
	u=++cnt;
	G[u]=G[o];
	G[u].val++;
	if(l==r)return;
	if(x<=mid)update(G[u].ls,G[o].ls,l,mid,x);
	else update(G[u].rs,G[o].rs,mid+1,r,x);
}
int query(int u,int o,int l,int r,int k)
{
	if(l==r)return l;
	int tmp=G[G[u].ls].val-G[G[o].ls].val;
	if(k<=tmp)return query(G[u].ls,G[o].ls,l,mid,k);
	else return query(G[u].rs,G[o].rs,mid+1,r,k-tmp);
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
		update(root[i],root[i-1],-inf,inf,a[i]);
	}
	while(m--)
	{
		int l,r,k;
		cin>>l>>r>>k;
		cout<<query(root[r],root[l-1],-inf,inf,k)<<'\n';
	}
	return 0;
}
