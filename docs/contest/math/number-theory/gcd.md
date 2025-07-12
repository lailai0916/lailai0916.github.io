# 最大公约数（GCD）

## 参考资料

- [最大公约数 - OI Wiki](https://oi-wiki.org/math/number-theory/gcd/)
- [扩展欧几里得算法 - 最大公约数 - OI Wiki](https://oi-wiki.org/math/number-theory/gcd/#扩展欧几里得算法)

## 欧几里得算法（辗转相除法）

$$
\gcd{(a,b)}=\gcd{(b,a\bmod b)}
$$

<Tabs>
<TabItem value="递归">

```cpp
ll Gcd(ll a,ll b)
{
	return !b?a:Gcd(b,a%b);
}
```

</TabItem>
<TabItem value="迭代">

```cpp
ll Gcd(ll a,ll b)
{
	while(b)
	{
		ll t=a;
		a=b;
		b=t%b;
	}
	return a;
}
```

</TabItem>
</Tabs>

## 扩展欧几里得（EXGCD）

$$
ax+by=\gcd{(a,b)}
$$

```cpp
ll exgcd(ll a,ll b,ll &x,ll &y)
{
	if(b==0){x=1;y=0;return a;}
	ll d=exgcd(b,a%b,y,x);
	y-=a/b*x;
	return d;
}
```

## 例题

### 洛谷 P5656 【模板】二元一次不定方程 (exgcd)

<Problem id="P5656" />
