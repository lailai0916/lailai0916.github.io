#include <bits/stdc++.h>
using namespace std;

using Comp=complex<double>;
const double pi=acos(-1.0);
const int N=1<<20;
Comp a[N<<1],b[N<<1],t[N<<1];
int c[N<<1];
void fft(Comp *f,int n,int type)
{
	if(n==1)return;
	int mid=n>>1;
	for(int i=0;i<n;i++)t[i]=f[i];
	for(int i=0;i<mid;i++)
	{
		f[i]=t[i<<1];
		f[i+mid]=t[i<<1|1];
	}
	Comp *g=f,*h=f+mid;
	fft(g,mid,type);
	fft(h,mid,type);
	Comp cur(1,0),step(cos(pi*2/n),sin(pi*2/n)*type);
	for(int i=0;i<mid;i++)
	{
		t[i]=g[i]+cur*h[i];
		t[i+mid]=g[i]-cur*h[i];
		cur=cur*step;
	}
	for(int i=0;i<n;i++)f[i]=t[i];
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
	int lim=1;
	while(lim<=n+m)lim<<=1;
	fft(a,lim,1);
	fft(b,lim,1);
	for(int i=0;i<lim;i++)a[i]=a[i]*b[i];
	fft(a,lim,-1);
	for(int i=0;i<=n+m;i++)c[i]=a[i].real()/lim+0.5;
	int cnt=0;
	while(cnt<=n+m||c[cnt])
	{
		c[cnt+1]+=c[cnt]/10;
		c[cnt++]%=10;
	}
	for(int i=cnt-1;i>=0;i--)cout<<c[i];
	return 0;
}
