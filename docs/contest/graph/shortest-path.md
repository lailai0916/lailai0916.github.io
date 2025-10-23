# 最短路问题

## 参考资料

- [最短路 - OI Wiki](https://oi-wiki.org/graph/shortest-path/)
- [最短路问题 - 维基百科](https://zh.wikipedia.org/zh-cn/最短路问题)
- [差分约束 - OI Wiki](https://oi-wiki.org/graph/diff-constraints/)

## 最短路

### 算法对比

$n$ 代表图的点数，$m$ 代表图的边数。

|     算法名称      |  时间复杂度   | 最短路类型 | 负权图 |
| :---------------: | :-----------: | :--------: | :----: |
|    Floyd 算法     |   $O(n^3)$    | 全源最短路 |   能   |
| Bellman–Ford 算法 |    $O(nm)$    | 单源最短路 |   能   |
|   Dijkstra 算法   | $O(m\log m)$  | 单源最短路 |   否   |
|   Johnson 算法    | $O(nm\log m)$ | 全源最短路 |   能   |

### Floyd 算法

```cpp
int a[N][N];
void floyd(int n)
{
	for(int k=1;k<=n;k++)
	{
		for(int i=1;i<=n;i++)
		{
			for(int j=1;j<=n;j++)
			{
				a[i][j]=min(a[i][j],a[i][k]+a[k][j]);
			}
		}
	}
}
```

### Dijkstra 算法

```cpp
vector<pair<int,int>> G[N];
int dis[N];
bool vis[N];
void dijkstra(int s)
{
	memset(dis,0x3f,sizeof dis);
	priority_queue<pair<int,int>> q;
	q.push({dis[s]=0,s});
	while(!q.empty())
	{
		int u=q.top().second;
		q.pop();
		if(vis[u])continue;
		vis[u]=1;
		for(auto [v,w]:G[u])
		{
			if(dis[v]>dis[u]+w)
			{
				dis[v]=dis[u]+w;
				q.push({-dis[v],v});
			}
		}
	}
}
```

## 差分约束

## 例题

### 洛谷 B3647 【模板】Floyd

<Problem id="B3647" />

### 洛谷 P4779 【模板】单源最短路径（标准版）

<Problem id="P4779" />
