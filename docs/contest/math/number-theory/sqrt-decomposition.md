---
title: '数论分块'
---

## 参考资料

- [数论分块 - OI Wiki](https://oi-wiki.org/math/number-theory/sqrt-decomposition/)

## 实现

```cpp
for(ll l=1,r;l<=n;l=r+1)
{
	r=n/(n/l);
	ans+=(r-l+1)*(n/l);
}
```

## 例题

<Problem id="UVA11526" />
