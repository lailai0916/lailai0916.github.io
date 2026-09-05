#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=50005;
int len;
struct Node
{
	int l,r,id;
	bool operator<(const Node &rhs) const
	{
		if(l/len!=rhs.l/len)return l<rhs.l;
		return l/len&1?r<rhs.r:r>rhs.r;
	}
}q[N];
int a[N];
ll cnt[N],ans[N],sum=0;
void add(int x)
{
	sum+=cnt[x]*2+1;
	cnt[x]++;
}
void del(int x)
{
	sum+=1-cnt[x]*2;
	cnt[x]--;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m,k;
	cin>>n>>m>>k;
	len=sqrt(n);
	for(int i=1;i<=n;i++)cin>>a[i];
	for(int i=1;i<=m;i++)
	{
		cin>>q[i].l>>q[i].r;
		q[i].id=i;
	}
	sort(q+1,q+m+1);
	int l=1,r=0;
	for(int i=1;i<=m;i++)
	{
		while(l>q[i].l)add(a[--l]);
		while(r<q[i].r)add(a[++r]);
		while(l<q[i].l)del(a[l++]);
		while(r>q[i].r)del(a[r--]);
		ans[q[i].id]=sum;
	}
	for(int i=1;i<=m;i++)cout<<ans[i]<<'\n';
	return 0;
}
