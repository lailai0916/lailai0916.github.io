# ST 表

## 参考资料

- [ST 表 - OI Wiki](https://oi-wiki.org/ds/sparse-table/)

## 实现

```cpp
struct ST
{
	ll a[N][20];
	void init(int n)
	{
		for(int k=1;k<=__lg(n);k++)
		{
			for(int i=1;i<=n-(1<<k)+1;i++)
			{
				a[i][k]=max(a[i][k-1],a[i+(1<<(k-1))][k-1]);
			}
		}
	}
	ll query(int l,int r)
	{
		int k=__lg(r-l+1);
		return max(a[l][k],a[r-(1<<k)+1][k]);
	}
};
```

## 例题

### 洛谷 P3865 【模板】ST 表 && RMQ 问题

<Problem id="P3865" />
