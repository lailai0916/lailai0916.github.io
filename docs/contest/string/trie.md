---
title: '字典树'
---

## 参考资料

- [字典树 (Trie) - OI Wiki](https://oi-wiki.org/string/trie/)

## 实现

```cpp
struct Trie
{
	int T[N][M],val[N];
	int cnt=0;
	void init()
	{
		for(int i=0;i<=cnt;i++)
		{
			memset(T[i],0,sizeof T[i]);
			val[i]=0;
		}
		cnt=0;
	}
	void insert(string s)
	{
		int u=0;
		for(auto c:s)
		{
			int &v=T[u][c];
			if(!v)v=++cnt;
			val[u=v]++;
		}
	}
	int query(string s)
	{
		int u=0;
		for(auto c:s)
		{
			int v=T[u][c];
			if(!v)return 0;
			u=v;
		}
		return val[u];
	}
};
```

## 例题

<Problem id="P8306" />
