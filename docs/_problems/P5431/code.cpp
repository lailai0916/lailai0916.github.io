#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=5000005;
int mod;
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
ll a[N],p[N],q[N];
int read()
{
	int x=0,f=1;char c=getchar_unlocked();
	while(c<'0'||c>'9'){if(c=='-')f=-1;c=getchar_unlocked();}
	while(c>='0'&&c<='9')x=x*10+c-48,c=getchar_unlocked();
	return x*f;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,k;
	n=read();mod=read();k=read();
	for(int i=1;i<=n;i++)a[i]=read();
	p[0]=q[n+1]=1;
	for(int i=1;i<=n;i++)p[i]=p[i-1]*a[i]%mod;
	for(int i=n;i>=1;i--)q[i]=q[i+1]*a[i]%mod;
	ll inv=Pow(p[n],mod-2),ans=0,cur=k;
	for(int i=1;i<=n;i++)
	{
		ans=(ans+cur*inv%mod*p[i-1]%mod*q[i+1]%mod)%mod;
		cur=cur*k%mod;
	}
	cout<<ans<<'\n';
	return 0;
}
