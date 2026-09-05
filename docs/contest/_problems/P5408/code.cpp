#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=1<<19;
const int mod=167772161,g=3;
int root_lim,bit;
int rev[N],rt[N],fac[N],ifac[N];
int f[N],shifted[N],product[N],u[N],v[N];
unsigned long long buf[N];
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
void init_ntt(int n)
{
	root_lim=1;
	while(root_lim<n)root_lim<<=1;
	bit=__builtin_ctz(root_lim);
	for(int i=1;i<root_lim;i++)rev[i]=(rev[i>>1]>>1)|((i&1)<<(bit-1));
	int w=Pow(g,(mod-1)/root_lim);
	rt[root_lim>>1]=1;
	for(int i=(root_lim>>1)+1;i<root_lim;i++)rt[i]=(ll)rt[i-1]*w%mod;
	for(int i=(root_lim>>1)-1;i;i--)rt[i]=rt[i<<1];
}
void ntt(int *a,int n)
{
	int shift=bit-__builtin_ctz(n);
	for(int i=0;i<n;i++)buf[rev[i]>>shift]=a[i];
	for(int len=1;len<n;len<<=1)
	{
		for(int i=0;i<n;i+=len<<1)
		{
			for(int j=0;j<len;j++)
			{
				unsigned long long y=buf[i+j+len]*rt[len+j]%mod;
				buf[i+j+len]=buf[i+j]+mod-y;
				buf[i+j]+=y;
			}
		}
	}
	for(int i=0;i<n;i++)a[i]=buf[i]%mod;
}
void intt(int *a,int n)
{
	reverse(a+1,a+n);
	ntt(a,n);
	int inv=mod-(mod-1)/n;
	for(int i=0;i<n;i++)a[i]=(ll)a[i]*inv%mod;
}
void shift_poly(const int *a,int n,int c,int *b)
{
	u[0]=1;
	for(int i=1;i<=n;i++)u[i]=(ll)u[i-1]*c%mod;
	for(int i=0;i<=n;i++)
	{
		u[i]=(ll)u[i]*ifac[i]%mod;
		v[i]=(ll)a[i]*fac[i]%mod;
	}
	reverse(u,u+n+1);
	int len=1;
	while(len<=n+n)len<<=1;
	for(int i=n+1;i<len;i++)u[i]=v[i]=0;
	ntt(u,len);
	ntt(v,len);
	for(int i=0;i<len;i++)u[i]=(ll)u[i]*v[i]%mod;
	intt(u,len);
	for(int i=0;i<=n;i++)b[i]=(ll)u[n+i]*ifac[i]%mod;
}
void multiply(const int *a,const int *b,int n,int *c)
{
	int len=1;
	while(len<n+n-1)len<<=1;
	for(int i=0;i<n;i++)u[i]=a[i],v[i]=b[i];
	for(int i=n;i<len;i++)u[i]=v[i]=0;
	ntt(u,len);
	ntt(v,len);
	for(int i=0;i<len;i++)u[i]=(ll)u[i]*v[i]%mod;
	intt(u,len);
	for(int i=0;i<n+n-1;i++)c[i]=u[i];
}
void solve(int n)
{
	if(n==0){f[0]=1;return;}
	int m=n>>1;
	solve(m);
	shift_poly(f,m,m,shifted);
	multiply(f,shifted,m+1,product);
	if(!(n&1))
	{
		for(int i=0;i<=n;i++)f[i]=product[i];
		return;
	}
	for(int i=0;i<=n;i++)
	{
		f[i]=(i?product[i-1]:0)+(ll)(n-1)*(i<n?product[i]:0)%mod;
		if(f[i]>=mod)f[i]-=mod;
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	init_ntt(n+1);
	fac[0]=1;
	for(int i=1;i<=n;i++)fac[i]=(ll)fac[i-1]*i%mod;
	ifac[n]=Pow(fac[n],mod-2);
	for(int i=n;i;i--)ifac[i-1]=(ll)ifac[i]*i%mod;
	solve(n);
	for(int i=0;i<=n;i++)cout<<f[i]<<' ';
	return 0;
}
