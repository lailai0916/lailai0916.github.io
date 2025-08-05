#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int inf=0x3f3f3f3f;
const int mod=1e9+7;
const int N=1000005;
int a[N],b[N],t[N];
int id[N],st[N],ed[N];
void reset(int k)
{
	for(int i=st[k];i<=ed[k];i++)t[i]=a[i];
	sort(t+st[k],t+ed[k]+1);
}
void init(int n)
{
    int len=sqrt(n);
	for(int i=1;i<=len;i++)
	{
		st[i]=n/len*(i-1)+1;
		ed[i]=n/len*i;
	}
	ed[len]=n;
	for(int i=1;i<=len;i++)
	{
		for(int j=st[i];j<=ed[i];j++)id[j]=i;
	}
	for(int i=1;i<=len;i++)
	{
		reset(i);
	}
}
void update(int l,int r,int v)
{
	int x=id[l],y=id[r];
	if(x==y)
	{
		for(int i=l;i<=r;i++)a[i]+=v;
		reset(x);
		return;
	}
	for(int i=l;i<=ed[x];i++)a[i]+=v;
	for(int i=st[y];i<=r;i++)a[i]+=v;
	for(int i=x+1;i<y;i++)b[i]+=v;
	reset(x);
	reset(y);
}
int query(int l,int r,int v)
{
	int x=id[l],y=id[r];
	int ans=0;
	if(x==y)
	{
		for(int i=l;i<=r;i++)if(a[i]+b[x]>=v)ans++;
		return ans;
	}
	for(int i=l;i<=ed[x];i++)if(a[i]+b[x]>=v)ans++;
	for(int i=st[y];i<=r;i++)if(a[i]+b[y]>=v)ans++;
	for(int i=x+1;i<=y-1;i++)ans+=ed[i]-(lower_bound(t+st[i],t+ed[i]+1,v-b[i])-t)+1;
	return ans;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
    int n,q;
    cin>>n>>q;
    for(int i=1;i<=n;i++)
    {
    	cin>>a[i];
    }
    init(n);
    while(q--)
    {
    	char op;
    	int l,r,v;
    	cin>>op>>l>>r>>v;
    	if(op=='M')update(l,r,v);
    	else if(op=='A')cout<<query(l,r,v)<<'\n';
	}
	return 0;
}