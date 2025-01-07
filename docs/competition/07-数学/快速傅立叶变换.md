# 快速傅立叶变换（FFT）

## 实现

```cpp
using Comp=complex<double>;
const double pi=acos(-1.0);
const int N=1<<20;
Comp tmp[N<<1];
void FFT(Comp *f,int lim,int type)
{
	if(lim==1)return;
	for(int i=0;i<lim;i++)tmp[i]=f[i];
	for(int i=0;i<(lim>>1);i++)
	{
		f[i]=tmp[i<<1];
		f[i+(lim>>1)]=tmp[(i<<1)+1];
	}
	Comp *g=f,*h=f+(lim>>1);
	FFT(g,lim>>1,type);
	FFT(h,lim>>1,type);
	Comp cur(1,0),step(cos(2*pi/lim),sin(2*pi/lim)*type);
	for(int i=0;i<(lim>>1);i++)
	{
		tmp[i]=g[i]+cur*h[i];
		tmp[i+(lim>>1)]=g[i]-cur*h[i];
		cur*=step;
	}
	for(int i=0;i<lim;i++)f[i]=tmp[i];
}
```

## 例题

### 洛谷 P3803 【模板】多项式乘法（FFT）

```cpp
#include <bits/stdc++.h>
using namespace std;

using Comp=complex<double>;
const double pi=acos(-1.0);
const int N=1<<20;
Comp a[N<<1],b[N<<1],tmp[N<<1];
void FFT(Comp *f,int lim,int type)
{
	if(lim==1)return;
	for(int i=0;i<lim;i++)tmp[i]=f[i];
	for(int i=0;i<(lim>>1);i++)
	{
		f[i]=tmp[i<<1];
		f[i+(lim>>1)]=tmp[(i<<1)+1];
	}
	Comp *g=f,*h=f+(lim>>1);
	FFT(g,lim>>1,type);
	FFT(h,lim>>1,type);
	Comp cur(1,0),step(cos(2*pi/lim),sin(2*pi/lim)*type);
	for(int i=0;i<(lim>>1);i++)
	{
		tmp[i]=g[i]+cur*h[i];
		tmp[i+(lim>>1)]=g[i]-cur*h[i];
		cur*=step;
	}
	for(int i=0;i<lim;i++)f[i]=tmp[i];
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
	FFT(a,lim,1);
	FFT(b,lim,1);
	for(int i=0;i<=lim;i++)
	{
		a[i]*=b[i];
	}
	FFT(a,lim,-1);
	for(int i=0;i<=n+m;i++)
	{
		cout<<(int)(a[i].real()/lim+0.5)<<' ';
	}
	return 0;
}
```

### 洛谷 P1919 【模板】高精度乘法 | A*B Problem 升级版

```cpp
#include <bits/stdc++.h>
using namespace std;

using Comp=complex<double>;
const double pi=acos(-1.0);
const int N=1<<20;
Comp a[N<<1],b[N<<1],tmp[N<<1];
int c[N<<1];
void FFT(Comp *f,int lim,int type)
{
	if(lim==1)return;
	for(int i=0;i<lim;i++)tmp[i]=f[i];
	for(int i=0;i<(lim>>1);i++)
	{
		f[i]=tmp[i<<1];
		f[i+(lim>>1)]=tmp[(i<<1)+1];
	}
	Comp *g=f,*h=f+(lim>>1);
	FFT(g,lim>>1,type);
	FFT(h,lim>>1,type);
	Comp cur(1,0),step(cos(2*pi/lim),sin(2*pi/lim)*type);
	for(int i=0;i<(lim>>1);i++)
	{
		tmp[i]=g[i]+cur*h[i];
		tmp[i+(lim>>1)]=g[i]-cur*h[i];
		cur*=step;
	}
	for(int i=0;i<lim;i++)f[i]=tmp[i];
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
	FFT(a,lim,1);
	FFT(b,lim,1);
	for(int i=0;i<=lim;i++)a[i]*=b[i];
	FFT(a,lim,-1);
	for(int i=0;i<=n+m;i++)c[i]=a[i].real()/lim+0.5;
	int t=0;
	while(t<=n+m||c[t])
	{
		c[t+1]+=c[t]/10;
		c[t++]%=10;
	}
	for(int i=t-1;i>=0;i--)
	{
		cout<<c[i];
	}
	return 0;
}
```

