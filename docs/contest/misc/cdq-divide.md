# CDQ 分治

## 参考资料

- [CDQ 分治 - OI Wiki](https://oi-wiki.org/misc/cdq-divide/)

## 实现

```cpp
void cdq(int l,int r)
{
	if(l==r)return;
	cdq(l,mid);
	cdq(mid+1,r);
	int p1=l,p2=mid+1;
	for(int i=l;i<=r;i++)
	{
		if(p1<=mid&&(p2>r||a[p1].y<=a[p2].y))
		{
			b[i]=a[p1++];
			bit.add(b[i].z,1);
		}
		else
		{
			b[i]=a[p2++];
			ans[b[i].id]+=bit.sum(b[i].z);
		}
	}
	for(int i=l;i<=mid;i++)bit.add(a[i].z,-1);
	for(int i=l;i<=r;i++)a[i]=b[i];
}
```

## 例题

<Problem id="P3810" />
