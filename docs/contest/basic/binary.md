---
title: '二分'
---

## 参考资料

- [二分 - OI Wiki](https://oi-wiki.org/basic/binary/)
- [整数范围二分的正确写法 - bilibili](https://www.bilibili.com/video/BV1np421o77o)

## 二分

`check` 函数的返回值应为 $\set{0,0,\dots,0,0,1,1,\dots,1,1}$。

二分结束后，$l$ 为第一个 $1$ 的位置，$l-1$ 为最后一个 $0$ 的位置。

<Tabs>
<TabItem value="整数">

```cpp
int l=x,r=y+1;
while(l<r)
{
	int mid=l+r>>1;
	if(check(mid))r=mid;
	else l=mid+1;
}
```

</TabItem>
<TabItem value="实数">

```cpp
double l=x,r=y;
while(r-l>eps)
{
	double mid=(l+r)/2;
	if(check(mid))r=mid;
	else l=mid;
}
```

</TabItem>
</Tabs>

## 三分

单峰函数如果找最大值 `f(m1)>f(m2)`，找最小值 `f(m1)<f(m2)`。

```cpp
double l=x,r=y;
while(r-l>eps)
{
	double m1=(l*2+r)/3,m2=(l+r*2)/3;
	if(f(m1)>f(m2))r=m2;
	else l=m1;
}
```

## 例题

<Problem id="P2249" />

<Problem id="P1883" />

<Problem id="P3382" />

<Problem id="SP4871" />
