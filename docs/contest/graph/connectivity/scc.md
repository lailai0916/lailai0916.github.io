# 强连通分量（SCC）

## Tarjan 算法

```cpp
vector<int> G[N];
int dfn[N],low[N],sccno[N];
int cnt=0,scc_cnt=0;
stack<int> s;
void tarjan(int u)
{
	low[u]=dfn[u]=++cnt;
	s.push(u);
	for(auto v:G[u])
	{
		if(!dfn[v])
		{
			tarjan(v);
			low[u]=min(low[u],low[v]);
		}
		else if(!sccno[v])
		{
			low[u]=min(low[u],dfn[v]);
		}
	}
	if(low[u]==dfn[u])
	{
		scc_cnt++;
		while(1)
		{
			int x=s.top();
			s.pop();
			sccno[x]=scc_cnt;
			if(x==u)break;
		}
	}
}
```

## 应用

详见 [2-SAT](../2sat)

## 例题

### 洛谷 P2341 [USACO03FALL / HAOI2006] 受欢迎的牛 G

<Problem id="P2341" />
