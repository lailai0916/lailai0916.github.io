#include <bits/stdc++.h>
using namespace std;

using ll=long long;
ll bsgs(ll b,ll n,ll p)
{
	b%=p;
	n%=p;
	if(n==1||p==1)return 0;
	ll m=ceil(sqrt((double)p)),cur=n;
	unordered_map<ll,ll> mp;
	for(ll j=0;j<m;j++)
	{
		mp[cur]=j;
		cur=cur*b%p;
	}
	ll t=1;
	for(ll i=0;i<m;i++)t=t*b%p;
	cur=1;
	for(ll i=1;i<=m;i++)
	{
		cur=cur*t%p;
		if(mp.count(cur))return i*m-mp[cur];
	}
	return -1;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	ll p,b,n;
	cin>>p>>b>>n;
	ll res=bsgs(b,n,p);
	if(res==-1)cout<<"no solution"<<'\n';
	else cout<<res<<'\n';
	return 0;
}
