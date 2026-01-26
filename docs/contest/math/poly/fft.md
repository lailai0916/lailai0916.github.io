---
title: '快速傅里叶变换（FFT）'
---

## 参考资料

- [快速傅里叶变换 - OI Wiki](https://oi-wiki.org/math/poly/fft/)

## 思想

首先进行正变换，然后逐位相乘，最后通过逆变换得到答案。

## 实现

### 分治递归

```cpp
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
		cur=cur*step;
	}
	for(int i=0;i<n;i++)f[i]=t[i];
}
```

### 倍增迭代

```cpp
void fft(Comp *f,int n,int type)
{
	for(int i=0;i<n;i++)if(i<r[i])swap(f[i],f[r[i]]);
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
```

## 例题

<Problem id="P3803" />

<Problem id="P1919" />
