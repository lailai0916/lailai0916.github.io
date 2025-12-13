#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=1000005;
const int mod=1e9+7;
const int inv2=500000004;
const int inv6=166666668;
ll n,w[N<<1];
int sq,m,cnt,pri[N],sp1[N],sp2[N];
int g1[N<<1],g2[N<<1],id1[N],id2[N];
bool vis[N];
void sieve()
{
	vis[0]=vis[1]=1;
	cnt=0;
	for(int i=2;i<N;i++)
	{
		if(!vis[i])
		{
			pri[++cnt]=i;
			sp1[cnt]=(sp1[cnt-1]+i)%mod;
			sp2[cnt]=(sp2[cnt-1]+1ll*i*i)%mod;
		}
		for(int j=1;j<=cnt;j++)
		{
			if(i*pri[j]>=N)break;
			vis[i*pri[j]]=1;
			if(i%pri[j]==0)break;
		}
	}
}
int S(ll x,int y)
{
	if(x<=1||pri[y]>x)return 0;
	int k=(x<=sq)?id1[x]:id2[n/x];
	int res=(g2[k]-g1[k]+mod)%mod;
	res=(res-(sp2[y-1]-sp1[y-1]+mod)%mod+mod)%mod;
	for(int i=y;i<=cnt&&1ll*pri[i]*pri[i]<=x;i++)
	{
		ll pe=pri[i];
		for(int e=1;pe*pri[i]<=x;e++,pe*=pri[i])
		{
			int v1=pe%mod*((pe-1)%mod)%mod;
			int v2=pe*pri[i]%mod*((pe*pri[i]-1)%mod)%mod;
			res=(res+1ll*v1*S(x/pe,i+1)+v2)%mod;
		}
	}
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	sieve();
	cin>>n;
	sq=sqrt(n);
	for(ll l=1,r;l<=n;l=r+1)
	{
		r=n/(n/l);
		w[++m]=n/l;
		ll v=w[m]%mod;
		g1[m]=(v*(v+1)%mod*inv2%mod-1+mod)%mod;
		g2[m]=(v*(v+1)%mod*(2*v+1)%mod*inv6%mod-1+mod)%mod;
		if(w[m]<=sq)id1[w[m]]=m;
		else id2[n/w[m]]=m;
	}
	for(int j=1;j<=cnt;j++)
	{
		ll p2=1ll*pri[j]*pri[j];
		for(int i=1;i<=m&&w[i]>=p2;i++)
		{
			ll v=w[i]/pri[j];
			int k=(v<=sq)?id1[v]:id2[n/v];
			g1[i]=(g1[i]-1ll*pri[j]*(g1[k]-sp1[j-1]+mod)%mod+mod)%mod;
			g2[i]=(g2[i]-1ll*pri[j]*pri[j]%mod*(g2[k]-sp2[j-1]+mod)%mod+mod)%mod;
		}
	}
	cout<<(S(n,1)+1)%mod<<'\n';
	return 0;
}
