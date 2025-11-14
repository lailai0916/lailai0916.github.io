# 珂朵莉树

## 参考资料

- [珂朵莉树/颜色段均摊 - OI Wiki](https://oi-wiki.org/misc/odt/)
- [珂朵莉树的复杂度分析 - 知乎](https://zhuanlan.zhihu.com/p/102786071)
- [【信竞】珂朵莉树（推平树）数据结构全网最详细食用指南！！！ - bilibili](https://www.bilibili.com/video/BV18u411N7P8)

## 简介

珂朵莉树（Chtholly Tree），又名老司机树（Old Driver Tree，ODT），起源于 [CF896C](https://codeforces.com/problemset/problem/896/C)。

核心思想是将值相同的区间合并为一个结点保存在 `set` 中。

## 实现

### 保存结点

```cpp
struct Node
{
	int l,r;
	mutable ll v;
	bool operator<(const Node &rhs) const{return l<rhs.l;}
};
set<Node> s;
```

### insert

```cpp
s.insert({l,r,v});
```

### split

将包含 $x$ 的区间 $[l,r]$ 分裂为区间 $[l,x-1]$ 和区间 $[x,r]$，并返回区间 $[x,r]$ 的迭代器。

```cpp
auto split(int x)
{
	auto it=s.lower_bound({x,0,0});
	if(it!=s.end()&&it->l==x)return it;
	it--;
	auto [l,r,v]=*it;
	s.erase(it);
	s.insert({l,x-1,v});
	return s.insert({x,r,v}).first;
}
```

:::warning

珂朵莉树在进行求取区间左右端点操作时，必须先 split 右端点，再 split 左端点。

若先 split 左端点，返回的迭代器可能在 split 右端点的时候失效，可能会导致 RE。

:::

### cover

```cpp
void cover(int l,int r,ll v)
{
	auto it2=split(r+1),it1=split(l);
	s.erase(it1,it2);
	s.insert({l,r,v});
}
```

### add

```cpp
void add(int l,int r,ll v)
{
	auto it2=split(r+1),it1=split(l);
	for(auto it=it1;it!=it2;it++)it->v+=v;
}
```

### sum

```cpp
ll sum(int l,int r)
{
	auto it2=split(r+1),it1=split(l);
	ll res=0;
	for(auto it=it1;it!=it2;it++)res+=it->v*(it->r-it->l+1);
	return res;
}
```

## 例题

### 洛谷 CF896C Willem, Chtholly and Seniorious

<Problem id="CF896C" />
