# 背包 DP

## 参考资料

- [背包 DP - OI Wiki](https://oi-wiki.org/dp/knapsack/)

## 0-1 背包

有 $n$ 个物品和一个容量为 $m$ 的背包，每个物品有重量 $w_i$ 和价值 $v_i$ 两种属性。

要求选若干物品放入背包使背包中物品的总价值最大，且背包中物品的总重量不超过背包的容量。

$$
f_j=\max{(f_j,f_{j-w_i}+v_i)}
$$

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=1005;
const int M=10005;
int w[N],v[N],f[M];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)
	{
		cin>>w[i]>>v[i];
	}
	for(int i=1;i<=n;i++)
	{
		for(int j=m;j>=w[i];j--)
		{
			f[j]=max(f[j],f[j-w[i]]+v[i]);
		}
	}
	cout<<f[m]<<'\n';
	return 0;
}
```

## 完全背包

有 $n$ 种物品和一个容量为 $m$ 的背包，每种物品有重量 $w_i$ 和价值 $v_i$ 两种属性。

要求选若干个物品放入背包使背包中物品的总价值最大，且背包中物品的总重量不超过背包的容量。

$$
f_j=\max{(f_j,f_{j-w_i}+v_i)}
$$

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=1005;
const int M=10005;
int w[N],v[N],f[M];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)
	{
		cin>>w[i]>>v[i];
	}
	for(int i=1;i<=n;i++)
	{
		for(int j=w[i];j<=m;j++)
		{
			f[j]=max(f[j],f[j-w[i]]+v[i]);
		}
	}
	cout<<f[m]<<'\n';
	return 0;
}
```

## 多重背包

有 $n$ 种物品和一个容量为 $m$ 的背包，每种物品有重量 $w_i$、价值 $v_i$、数量 $k_i$ 三种属性。

要求选若干个物品放入背包使背包中物品的总价值最大，且背包中物品的总重量不超过背包的容量。

:::tip

二进制分组：将每种物品拆分成不超过 $\log{k}$ 个由 $2^i$ 个物品「捆绑」而成的大物品。

:::

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=10005;
const int M=1000005;
int w[N],v[N],f[M];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	int cnt=0;
	for(int i=1;i<=n;i++)
	{
		int v1,w1,k;
		cin>>v1>>w1>>k;
		int b=1;
		while(b<k)
		{
			k-=b;
			v[++cnt]=v1*b;
			w[cnt]=w1*b;
			b<<=1;
		}
		v[++cnt]=v1*k;
		w[cnt]=w1*k;
	}
	n=cnt;
	for(int i=1;i<=n;i++)
	{
		for(int j=m;j>=w[i];j--)
		{
			f[j]=max(f[j],f[j-w[i]]+v[i]);
		}
	}
	cout<<f[m]<<'\n';
	return 0;
}
```

## 例题

<Problem id="P1048" />
