# 筛法

## 参考资料

- [筛法 - OI Wiki](https://oi-wiki.org/math/number-theory/sieve/)
- [埃拉托斯特尼筛法 - 维基百科](https://zh.wikipedia.org/zh-cn/埃拉托斯特尼筛法)

## 算法对比

|     算法名称     |    时间复杂度    |
| :--------------: | :--------------: |
|     朴素算法     |  $O(n\sqrt n)$   |
| 埃拉托斯特尼筛法 | $O(n\log\log n)$ |
|     欧拉筛法     |      $O(n)$      |

## 埃拉托斯特尼筛法

埃拉托斯特尼筛法（Sieve of Eratosthenes）简称埃氏筛法。

```cpp
void sieve()
{
	vis[0]=vis[1]=1;
	for(int i=2;i*i<N;i++)
	{
		if(vis[i])continue;
		for(int j=i*i;j<N;j+=i)vis[j]=1;
	}
	int cnt=0;
	for(int i=2;i<N;i++)
	{
		if(vis[i])continue;
		pri[++cnt]=i;
	}
}
```

## 欧拉筛法

欧拉筛法（Sieve of Euler）也称为线性筛法。

### 素数

```cpp
void sieve()
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

### 数论函数

<Tabs>
<TabItem value="欧拉函数">

```cpp
void sieve()
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
void sieve()
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
void sieve()
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
void sieve()
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

<Problem id="P3383" />

### 洛谷 P1865 A % B Problem

<Problem id="P1865" />
