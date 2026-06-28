#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=300005;
int n,m,k;
ll p[N];
int ql[N],qr[N],qa[N];
vector<int> own[N];
int ans[N];
int q[N],lq[N],rq[N];
ll c[N];
void add(int x,ll v)
{
	for(;x<=m;x+=x&-x)c[x]+=v;
}
ll ask(int x)
{
	ll res=0;
	for(;x;x-=x&-x)res+=c[x];
	return res;
}
void modify(int i,int v)
{
	if(ql[i]<=qr[i])
	{
		add(ql[i],(ll)v*qa[i]);
		add(qr[i]+1,-(ll)v*qa[i]);
	}
	else
	{
		add(1,(ll)v*qa[i]);
		add(qr[i]+1,-(ll)v*qa[i]);
		add(ql[i],(ll)v*qa[i]);
		add(m+1,-(ll)v*qa[i]);
	}
}
void solve(int l,int r,int ls,int rs)
{
	if(ls>rs)return;
	if(l==r)
	{
		for(int i=ls;i<=rs;i++)ans[q[i]]=l;
		return;
	}
	int mid=(l+r)>>1;
	for(int i=l;i<=mid;i++)modify(i,1);
	int cl=0,cr=0;
	for(int i=ls;i<=rs;i++)
	{
		int u=q[i];
		ll need=p[u],got=0;
		for(int s:own[u])
		{
			got+=ask(s);
			if(got>=need)break;
		}
		if(got>=need)lq[++cl]=u;
		else rq[++cr]=u;
	}
	for(int i=1;i<=cl;i++)q[ls+i-1]=lq[i];
	for(int i=1;i<=cr;i++)q[ls+cl+i-1]=rq[i];
	for(int i=mid;i>=l;i--)modify(i,-1);
	solve(l,mid,ls,ls+cl-1);
	for(int i=l;i<=mid;i++)modify(i,1);
	solve(mid+1,r,ls+cl,rs);
	for(int i=mid;i>=l;i--)modify(i,-1);
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>n>>m;
	for(int i=1;i<=m;i++)
	{
		int o;
		cin>>o;
		own[o].push_back(i);
	}
	for(int i=1;i<=n;i++)cin>>p[i];
	cin>>k;
	for(int i=1;i<=k;i++)cin>>ql[i]>>qr[i]>>qa[i];
	for(int i=1;i<=n;i++)q[i]=i;
	solve(1,k+1,1,n);
	for(int i=1;i<=n;i++)
	{
		if(ans[i]==k+1)cout<<"NIE"<<'\n';
		else cout<<ans[i]<<'\n';
	}
	return 0;
}
