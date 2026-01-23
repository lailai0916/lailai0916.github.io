---
title: '树状数组'
---

## 参考资料

- [树状数组 - OI Wiki](https://oi-wiki.org/ds/fenwick/)

## 实现

```cpp
struct BIT
{
	int c[N];
	void add(int u,int v){while(u<N){c[u]+=v;u+=u&-u;}}
	int sum(int u){int res=0;while(u){res+=c[u];u-=u&-u;}return res;}
};
```

## 例题

<Problem id="P3374" />

<Problem id="P3368" />

<Problem id="P3372" />

<Problem id="P4514" />
