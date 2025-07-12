# 最长上升子序列（LIS）

最长上升子序列：找到给定序列的一个子序列，使得这个子序列元素的数值依次递增，并且这个子序列的长度尽可能大。

## 参考资料

- [最长递增子序列 - 维基百科](https://zh.wikipedia.org/wiki/最长递增子序列)

## 二分查找

```cpp
for(int i=1;i<=n;i++)
{
    int k=lower_bound(b+1,b+n+1,a[i])-b;
    b[k]=a[i];
    ans=max(ans,k);
}
```

## 树状数组

```cpp
for(int i=1;i<=n;i++)
{
    int k=query(a[i]-1)+1;
    update(a[i],k);
    ans=max(ans,k);
}
```

## 例题

### 洛谷 B3637 最长上升子序列

<Problem id="B3637" />
