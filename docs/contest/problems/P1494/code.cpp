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
}a[N];
ll c[N],cnt[N],sum=0;
void add(int i)
{
	sum+=cnt[i];
	cnt[i]++;
}
void del(int i)
{
	cnt[i]--;
	sum-=cnt[i];
}
ll ans1[N],ans2[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	len=sqrt(n);
	for(int i=1;i<=n;i++)cin>>c[i];
	for(int i=1;i<=m;i++)
	{
		cin>>a[i].l>>a[i].r;
		a[i].id=i;
	}
	sort(a+1,a+m+1);
	int l=1,r=0;
	for(int i=1;i<=m;i++)
	{
		if(a[i].l==a[i].r)
		{
			ans1[a[i].id]=0;
			ans2[a[i].id]=1;
			continue;
		}
		while(l>a[i].l)add(c[--l]);
		while(r<a[i].r)add(c[++r]);
		while(l<a[i].l)del(c[l++]);
		while(r>a[i].r)del(c[r--]);
		ans1[a[i].id]=sum;
		ans2[a[i].id]=(r-l+1ll)*(r-l)/2;
	}
	for(int i=1;i<=m;i++)
	{
		if(ans1[i]==0)
		{
			cout<<0<<'/'<<1<<'\n';
			continue;
		}
		ll g=__gcd(ans1[i],ans2[i]);
		cout<<ans1[i]/g<<'/'<<ans2[i]/g<<'\n';
	}
	return 0;
}
