#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=1<<19;
const int mod=167772161,g=3;
int root_lim,bit;
int rev[N],rt[N],inv_num[N],fac[N],ifac[N];
int a[N],b[N],u[N],v[N],der[N],pinv[N];
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
void inverse(const int *a,int *b,int n)
{
	if(n==1){b[0]=Pow(a[0],mod-2);return;}
	int m=(n+1)>>1;
	inverse(a,b,m);
	int len=1;
	while(len<n+n)len<<=1;
	for(int i=0;i<n;i++)u[i]=a[i];
	for(int i=n;i<len;i++)u[i]=0;
	for(int i=m;i<len;i++)b[i]=0;
	ntt(u,len);
	ntt(b,len);
	for(int i=0;i<len;i++)b[i]=(ll)b[i]*(2-(ll)u[i]*b[i]%mod+mod)%mod;
	intt(b,len);
	for(int i=n;i<len;i++)b[i]=0;
}
void poly_ln(int *a,int n)
{
	inverse(a,pinv,n);
	int len=1;
	while(len<n+n)len<<=1;
	for(int i=1;i<n;i++)der[i-1]=(ll)a[i]*i%mod;
	for(int i=n-1;i<len;i++)der[i]=0;
	for(int i=n;i<len;i++)pinv[i]=0;
	ntt(der,len);
	ntt(pinv,len);
	for(int i=0;i<len;i++)der[i]=(ll)der[i]*pinv[i]%mod;
	intt(der,len);
	for(int i=n-1;i;i--)a[i]=(ll)der[i-1]*inv_num[i]%mod;
	a[0]=0;
}
void poly_exp(const int *a,int *b,int n)
{
	if(n==1){b[0]=1;return;}
	int m=(n+1)>>1;
	poly_exp(a,b,m);
	int len=1;
	while(len<n+n)len<<=1;
	for(int i=0;i<m;i++)v[i]=b[i];
	for(int i=m;i<len;i++)v[i]=0;
	poly_ln(v,n);
	for(int i=0;i<n;i++)v[i]=(a[i]-v[i]+(i==0)+mod)%mod;
	for(int i=n;i<len;i++)v[i]=0;
	for(int i=m;i<len;i++)b[i]=0;
	ntt(v,len);
	ntt(b,len);
	for(int i=0;i<len;i++)b[i]=(ll)b[i]*v[i]%mod;
	intt(b,len);
	for(int i=n;i<len;i++)b[i]=0;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,k;
	cin>>n>>k;
	if(k>n)
	{
		for(int i=0;i<=n;i++)cout<<0<<' ';
		return 0;
	}
	int m=n-k+1;
	init_ntt(m<<1);
	inv_num[1]=1;
	for(int i=2;i<=n+1;i++)inv_num[i]=(ll)(mod-mod/i)*inv_num[mod%i]%mod;
	fac[0]=ifac[0]=1;
	for(int i=1;i<=n;i++)fac[i]=(ll)fac[i-1]*i%mod;
	ifac[n]=Pow(fac[n],mod-2);
	for(int i=n;i;i--)ifac[i-1]=(ll)ifac[i]*i%mod;
	for(int i=0;i<m;i++)a[i]=inv_num[i+1];
	poly_ln(a,m);
	for(int i=0;i<m;i++)a[i]=(ll)a[i]*k%mod;
	poly_exp(a,b,m);
	for(int i=0;i<k;i++)cout<<0<<' ';
	for(int i=k;i<=n;i++)cout<<(ll)b[i-k]*fac[i]%mod*ifac[k]%mod<<' ';
	return 0;
}
