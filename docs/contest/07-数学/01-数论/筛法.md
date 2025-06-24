# 筛法

## 参考资料

- [筛法 - OI Wiki](https://oi-wiki.org/math/number-theory/sieve/)
- [埃拉托斯特尼筛法 - 维基百科](https://zh.wikipedia.org/wiki/埃拉托斯特尼筛法)

## 算法对比

|     算法名称     |    时间复杂度    |
| :--------------: | :--------------: |
|     朴素算法     |  $O(n\sqrt n)$   |
| 埃拉托斯特尼筛法 | $O(n\log\log n)$ |
|     欧拉筛法     |      $O(n)$      |

## 埃拉托斯特尼筛法

```cpp
void init()
{
	vis[0]=vis[1]=1;
	int cnt=0;
	for(ll i=2;i<N;i++)
	{
		if(vis[i])continue;
		pri[++cnt]=i;
		for(ll j=i*i;j<N;j+=i)vis[j]=1;
	}
}
```

:::tip

使用 `long long` 类型避免 `i*i` 溢出。

:::

## 欧拉筛法

### 素数

```cpp
void init()
{
	vis[0]=vis[1]=1;
	int cnt=0;
	for(int i=2;i<N;i++)
	{
		if(!vis[i])pri[++cnt]=i;
		for(int j=1;j<=cnt;j++)
		{
			if(i*pri[j]>=N)break;
			vis[i*pri[j]]=1;
			if(i%pri[j]==0)break;
		}
	}
}
```

### 其他函数

<Tabs>
<TabItem value="欧拉函数">

```cpp
void init()
{
	vis[0]=vis[1]=1;
	phi[1]=1;
	int cnt=0;
	for(int i=2;i<N;i++)
	{
		if(!vis[i])
		{
			pri[++cnt]=i;
			phi[i]=i-1;
		}
		for(int j=1;j<=cnt;j++)
		{
			if(i*pri[j]>=N)break;
			vis[i*pri[j]]=1;
			if(i%pri[j]==0)
			{
				phi[i*pri[j]]=phi[i]*pri[j];
				break;
			}
			phi[i*pri[j]]=phi[i]*phi[pri[j]];
		}
	}
}
```

</TabItem>
<TabItem value="莫比乌斯函数">

```cpp
void init()
{
	vis[0]=vis[1]=1;
	mu[1]=1;
	int cnt=0;
	for(int i=2;i<N;i++)
	{
		if(!vis[i])
		{
			pri[++cnt]=i;
			mu[i]=-1;
		}
		for(int j=1;j<=cnt;j++)
		{
			if(i*pri[j]>=N)break;
			vis[i*pri[j]]=1;
			if(i%pri[j]==0)
			{
				mu[i*pri[j]]=0;
				break;
			}
			mu[i*pri[j]]=-mu[i];
		}
	}
}
```

</TabItem>
<TabItem value="约数个数函数">

```cpp
void init()
{
	vis[0]=vis[1]=1;
	num[1]=d[1]=1;
	int cnt=0;
	for(int i=2;i<N;i++)
	{
		if(!vis[i])
		{
			pri[++cnt]=i;
			num[i]=d[i]=2;
		}
		for(int j=1;j<=cnt;j++)
		{
			if(i*pri[j]>=N)break;
			vis[i*pri[j]]=1;
			if(i%pri[j]==0)
			{
				num[i*pri[j]]=num[i]+1;
				d[i*pri[j]]=d[i]/num[i]*num[i*pri[j]];
				break;
			}
			num[i*pri[j]]=2;
			d[i*pri[j]]=d[i]*2;
		}
	}
}
```

</TabItem>
<TabItem value="约数和函数">

```cpp
void init()
{
	vis[0]=vis[1]=1;
	num[1]=sigma[1]=1;
	int cnt=0;
	for(int i=2;i<N;i++)
	{
		if(!vis[i])
		{
			pri[++cnt]=i;
			num[i]=sigma[i]=i+1;
		}
		for(int j=1;j<=cnt;j++)
		{
			if(i*pri[j]>=N)break;
			vis[i*pri[j]]=1;
			if(i%pri[j]==0)
			{
				num[i*pri[j]]=num[i]*pri[j]+1;
				sigma[i*pri[j]]=sigma[i]/num[i]*num[i*pri[j]];
				break;
			}
			num[i*pri[j]]=pri[j]+1;
			sigma[i*pri[j]]=sigma[i]*sigma[pri[j]];
		}
	}
}
```

</TabItem>
</Tabs>

## 例题

### 洛谷 P3383 【模板】线性筛素数

:::info[[洛谷 P3383 【模板】线性筛素数](https://www.luogu.com.cn/problem/P3383)]

给定一个范围 $n$，有 $q$ 个询问，每次输出第 $k$ 小的素数。（$n\le10^8,q\le10^6$）

:::

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N=100000005;
bool vis[N];
int pri[N];
void init()
{
	vis[0]=vis[1]=1;
	int cnt=0;
	for(int i=2;i<N;i++)
	{
		if(!vis[i])pri[++cnt]=i;
		for(int j=1;j<=cnt;j++)
		{
			if(i*pri[j]>=N)break;
			vis[i*pri[j]]=1;
			if(i%pri[j]==0)break;
		}
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	init();
	int n,q;
	cin>>n>>q;
	while(q--)
	{
		int k;
		cin>>k;
		cout<<pri[k]<<'\n';
	}
	return 0;
}
```

### 洛谷 P1865 A % B Problem

:::info[[洛谷 P1865 A % B Problem](https://www.luogu.com.cn/problem/P1865)]

给定 $n$ 组 $l,r$ 和最大值 $m$，求区间 $[l,r]$ 内质数的个数。（$n\le1000,m\le10^6$）

:::

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N=1000005;
bool vis[N];
int pri[N],sum[N];
void init()
{
	int cnt=0;
	vis[0]=vis[1]=1;
	for(int i=2;i<N;i++)
	{
		sum[i]=sum[i-1];
		if(!vis[i])
		{
			pri[++cnt]=i;
			sum[i]++;
		}
		for(int j=1;j<=cnt;j++)
		{
			if(i*pri[j]>=N)break;
			vis[i*pri[j]]=1;
			if(i%pri[j]==0)break;
		}
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	init();
	int n,m;
	cin>>n>>m;
	while(n--)
	{
		int l,r;
		cin>>l>>r;
		if(l>=1&&r<=m)cout<<sum[r]-sum[l-1]<<'\n';
		else cout<<"Crossing the line"<<'\n';
	}
	return 0;
}
```
