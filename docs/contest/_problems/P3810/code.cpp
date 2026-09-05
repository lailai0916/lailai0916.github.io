#include <bits/stdc++.h>
#define mid (l+r>>1)
using namespace std;

using ll=long long;
const int inf=0x3f3f3f3f;
const int mod=1e9+7;
const int N=100005;
const int K=200005;
struct Node
{
	int x,y,z,id;
}a[N],b[N];
bool cmp(Node u,Node v)
{
	return u.x!=v.x?u.x<v.x:(u.y!=v.y?u.y<v.y:u.z<v.z);
}
struct BIT
{
	int c[K];
	void add(int u,int v){while(u<K){c[u]+=v;u+=u&-u;}}
	int sum(int u){int res=0;while(u){res+=c[u];u-=u&-u;}return res;}
}bit;
int ans[N],cnt[N];
void cdq(int l,int r)
{
	if(l==r)return;
	cdq(l,mid);
	cdq(mid+1,r);
	int p1=l,p2=mid+1;
	for(int i=l;i<=r;i++)
	{
		if(p1<=mid&&(p2>r||a[p1].y<=a[p2].y))
		{
			b[i]=a[p1++];
			bit.add(b[i].z,1);
		}
		else
		{
			b[i]=a[p2++];
			ans[b[i].id]+=bit.sum(b[i].z);
		}
	}
	for(int i=l;i<=mid;i++)bit.add(a[i].z,-1);
	for(int i=l;i<=r;i++)a[i]=b[i];
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,k;
	cin>>n>>k;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i].x>>a[i].y>>a[i].z;
		a[i].id=i;
	}
	sort(a+1,a+n+1,cmp);
	cdq(1,n);
	for(int i=n-1;i>=1;i--)
	{
		if(a[i].x==a[i+1].x&&a[i].y==a[i+1].y&&a[i].z==a[i+1].z)
		{
			ans[a[i].id]=ans[a[i+1].id];
		}
	}
	for(int i=1;i<=n;i++)
	{
		cnt[ans[i]]++;
	}
	for(int i=0;i<n;i++)
	{
		cout<<cnt[i]<<'\n';
	}
	return 0;
}