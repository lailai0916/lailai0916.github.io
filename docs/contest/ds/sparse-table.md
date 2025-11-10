# ST 表

## 参考资料

- [ST 表 - OI Wiki](https://oi-wiki.org/ds/sparse-table/)

## 实现

```cpp
struct ST
{
	int a[N][30];
	void init(int n)
	{
		for(int i=1;i<=__lg(n);i++)
		{
			for(int j=1;j<=n-(1<<i)+1;j++)
			{
				a[i][j]=max(a[i-1][j],a[i-1][j+(1<<(i-1))]);
			}
		}
	}
	int query(int l,int r)
	{
		int k=__lg(r-l+1);
		return max(a[k][l],a[k][r-(1<<k)+1]);
	}
};
```

## 例题

### 洛谷 P3865 【模板】ST 表 && RMQ 问题

<Problem id="P3865" />
