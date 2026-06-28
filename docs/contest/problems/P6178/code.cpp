#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=305;
const int mod=1e9+7;
ll Pow(ll x,ll y)
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
ll a[N][N];
int n,m,t;
ll det(int sz)
{
	ll res=1;
	for(int i=1;i<=sz;i++)
	{
		int p=i;
		for(int j=i;j<=sz;j++)
		{
			if(a[j][i]){p=j;break;}
		}
		if(!a[p][i])return 0;
		if(p!=i)
		{
			swap(a[p],a[i]);
			res=mod-res;
		}
		ll inv=Pow(a[i][i],mod-2);
		res=res*a[i][i]%mod;
		for(int j=i+1;j<=sz;j++)
		{
			ll f=a[j][i]*inv%mod;
			for(int k=i;k<=sz;k++)a[j][k]=(a[j][k]-f*a[i][k]%mod+mod)%mod;
		}
	}
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>n>>m>>t;
	for(int i=1;i<=m;i++)
	{
		int u,v;
		ll w;
		cin>>u>>v>>w;
		if(u==v)continue;
		w%=mod;
		if(t==0)
		{
			a[u][u]=(a[u][u]+w)%mod;
			a[v][v]=(a[v][v]+w)%mod;
			a[u][v]=(a[u][v]-w+mod)%mod;
			a[v][u]=(a[v][u]-w+mod)%mod;
		}
		else
		{
			a[v][v]=(a[v][v]+w)%mod;
			a[u][v]=(a[u][v]-w+mod)%mod;
		}
	}
	for(int i=2;i<=n;i++)
	{
		for(int j=2;j<=n;j++)a[i-1][j-1]=a[i][j];
	}
	cout<<det(n-1)<<'\n';
	return 0;
}
