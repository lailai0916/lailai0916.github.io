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

<Problem id="P3803" />

### 洛谷 P1919 【模板】高精度乘法 | A*B Problem 升级版

<Problem id="P1919" />
