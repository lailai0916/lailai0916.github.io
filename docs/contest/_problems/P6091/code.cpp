#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=1000005;
bool vis[N];
int pri[N],phi[N],mn[N];
void sieve()
{
	vis[0]=vis[1]=1;
	phi[1]=1;
	int cnt=0;
	for(int i=2;i<N;i++)
	{
		if(!vis[i])
		{
			pri[++cnt]=i;
			phi[i]=i-1;
			mn[i]=i;
		}
		for(int j=1;j<=cnt;j++)
		{
			if(i*pri[j]>=N)break;
			vis[i*pri[j]]=1;
			mn[i*pri[j]]=pri[j];
			if(i%pri[j]==0)
			{
				phi[i*pri[j]]=phi[i]*pri[j];
				break;
			}
			phi[i*pri[j]]=phi[i]*phi[pri[j]];
		}
	}
}
ll Pow(ll x,ll y,ll mod)
{
	x%=mod;
	ll res=1;
	while(y)
	{
		if(y&1)res=res*x%mod;
		x=x*x%mod;
		y>>=1;
	}
	return res;
}
bool check(int n)
{
	if(n==2||n==4)return 1;
	if(n%2==0)n/=2;
	if(n%2==0)return 0;
	if(n==1)return 0;
	int d=mn[n];
	while(n%d==0)n/=d;
	return n==1;
}
int getrt(int n)
{
	if(n==2)return 1;
	int m=phi[n];
	vector<int> f;
	int x=m;
	while(x>1)
	{
		int p=mn[x];
		f.push_back(p);
		while(x%p==0)x/=p;
	}
	for(int g=2;g<n;g++)
	{
		if(__gcd(g,n)!=1)continue;
		bool ok=1;
		for(int p:f)
		{
			if(Pow(g,m/p,n)==1)
			{
				ok=0;
				break;
			}
		}
		if(ok)return g;
	}
	return -1;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	sieve();
	int T;
	cin>>T;
	while(T--)
	{
		int n,d;
		cin>>n>>d;
		if(!check(n))
		{
			cout<<0<<'\n'<<'\n';
			continue;
		}
		int m=phi[n],c=phi[m],g=getrt(n);
		vector<int> rt;
		for(int i=1;i<=m;i++)
		{
			if(__gcd(i,m)==1)rt.push_back(Pow(g,i,n));
		}
		sort(rt.begin(),rt.end());
		cout<<c<<'\n';
		for(int i=d;i<=c;i+=d)cout<<rt[i-1]<<' ';
		cout<<'\n';
	}
	return 0;
}
