#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=1<<19;
const ll mod=167772161,g=3;
int rev[N];
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
void ntt(ll *a,int n,int op)
{
	for(int i=0;i<n;i++)
	{
		if(i<rev[i])swap(a[i],a[rev[i]]);
	}
	for(int len=1;len<n;len<<=1)
	{
		ll wn=Pow(op==1?g:Pow(g,mod-2),(mod-1)/(len<<1));
		for(int i=0;i<n;i+=len<<1)
		{
			ll w=1;
			for(int j=0;j<len;j++,w=w*wn%mod)
			{
				ll x=a[i+j],y=w*a[i+j+len]%mod;
				a[i+j]=(x+y)%mod;
				a[i+j+len]=(x-y+mod)%mod;
			}
		}
	}
	if(op==-1)
	{
		ll inv=Pow(n,mod-2);
		for(int i=0;i<n;i++)a[i]=a[i]*inv%mod;
	}
}
ll fac[N],inv[N],a[N],b[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	fac[0]=1;
	for(int i=1;i<=n;i++)fac[i]=fac[i-1]*i%mod;
	inv[n]=Pow(fac[n],mod-2);
	for(int i=n;i;i--)inv[i-1]=inv[i]*i%mod;
	for(int i=0;i<=n;i++)
	{
		a[i]=(i&1?mod-inv[i]:inv[i]);
		b[i]=Pow(i,n)*inv[i]%mod;
	}
	int lim=1,bit=0;
	while(lim<=n+n)
	{
		lim<<=1;
		bit++;
	}
	for(int i=0;i<lim;i++)rev[i]=(rev[i>>1]>>1)|((i&1)<<(bit-1));
	ntt(a,lim,1);
	ntt(b,lim,1);
	for(int i=0;i<lim;i++)a[i]=a[i]*b[i]%mod;
	ntt(a,lim,-1);
	for(int i=0;i<=n;i++)cout<<a[i]<<' ';
	return 0;
}
