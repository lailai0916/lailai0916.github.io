# 二分

## 参考资料

- [二分 - OI Wiki](https://oi-wiki.org/basic/binary/)
- [整数范围二分的正确写法 - bilibili](https://www.bilibili.com/video/BV1np421o77o)

## 二分法

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

:::tip

函数 `check` 的返回值应为 $\{0,0,\cdots,0,0,1,1,\cdots,1,1\}$。

二分后 $l$ 为第一个 $1$ 的位置；$l-1$ 为最后一个 $0$ 的位置。

:::

## 三分法

```cpp
double l=x,r=y;
while(r-l>eps)
{
	double m1=(l*2+r)/3,m2=(r*2+l)/3;
	if(f(m1)>f(m2))r=m2;
	else l=m1;
}
```

:::tip

单峰函数如果有最大值 `f(m1)>f(m2)`；如果有最小值 `f(m1)<f(m2)`。

:::

## 例题

### 洛谷 P2249 【深基13.例1】查找

<Problem id="P2249" />

### 洛谷 P1883 【模板】三分 | 函数

<Problem id="P1883" />

### 洛谷 P3382 三分

<Problem id="P3382" />
