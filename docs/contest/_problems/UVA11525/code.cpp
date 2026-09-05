#include <bits/stdc++.h>
#define ls (u<<1)
#define rs (u<<1|1)
#define mid (l+r>>1)
using namespace std;

const int N=50005;
int val[N<<2];
void build(int u,int l,int r)
{
	if(l==r){val[u]=1;return;}
	build(ls,l,mid);
	build(rs,mid+1,r);
	val[u]=val[ls]+val[rs];
}
int query(int u,int l,int r,int v)
{
	val[u]--;
	if(l==r){return l;}
	if(val[ls]<v)return query(rs,mid+1,r,v-val[ls]);
	else return query(ls,l,mid,v);
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int T;
	cin>>T;
	while(T--)
	{
		int n;
		cin>>n;
		build(1,1,n);
		for(int i=1;i<=n;i++)
		{
			int x;
			cin>>x;
			cout<<query(1,1,n,x+1)<<(i<n?' ':'\n');
		}
	}
	return 0;
}