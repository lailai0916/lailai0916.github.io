#include <bits/stdc++.h>
#define mid (l+r>>1)
using namespace std;

using ll=long long;
const int N=500005;
int a[N],b[N];
ll ans=0;
void msort(int l,int r)
{
	if(l==r)return;
	msort(l,mid);
	msort(mid+1,r);
	int p1=l,p2=mid+1;
	for(int i=l;i<=r;i++)
	{
		bool t=p1<=mid&&(p2>r||a[p1]<=a[p2]);
		b[i]=t?a[p1++]:(ans+=mid-p1+1,a[p2++]);
	}
	for(int i=l;i<=r;i++)a[i]=b[i];
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
	}
	msort(1,n);
	cout<<ans<<'\n';
	return 0;
}
