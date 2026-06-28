#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=1<<18;
const int mod=998244353;
const int g=3;
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
int rev[N];
void ntt(ll *a,int n,int op)
{
	for(int i=0;i<n;i++)
	{
		if(i<rev[i])swap(a[i],a[rev[i]]);
	}
	for(int len=1;len<n;len<<=1)
	{
		ll wn=Pow(g,op==1?(mod-1)/(len<<1):mod-1-(mod-1)/(len<<1));
		for(int i=0;i<n;i+=len<<1)
		{
			ll w=1;
			for(int j=0;j<len;j++)
			{
				ll x=a[i+j],y=w*a[i+j+len]%mod;
				a[i+j]=(x+y)%mod;
				a[i+j+len]=(x-y+mod)%mod;
				w=w*wn%mod;
			}
		}
	}
	if(op==-1)
	{
		ll inv=Pow(n,mod-2);
		for(int i=0;i<n;i++)a[i]=a[i]*inv%mod;
	}
}
ll f[N],g0[N],tmp[N];
void inverse(ll *a,ll *b,int n)
{
	if(n==1){b[0]=Pow(a[0],mod-2);return;}
	inverse(a,b,(n+1)>>1);
	int len=1;
	while(len<n<<1)len<<=1;
	for(int i=0;i<len;i++)rev[i]=(rev[i>>1]>>1)|((i&1)?len>>1:0);
	for(int i=0;i<len;i++)tmp[i]=i<n?a[i]:0;
	ntt(tmp,len,1);
	ntt(b,len,1);
	for(int i=0;i<len;i++)b[i]=(2-tmp[i]*b[i]%mod+mod)%mod*b[i]%mod;
	ntt(b,len,-1);
	for(int i=n;i<len;i++)b[i]=0;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=0;i<n;i++)cin>>f[i];
	inverse(f,g0,n);
	for(int i=0;i<n;i++)cout<<g0[i]<<' ';
	return 0;
}
