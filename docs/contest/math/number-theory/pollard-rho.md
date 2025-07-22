# 分解质因数

## 参考资料

- [分解质因数 - OI Wiki](https://oi-wiki.org/math/number-theory/pollard-rho/)

## 朴素算法

```cpp
int cnt=0;
for(ll k=2;k*k<=n;k++)
{
	while(n%k==0)
	{
		a[++cnt]=k;
		n/=k;
	}
}
if(n!=1)a[++cnt]=n;
```

## 例题

### 洛谷 B3715 分解质因子 2

<Problem id="B3715" />
