#include <bits/stdc++.h>
using namespace std;

using Comp=complex<double>;
const double pi=acos(-1);
const int N=1<<20;
Comp a[N<<1],b[N<<1],t[N<<1];
void fft(Comp *f,int n,int type)
{
	if(n==1)return;
	int mid=n>>1;
	Comp *g=f,*h=f+mid;
	for(int i=0;i<n;i++)t[i]=f[i];
	for(int i=0;i<mid;i++)
	{
		g[i]=t[i<<1];
		h[i]=t[i<<1|1];
	}
	fft(g,mid,type);
	fft(h,mid,type);
	Comp cur(1,0),step(cos(pi*2/n),sin(pi*2/n)*type);
	for(int i=0;i<mid;i++)
	{
		t[i]=g[i]+cur*h[i];
		t[i+mid]=g[i]-cur*h[i];
		cur*=step;
	}
	for(int i=0;i<n;i++)f[i]=t[i];
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=0;i<=n;i++)
	{
		double x;
		cin>>x;
		a[i]=Comp(x,0);
	}
	for(int i=0;i<=m;i++)
	{
		double x;
		cin>>x;
		b[i]=Comp(x,0);
	}
	int lim=1;
	while(lim<=n+m)lim<<=1;
	fft(a,lim,1);
	fft(b,lim,1);
	for(int i=0;i<lim;i++)a[i]*=b[i];
	fft(a,lim,-1);
	for(int i=0;i<=n+m;i++)cout<<int(a[i].real()/lim+0.5)<<' ';
	return 0;
}
