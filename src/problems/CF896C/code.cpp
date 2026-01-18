#include <bits/stdc++.h>
using namespace std;

using ll=long long;
ll Pow(ll a,ll b,ll mod)
{
	a%=mod;
	ll res=1;
	while(b)
	{
		if(b&1)res=res*a%mod;
		a=a*a%mod;
		b>>=1;
	}
	return res;
}
struct Node
{
	int l,r;
	mutable ll v;
	bool operator<(const Node &rhs) const{return l<rhs.l;}
};
set<Node> s;
auto split(int x)
{
	auto it=s.lower_bound({x,0,0});
	if(it!=s.end()&&it->l==x)return it;
	it--;
	auto [l,r,v]=*it;
	s.erase(it);
	s.insert({l,x-1,v});
	return s.insert({x,r,v}).first;
}
void cover(int l,int r,ll v)
{
	auto it2=split(r+1),it1=split(l);
	s.erase(it1,it2);
	s.insert({l,r,v});
}
void add(int l,int r,ll v)
{
	auto it2=split(r+1),it1=split(l);
	for(auto it=it1;it!=it2;it++)it->v+=v;
}
ll kth(int l,int r,int k)
{
	auto it2=split(r+1),it1=split(l);
	vector<pair<ll,int>> tmp;
	for(auto it=it1;it!=it2;it++)tmp.push_back({it->v,it->r-it->l+1});
	sort(tmp.begin(),tmp.end());
	for(auto it=tmp.begin();it!=tmp.end();it++)
	{
		if(k<=it->second)return it->first;
		k-=it->second;
	}
	return -1;
}
ll query(int l,int r,int x,int mod)
{
	auto it2=split(r+1),it1=split(l);
	ll res=0;
	for(auto it=it1;it!=it2;it++)res=(res+Pow(it->v,x,mod)*(it->r-it->l+1)%mod)%mod;
	return res%mod;
}
int n,m,seed,vmax;
int op,l,r,x,y;
int rnd()
{
	int ret=seed;
	seed=(seed*7ll+13)%1000000007;
	return ret;
}
void init()
{
	op=rnd()%4+1;
	l=rnd()%n+1;
	r=rnd()%n+1;
	if(l>r)swap(l,r);
	if(op==3)x=rnd()%(r-l+1)+1;
	else x=rnd()%vmax+1;
	if(op==4)y=rnd()%vmax+1;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>n>>m>>seed>>vmax;
	for(int i=1;i<=n;i++)s.insert({i,i,rnd()%vmax+1});
	while(m--)
	{
		init();
		if(op==1)add(l,r,x);
		if(op==2)cover(l,r,x);
		if(op==3)cout<<kth(l,r,x)<<'\n';
		if(op==4)cout<<query(l,r,x,y)<<'\n';
	}
	return 0;
}