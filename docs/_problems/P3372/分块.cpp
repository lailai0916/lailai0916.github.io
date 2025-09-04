#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int inf=0x3f3f3f3f;
const int mod=1e9+7;
const int N=100005;
ll a[N],b[N],s[N];
int id[N],len;
void update(int l,int r,ll v)
{
	int x=id[l],y=id[r];
	if(x==y)
	{
		for(int i=l;i<=r;i++){a[i]+=v;s[x]+=v;}
		return;
	}
	for(int i=l;id[i]==x;i++){a[i]+=v;s[x]+=v;}
	for(int i=r;id[i]==y;i--){a[i]+=v;s[y]+=v;}
	for(int i=x+1;i<y;i++){b[i]+=v;s[i]+=v*len;}
}
ll query(int l,int r)
{
	int x=id[l],y=id[r];
	ll res=0;
	if(x==y)
	{
		for(int i=l;i<=r;i++)res+=a[i]+b[x];
		return res;
	}
	for(int i=l;id[i]==x;i++)res+=a[i]+b[x];
	for(int i=r;id[i]==y;i--)res+=a[i]+b[y];
	for(int i=x+1;i<y;i++)res+=s[i];
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	len=sqrt(n);
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
		id[i]=(i-1)/len+1;
		s[id[i]]+=a[i];
	}
	while(m--)
	{
		int op,x,y;
		ll k;
		cin>>op;
		if(op==1)
		{
			cin>>x>>y>>k;
			update(x,y,k);
		}
		else if(op==2)
		{
			cin>>x>>y;
			cout<<query(x,y)<<'\n';
		}
	}
	return 0;
}
