# 模逆元

## 参考资料

- [模逆元 - OI Wiki](https://oi-wiki.org/math/number-theory/inverse/)
- [【笔记】常见逆元计算方法总结 - 洛谷专栏](https://www.luogu.com.cn/article/37lps3sm)

## 定义

如果线性同余方程 $ax\equiv 1\pmod p$，则 $x$ 称为 $a$ 在模 $p$ 意义下的 **逆元**（Inverse），记为 $x=a^{-1}$。

## 快速幂法

根据费马小定理（Fermat's Little Theorem）：

$$
\begin{aligned}
  & aa^{-1}\equiv 1\pmod p \\
  & aa^{-1}\equiv a^{p-1}\pmod p \\
  & a^{-1}\equiv a^{p-2}\pmod p
\end{aligned}
$$

快速幂：`Pow(a,mod-2)`。

详见 [快速幂](./../binary-exponentiation)。

## 扩展欧几里得算法

如果 $ax\equiv 1\pmod p$，说明存在整数 $x,y$ 满足 $ax+py=1$。

扩展欧几里得算法：`exgcd(a,mod,x,y);`。

详见 [最大公约数](./gcd)。

## 线性逆元

$$
\begin{aligned}
  & p\bmod i=p-\left\lfloor\frac{p}{i}\right\rfloor\cdot i \\
  & p\bmod i=-\left\lfloor\frac{p}{i}\right\rfloor\cdot i \\
  & i^{-1}\cdot(p\bmod i)=-\left\lfloor\frac{p}{i}\right\rfloor \\
  & i^{-1}=-\left\lfloor\frac{p}{i}\right\rfloor(p\bmod i)^{-1}
\end{aligned}
$$

```cpp
ll inv[N];
void init()
{
	inv[1]=1;
	for(int i=2;i<N;i++)
	{
		inv[i]=(mod-mod/i)*inv[mod%i]%mod;
	}
}
```

## 例题

### 洛谷 P3811 【模板】模意义下的乘法逆元

<Problem id="P3811" />

### 洛谷 P5431 【模板】模意义下的乘法逆元 2

<Problem id="P5431" />

### 洛谷 P2613 【模板】有理数取余

<Problem id="P2613" />

### 洛谷 P1082 [NOIP 2012 提高组] 同余方程

<Problem id="P1082" />
