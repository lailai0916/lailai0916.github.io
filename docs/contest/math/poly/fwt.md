# 快速沃尔什变换（FWT）

## 参考资料

- [快速沃尔什变换 - OI Wiki](https://oi-wiki.org/math/poly/fwt/)
- [沃尔什转换 - 维基百科](https://zh.wikipedia.org/zh-cn/沃爾什轉換)

## 思想

详见 [题解：P4717 【模板】快速莫比乌斯/沃尔什变换 (FMT/FWT)](/blog/solution/P4717)

## 实现

### 分治递归

<Tabs>
<TabItem value="按位或（or）">

```cpp
void fmt_or(ll *a,int n,int type)
{
	if(n==1)return;
	int mid=n>>1;
	ll *a0=a,*a1=a+mid;
	fmt_or(a0,mid,type);
	fmt_or(a1,mid,type);
	for(int i=0;i<mid;i++)a1[i]=(a1[i]+a0[i]*type+mod)%mod;
}
```

</TabItem>
<TabItem value="按位与（and）">

```cpp
void fmt_and(ll *a,int n,int type)
{
	if(n==1)return;
	int mid=n>>1;
	ll *a0=a,*a1=a+mid;
	fmt_and(a0,mid,type);
	fmt_and(a1,mid,type);
	for(int i=0;i<mid;i++)a0[i]=(a0[i]+a1[i]*type+mod)%mod;
}
```

</TabItem>
<TabItem value="按位异或（xor）">

```cpp
void fwt_xor(ll *a,int n,int type)
{
	if(n==1)return;
	int mid=n>>1;
	ll *a0=a,*a1=a+mid;
	fwt_xor(a0,mid,type);
	fwt_xor(a1,mid,type);
	for(int i=0;i<mid;i++)
	{
		ll x=a0[i],y=a1[i],t=type==1?1:mod+1>>1;
		a0[i]=(x+y)*t%mod;
		a1[i]=(x-y+mod)*t%mod;
	}
}
```

</TabItem>
<TabItem value="按位同或（xnor）">

```cpp
void fwt_xnor(ll *a,int n,int type)
{
	if(n==1)return;
	int mid=n>>1;
	ll *a0=a,*a1=a+mid;
	fwt_xnor(a0,mid,type);
	fwt_xnor(a1,mid,type);
	for(int i=0;i<mid;i++)
	{
		ll x=a0[i],y=a1[i],t=type==1?1:mod+1>>1;
		a0[i]=(y-x+mod)*t%mod;
		a1[i]=(y+x)*t%mod;
	}
}
```

</TabItem>
</Tabs>

### 倍增迭代

<Tabs>
<TabItem value="按位或（or）">

```cpp
void fmt_or(ll *a,int n,int type)
{
	for(int k=1;k<n;k<<=1)
	{
		for(int i=0;i<n;i+=k<<1)
		{
			for(int j=0;j<k;j++)
			{
				a[i+j+k]=(a[i+j+k]+a[i+j]*type+mod)%mod;
			}
		}
	}
}
```

</TabItem>
<TabItem value="按位与（and）">

```cpp
void fmt_and(ll *a,int n,int type)
{
	for(int k=1;k<n;k<<=1)
	{
		for(int i=0;i<n;i+=k<<1)
		{
			for(int j=0;j<k;j++)
			{
				a[i+j]=(a[i+j]+a[i+j+k]*type+mod)%mod;
			}
		}
	}
}
```

</TabItem>
<TabItem value="按位异或（xor）">

```cpp
void fwt_xor(ll *a,int n,int type)
{
	for(int k=1;k<n;k<<=1)
	{
		for(int i=0;i<n;i+=k<<1)
		{
			for(int j=0;j<k;j++)
			{
				ll x=a[i+j],y=a[i+j+k],t=type==1?1:mod+1>>1;
				a[i+j]=(x+y)*t%mod;
				a[i+j+k]=(x-y+mod)*t%mod;
			}
		}
	}
}
```

</TabItem>
<TabItem value="按位同或（xnor）">

```cpp
void fwt_xnor(ll *a,int n,int type)
{
	for(int k=1;k<n;k<<=1)
	{
		for(int i=0;i<n;i+=k<<1)
		{
			for(int j=0;j<k;j++)
			{
				ll x=a[i+j],y=a[i+j+k],t=type==1?1:mod+1>>1;
				a[i+j]=(y-x+mod)*t%mod;
				a[i+j+k]=(y+x)*t%mod;
			}
		}
	}
}
```

</TabItem>
</Tabs>

### 高维前缀和

<Tabs>
<TabItem value="按位或（or）">

```cpp
void fmt_or(ll *a,int n,int type)
{
	for(int i=1;i<n;i<<=1)
	{
		for(int j=0;j<n;j++)
		{
			if(i&j)a[j]=(a[j]+a[i^j]*type+mod)%mod;
		}
	}
}
```

</TabItem>
<TabItem value="按位与（and）">

```cpp
void fmt_and(ll *a,int n,int type)
{
	for(int i=1;i<n;i<<=1)
	{
		for(int j=0;j<n;j++)
		{
			if(!(i&j))a[j]=(a[j]+a[i^j]*type+mod)%mod;
		}
	}
}
```

</TabItem>
</Tabs>

## 例题

### 洛谷 P4717 【模板】快速莫比乌斯/沃尔什变换 (FMT/FWT)

<Problem id="P4717" />

### 洛谷 P6097 【模板】子集卷积

<Problem id="P6097" />
