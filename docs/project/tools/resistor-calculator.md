# 电阻计算器

每行输入两个正整数 $u$ 和 $v$，以及一个实数 $w$，表示节点 $u$ 和 $v$ 之间有一个 $w$ 的电阻。

本程序可以计算节点 $s$ 到节点 $t$ 的等效电阻。

## 代码

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
