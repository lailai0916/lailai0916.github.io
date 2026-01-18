# 欧拉函数

## 参考资料

- [欧拉函数 - OI Wiki](https://oi-wiki.org/math/number-theory/euler-totient/)

## 定义

欧拉函数（Euler's totient function），即 $\varphi(n)$，表示的是小于等于 $n$ 和 $n$ 互质的数的个数。

例如 $\varphi(1)=1$；当 $n$ 是质数的时候，显然有 $\varphi(n)=n-1$。

## 实现

```cpp
ll phi(ll n)
{
	ll res=n;
	for(ll i=2;i*i<=n;i++)
	{
		if(n%i==0)
		{
			res=res/i*(i-1);
			while(n%i==0)n/=i;
		}
	}
	if(n>1)res=res/n*(n-1);
	return res;
}
```

## 欧拉定理

与欧拉函数紧密相关的一个定理就是欧拉定理。其描述如下：

若 $\gcd(a,m)=1$，则 $a^{\varphi(m)}\equiv 1\pmod{m}$。

### 扩展欧拉定理

当然也有扩展欧拉定理，用于处理一般的 $a$ 和 $m$ 的情形。

$$
a^b\equiv
\begin{cases}
  a^{b\bmod\varphi(m)} & \gcd(a,m)=1 \\
  a^b & \gcd(a,m)\ne 1,b<\varphi(m) \\
  a^{b\bmod\varphi(m)+\varphi(m)} & \gcd(a,m)\ne 1,b\ge\varphi(m)
\end{cases}
\pmod m
$$

## 例题

<Problem id="P5091" />
