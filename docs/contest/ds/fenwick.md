# 树状数组

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

### 洛谷 P3374 【模板】树状数组 1

<Problem id="P3374" />

### 洛谷 P3368 【模板】树状数组 2

<Problem id="P3368" />

### 洛谷 P3372 【模板】线段树 1

<Problem id="P3372" />

### 洛谷 P4514 上帝造题的七分钟

<Problem id="P4514" />
