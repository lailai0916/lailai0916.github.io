# 动态规划基础

## 参考资料

- [动态规划基础 - OI Wiki](https://oi-wiki.org/dp/basic/)
- [最长递增子序列 - 维基百科](https://zh.wikipedia.org/zh-cn/最长递增子序列)

## 最长上升子序列（LIS）

最长上升子序列：找到给定序列的一个子序列，使得这个子序列元素的数值依次递增，并且这个子序列的长度尽可能大。

<Tabs>
<TabItem value="动态规划">

```cpp
for(int i=1;i<=n;i++)
{
	f[i]=1;
	for(int j=1;j<i;j++)
	{
		if(a[j]<a[i])f[i]=max(f[i],f[j]+1);
	}
	ans=max(ans,f[i]);
}
```

</TabItem>
<TabItem value="二分查找">

```cpp
for(int i=1;i<=n;i++)
{
	int k=lower_bound(b+1,b+n+1,a[i])-b;
	b[k]=a[i];
	ans=max(ans,k);
}
```

</TabItem>
<TabItem value="树状数组">

```cpp
for(int i=1;i<=n;i++)
{
	int k=query(a[i]-1)+1;
	update(a[i],k);
	ans=max(ans,k);
}
```

</TabItem>
</Tabs>

## 例题

### 洛谷 B3637 最长上升子序列

<Problem id="B3637" />

### 洛谷 P1216 [IOI 1994] 数字三角形 Number Triangles

<Problem id="P1216" />

### 洛谷 P2758 编辑距离

<Problem id="P2758" />
