# 矩阵

## 实现

```cpp
struct Mat
{
	ll a[N][N];
	Mat operator*(const Mat &rhs) const
	{
		Mat res;
		for(int i=0;i<N;i++)
		{
			for(int j=0;j<N;j++)
			{
				res.a[i][j]=0;
				for(int k=0;k<N;k++)
				{
					res.a[i][j]=(res.a[i][j]+a[i][k]*rhs.a[k][j])%mod;
				}
			}
		}
		return res;
	}
	Mat operator^(ll rhs)
	{
		Mat res,tmp=*this;
		for(int i=0;i<N;i++)
		{
			for(int j=0;j<N;j++)
			{
				res.a[i][j]=(i==j);
			}
		}
		while(rhs)
		{
			if(rhs&1)res=res*tmp;
			tmp=tmp*tmp;
			rhs>>=1;
		}
		return res;
	}
};
```

## 例题

### 洛谷 P3390 【模板】矩阵快速幂

:::info[[P3390 【模板】矩阵快速幂](https://www.luogu.com.cn/problem/P3390)]

给定 $n\times n$ 的矩阵 $A$，求 $A^k$。

:::

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int mod=1000000007;
const int N=105;
int n;
struct Mat
{
	ll a[N][N];
	Mat operator*(const Mat &rhs) const
	{
		Mat res;
		for(int i=0;i<n;i++)
		{
			for(int j=0;j<n;j++)
			{
				res.a[i][j]=0;
				for(int k=0;k<N;k++)
				{
					res.a[i][j]=(res.a[i][j]+a[i][k]*rhs.a[k][j])%mod;
				}
			}
		}
		return res;
	}
	Mat operator^(ll rhs)
	{
		Mat res,tmp=*this;
		for(int i=0;i<N;i++)
		{
			for(int j=0;j<N;j++)
			{
				res.a[i][j]=(i==j);
			}
		}
		while(rhs)
		{
			if(rhs&1)res=res*tmp;
			tmp=tmp*tmp;
			rhs>>=1;
		}
		return res;
	}
};
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	ll k;
	cin>>n>>k;
	Mat mat;
	for(int i=0;i<n;i++)
	{
		for(int j=0;j<n;j++)
		{
			cin>>mat.a[i][j];
		}
	}
	mat=mat^k;
	for(int i=0;i<n;i++)
	{
		for(int j=0;j<n;j++)
		{
			cout<<mat.a[i][j]<<' ';
		}
		cout<<'\n';
	}
	return 0;
}
```

### 洛谷 P1939 矩阵加速（数列）

:::info[[洛谷 P1939 矩阵加速（数列）](https://www.luogu.com.cn/problem/P1939)]

已知一个数列 $a$，它满足：  

$$
a_x=
\begin{cases}
 1 & x \in\{1,2,3\} \\ 
 a_{x-1}+a_{x-3} & x \geq 4
\end{cases}
$$

求 $a$ 数列的第 $n$ 项对 $10^9+7$ 取余的值。

:::

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int mod=1e9+7;
const int N=3;
struct Mat
{
	ll a[N][N];
	Mat operator*(const Mat &rhs) const
	{
		Mat res;
		for(int i=0;i<N;i++)
		{
			for(int j=0;j<N;j++)
			{
				res.a[i][j]=0;
				for(int k=0;k<N;k++)
				{
					res.a[i][j]=(res.a[i][j]+a[i][k]*rhs.a[k][j])%mod;
				}
			}
		}
		return res;
	}
	Mat operator^(ll rhs)
	{
		Mat res,tmp=*this;
		for(int i=0;i<N;i++)
		{
			for(int j=0;j<N;j++)
			{
				res.a[i][j]=(i==j);
			}
		}
		while(rhs)
		{
			if(rhs&1)res=res*tmp;
			tmp=tmp*tmp;
			rhs>>=1;
		}
		return res;
	}
};
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int T;
	cin>>T;
	while(T--)
	{
		ll n;
		cin>>n;
		Mat mat={{{1,0,1},{1,0,0},{0,1,0}}};
		mat=mat^(n-1);
		cout<<mat.a[0][0]<<'\n';
	}
	return 0;
}
```
