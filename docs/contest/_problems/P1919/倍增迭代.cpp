#include <bits/stdc++.h>
using namespace std;

using Comp=complex<double>;
const double pi=acos(-1.0);
const int N=1<<20;
Comp a[N<<1],b[N<<1];
int c[N<<1],r[N<<1];
void fft(Comp *f,int n,int type)
{
	for(int i=0;i<n;i++)
	{
		if(i<r[i])swap(f[i],f[r[i]]);
	}
	for(int k=1;k<n;k<<=1)
	{
		Comp step(cos(pi/k),sin(pi/k)*type);
		for(int i=0;i<n;i+=k<<1)
		{
			Comp cur(1,0);
			for(int j=0;j<k;j++)
			{
				Comp x=f[i+j],y=f[i+j+k]*cur;
				f[i+j]=x+y;
				f[i+j+k]=x-y;
				cur=cur*step;
			}
		}
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	string s1,s2;
	cin>>s1>>s2;
	int n=s1.length()-1,m=s2.length()-1;
	for(int i=0;i<=n;i++)a[i]=Comp(s1[n-i]-'0',0);
	for(int i=0;i<=m;i++)b[i]=Comp(s2[m-i]-'0',0);
	int lim=1,cnt=0;
	while(lim<=n+m){lim<<=1;cnt++;}
	for(int i=0;i<lim;i++)
	{
		r[i]=r[i>>1]>>1|(i&1)<<cnt-1;
	}
	fft(a,lim,1);
	fft(b,lim,1);
	for(int i=0;i<lim;i++)a[i]=a[i]*b[i];
	fft(a,lim,-1);
	for(int i=0;i<=n+m;i++)c[i]=a[i].real()/lim+0.5;
	int dig=0;
	while(dig<=n+m||c[dig])
	{
		c[dig+1]+=c[dig]/10;
		c[dig++]%=10;
	}
	for(int i=dig-1;i>=0;i--)cout<<c[i];
	return 0;
}
