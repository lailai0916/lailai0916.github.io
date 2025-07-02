# 字典树（Trie）

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
		for(auto f:s)
		{
			int &v=T[u][f];
			if(!v)v=++cnt;
			u=v;
			val[u]++;
		}
	}
	int query(string s)
	{
		int u=0;
		for(auto f:s)
		{
			int v=T[u][f];
			if(!v)return 0;
			u=v;
		}
		return val[u];
	}
};
```

## 例题

### 洛谷 P8306 【模板】字典树

<Problem id="P8306" />
