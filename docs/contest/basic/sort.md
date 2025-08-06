# 排序（Sort）

## 参考资料

- [排序简介 - OI Wiki](https://oi-wiki.org/basic/sort-intro/)
- [排序算法 - 维基百科](https://zh.wikipedia.org/zh-cn/排序算法)

## 算法对比

|          算法名称          |    平均时间     |   最坏时间    | 空间复杂度 | 排序方式  | 稳定性 |
| :------------------------: | :-------------: | :-----------: | :--------: | :-------: | :----: |
|  冒泡排序（Bubble Sort）   |    $O(n^2)$     |   $O(n^2)$    |   $O(1)$   | In-place  |  稳定  |
| 选择排序（Selection Sort） |    $O(n^2)$     |   $O(n^2)$    |   $O(1)$   | In-place  | 不稳定 |
| 插入排序（Insertion Sort） |    $O(n^2)$     |   $O(n^2)$    |   $O(1)$   | In-place  |  稳定  |
|    堆排序（Heap Sort）     |  $O(n\log{n})$  | $O(n\log{n})$ |   $O(1)$   | In-place  | 不稳定 |
|   归并排序（Merge Sort）   |  $O(n\log{n})$  | $O(n\log{n})$ |   $O(n)$   | Out-place |  稳定  |
|   快速排序（Quick Sort）   |  $O(n\log{n})$  |   $O(n^2)$    |   $O(n)$   | In-place  | 不稳定 |
|   希尔排序（Shell Sort）   | $O(n\log^2{n})$ |   $O(n^2)$    |   $O(1)$   | In-place  | 不稳定 |
| 计数排序（Counting Sort）  |    $O(n+m)$     |   $O(n+m)$    |  $O(n+m)$  | Out-place |  稳定  |
|   桶排序（Bucket Sort）    |     $O(n)$      |   $O(n^2)$    |   $O(m)$   | Out-place |  稳定  |
|   基数排序（Radix Sort）   |     $O(nk)$     |   $O(n^2)$    |  $O(n+k)$  | Out-place |  稳定  |

:::tip

$n$ 代表数据的规模，$m$ 代表数据的极差，$k$ 代表数值中的"数位"个数。

:::

## 性质

### 时间复杂度

任何基于比较的排序算法，其最坏情况时间复杂度至少为 $\Omega(n\log n)$，因为 $\log_2{(n!)}=\Theta(n\log n)$。（[证明](https://en.wikipedia.org/wiki/Comparison_sort)）

![](https://oi-wiki.org/basic/images/sort-intro-1.apng)

### 稳定性

对相同键值的元素排序时，能否保持原来的相对顺序。

:::tip

要让不稳定的排序算法变稳定，可以在键值相同时对元素编号排序。

:::

## 冒泡排序

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N=10005;
int a[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
	}
	for(int i=1;i<n;i++)
	{
		for(int j=1;j<=n-i;j++)
		{
			if(a[j]>a[j+1])swap(a[j],a[j+1]);
		}
	}
	for(int i=1;i<=n;i++)
	{
		cout<<a[i]<<' ';
	}
	return 0;
}
```

## 选择排序

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N=10005;
int a[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
	}
	for(int i=1;i<n;i++)
	{
		int k=i;
		for(int j=i+1;j<=n;j++)
		{
			if(a[j]<a[k])k=j;
		}
		swap(a[i],a[k]);
	}
	for(int i=1;i<=n;i++)
	{
		cout<<a[i]<<' ';
	}
	return 0;
}
```

## 插入排序

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N=10005;
int a[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
	}
	for(int i=2;i<=n;i++)
	{
		int k=a[i],j=i-1;
		while(j>=1&&a[j]>k)
		{
			a[j+1]=a[j];
			j--;
		}
		a[j+1]=k;
	}
	for(int i=1;i<=n;i++)
	{
		cout<<a[i]<<' ';
	}
	return 0;
}
```

## 归并排序

```cpp
#include <bits/stdc++.h>
#define mid (l+r>>1)
using namespace std;

using ll=long long;
const int N=100005;
int a[N],b[N];
void msort(int l,int r)
{
	if(l==r)return;
	msort(l,mid);
	msort(mid+1,r);
	int p1=l,p2=mid+1;
	for(int i=l;i<=r;i++)
	{
		if(p1<=mid&&(p2>r||a[p1]<=a[p2]))
		{
			b[i]=a[p1++];
		}
		else
		{
			b[i]=a[p2++];
		}
	}
	for(int i=l;i<=r;i++)a[i]=b[i];
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
	}
	msort(1,n);
	for(int i=1;i<=n;i++)
	{
		cout<<a[i]<<' ';
	}
	return 0;
}
```

## 快速排序

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N=100005;
int a[N];
void qsort(int l,int r)
{
	if(l>r)return;
	int i=l,j=r;
	while(i!=j)
	{
		while(a[j]>=a[l]&&i<j)j--;
		while(a[i]<=a[l]&&i<j)i++;
		if(i<j)swap(a[i],a[j]);
	}
	swap(a[l],a[i]);
	qsort(l,i-1);
	qsort(i+1,r);
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
	}
	qsort(1,n);
	for(int i=1;i<=n;i++)
	{
		cout<<a[i]<<' ';
	}
	return 0;
}
```

## 计数排序

```cpp
#include <bits/stdc++.h>
using namespace std;

const int inf=0x3f3f3f3f;
const int N=100005;
int a[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	int mn=inf,mx=0;
	for(int i=1;i<=n;i++)
	{
		int x;
		cin>>x;
		a[x]++;
		mn=min(mn,x);
		mx=max(mx,x);
	}
	for(int i=mn;i<=mx;i++)
	{
		while(a[i]--)cout<<i<<' ';
	}
	return 0;
}
```

## Tim Sort

- [TimSort 一个几乎没人知道的排序算法 | 时间复杂度最快达到了o(n) - bilibili](https://www.bilibili.com/video/BV1944y1E7as)

## STL

- [`std::qsort`](https://en.cppreference.com/w/cpp/algorithm/qsort.html)
- [`std::sort`](https://en.cppreference.com/w/cpp/algorithm/sort.html)
- [`std::nth_element`](https://en.cppreference.com/w/cpp/algorithm/nth_element.html)
- [`std::stable_sort`](https://en.cppreference.com/w/cpp/algorithm/stable_sort.html)
- [`std::partial_sort`](https://en.cppreference.com/w/cpp/algorithm/partial_sort.html)

## 例题

### 洛谷 P1177 【模板】排序

<Problem id="P1177" />

### 洛谷 P1908 逆序对

<Problem id="P1908" />
