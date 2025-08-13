# 矩阵

## 参考资料

- [矩阵 - OI Wiki](https://oi-wiki.org/math/linear-algebra/matrix/)

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
				res.a[i][j]=i==j;
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

<Problem id="P3390" />

### 洛谷 P1939 矩阵加速（数列）

<Problem id="P1939" />
