# 消元

$$
\begin{cases}
  a_{1,1}x_1+a_{1,2}x_2+\dots+a_{1,n}x_n=a_{1,n+1} \\
  a_{2,1}x_1+a_{2,2}x_2+\dots+a_{2,n}x_n=a_{2,n+1} \\
  \vdots \\
  a_{n,1}x_1+a_{n,2}x_2+\dots+a_{n,n}x_n=a_{n,n+1} \\
\end{cases}
$$

## 参考资料

- [高斯消元 - OI Wiki](https://oi-wiki.org/math/numerical/gauss/)

## 算法对比

|     算法名称      | 时间复杂度 |  代码长度  | 需要回代 | 区分无解和无数解 |
| :---------------: | :--------: | :--------: | :------: | :--------------: |
| 高斯 - 约旦消元法 |  $O(n^3)$  | 约 $25$ 行 |    否    |       困难       |
|    高斯消元法     |  $O(n^3)$  | 约 $40$ 行 |    是    |       容易       |

## 高斯 - 约旦消元法

$$
\left\{
\begin{matrix}
  a_{1,1} & a_{1,2} & \dots & a_{1,n} & \mid a_{1,n+1} \\
  a_{2,1} & a_{2,2} & \dots & a_{2,n} & \mid a_{2,n+1} \\
  \vdots & \vdots & \ddots & \vdots & \vdots \\
  a_{n,1} & a_{n,2} & \dots & a_{n,n} & \mid a_{n,n+1}
\end{matrix}
\right.
\rightarrow
\left\{
\begin{matrix}
  1 & 0 & \dots & 0 & \mid a'_{1,n+1} \\
  0 & 1 & \dots & 0 & \mid a'_{2,n+1} \\
  \vdots & \vdots & \ddots & \vdots & \vdots \\
  0 & 0 & \dots & 1 & \mid a'_{n,n+1}
\end{matrix}
\right.
$$

```cpp
double a[N][N];
bool gauss(int n)
{
	for(int i=1;i<=n;i++)
	{
		int t=i;
		for(int j=i+1;j<=n;j++)
		{
			if(fabs(a[t][i])<fabs(a[j][i]))t=j;
		}
		if(fabs(a[t][i])<eps)return 0;
		swap(a[i],a[t]);
		double tmp=a[i][i];
		for(int j=1;j<=n+1;j++)a[i][j]/=tmp;
		for(int j=1;j<=n;j++)
		{
			if(i==j)continue;
			tmp=a[j][i]/a[i][i];
			for(int k=1;k<=n+1;k++)
			{
				a[j][k]-=a[i][k]*tmp;
			}
		}
	}
	return 1;
}
```

## 高斯消元法

$$
\left\{
\begin{matrix}
  a_{1,1} & a_{1,2} & \dots & a_{1,n} & \mid a_{1,n+1} \\
  a_{2,1} & a_{2,2} & \dots & a_{2,n} & \mid a_{2,n+1} \\
  \vdots & \vdots & \ddots & \vdots & \vdots \\
  a_{n,1} & a_{n,2} & \dots & a_{n,n} & \mid a_{n,n+1}
\end{matrix}
\right.
\rightarrow
\left\{
\begin{matrix}
  a'_{1,1} & a'_{1,2} & \dots & a_{1,n} & \mid a'_{1,n+1} \\
  0 & a_{2,2} & \dots & a'_{2,n} & \mid a'_{2,n+1} \\
  \vdots & \vdots & \ddots & \vdots & \vdots \\
  0 & 0 & \dots & a'_{n,n} & \mid a'_{n,n+1}
\end{matrix}
\right.
$$

:::tip

无唯一解：某行前 $n$ 个数均为 $0$。（$0+0+\dots+0$）

区分无解和无数解：

- 无解：最后结果不为 $0$。（$0+0+\dots+0\ne 0$）
- 无数解：最后结果为 $0$。（$0+0+\dots+0=0$）

:::

```cpp
double a[N][N],x[N];
int sgn(double u){return (u>eps)-(u<-eps);}
int gauss(int n)
{
	int r,c;
	for(r=1,c=1;r<=n&&c<=n;r++,c++)
	{
		int t=r;
		for(int j=r+1;j<=n;j++)
		{
			if(fabs(a[t][c])<fabs(a[j][c]))t=j;
		}
		swap(a[r],a[t]);
		if(sgn(a[r][c])==0)
		{
			r--;
			continue;
		}
		for(int j=r+1;j<=n;j++)
		{
			if(sgn(a[j][c])==0)continue;
			double tmp=a[j][c]/a[r][c];
			for(int k=c;k<=n+1;k++)
			{
				a[j][k]-=a[r][k]*tmp;
			}
			a[j][c]=0;
		}
	}
	for(int i=r;i<=n;i++)
	{
		if(sgn(a[i][c])!=0)return -1;
	}
	if(r<=n)return n-r+1;
	for(int i=n;i>=1;i--)
	{
		for(int j=i+1;j<=n;j++)
		{
			a[i][n+1]-=a[i][j]*x[j];
		}
		x[i]=a[i][n+1]/a[i][i];
	}
	return 0;
}
```

## 电阻计算器

每行输入两个正整数 $u$ 和 $v$ 以及一个实数 $w$，表示节点 $u$ 和 $v$ 之间有一个 $w$ 的电阻。

本程序可以计算节点 $s$ 到节点 $t$ 的等效电阻。

```cpp
#include <bits/stdc++.h>
using namespace std;

const double eps=1e-8;
const int N=1005;
double a[N][N];
bool gauss(int n)
{
	for(int i=1;i<=n;i++)
	{
		int t=i;
		for(int j=i+1;j<=n;j++)
		{
			if(fabs(a[t][i])<fabs(a[j][i]))t=j;
		}
		if(fabs(a[t][i])<eps)return 0;
		swap(a[i],a[t]);
		double tmp=a[i][i];
		for(int j=1;j<=n+1;j++)a[i][j]/=tmp;
		for(int j=1;j<=n;j++)
		{
			if(i==j)continue;
			tmp=a[j][i]/a[i][i];
			for(int k=1;k<=n+1;k++)
			{
				a[j][k]-=a[i][k]*tmp;
			}
		}
	}
	return 1;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int u,v,n=0;
	double r;
	while(cin>>u>>v>>r)
	{
		double g=1/r;
		a[u][u]-=g;
		a[v][v]-=g;
		a[u][v]+=g;
		a[v][u]+=g;
		n=max(n,max(u,v));
	}
	int s=1,t=n;
	for(int i=1;i<=n;i++)a[t][i]=(i==s);
	a[s][n+1]=1;
	gauss(n);
	cout<<fixed<<setprecision(6)<<a[t][n+1]<<'\n';
	return 0;
}
```

## 例题

### 洛谷 P3389 【模板】高斯消元法

<Problem id="P3389" />

### 洛谷 P2455 [SDOI2006] 线性方程组

<Problem id="P2455" />

### 洛谷 P7112 【模板】行列式求值

<Problem id="P7112" />

### POJ 3532 Resistance

<Problem id="POJ3532" />
