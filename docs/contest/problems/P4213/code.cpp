#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=5000005;
bool vis[N];
ll pri[N],phi[N],mu[N];
unordered_map<ll,ll> sum_phi,sum_mu;
void sieve()
{
	vis[0]=vis[1]=1;
	phi[1]=mu[1]=1;
	int cnt=0;
	for(int i=2;i<N;i++)
	{
		if(!vis[i])
		{
			pri[++cnt]=i;
			phi[i]=i-1;
			mu[i]=-1;
		}
		for(int j=1;j<=cnt;j++)
		{
			if(i*pri[j]>=N)break;
			vis[i*pri[j]]=1;
			if(i%pri[j]==0)
			{
				phi[i*pri[j]]=phi[i]*pri[j];
				mu[i*pri[j]]=0;
				break;
			}
			phi[i*pri[j]]=phi[i]*phi[pri[j]];
			mu[i*pri[j]]=-mu[i];
		}
	}
	for(int i=1;i<N;i++)
	{
		phi[i]+=phi[i-1];
		mu[i]+=mu[i-1];
	}
}
ll sum_g(ll x)
{
	return x;
}
ll get_phi(ll x)
{
	if(x<N)return phi[x];
	if(sum_phi[x])return sum_phi[x];
	ll ans=x*(x+1)/2;
	for(ll l=2,r;l<=x;l=r+1)
	{
		r=x/(x/l);
		ans-=(sum_g(r)-sum_g(l-1))*get_phi(x/l);
	}
	return sum_phi[x]=ans/sum_g(1);
}
ll get_mu(ll x)
{
	if(x<N)return mu[x];
	if(sum_mu[x])return sum_mu[x];
	ll ans=1;
	for(ll l=2,r;l<=x;l=r+1)
	{
		r=x/(x/l);
		ans-=(sum_g(r)-sum_g(l-1))*get_mu(x/l);
	}
	return sum_mu[x]=ans/sum_g(1);
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
		ll n;
		cin>>n;
		cout<<get_phi(n)<<' '<<get_mu(n)<<'\n';
	}
	return 0;
}
