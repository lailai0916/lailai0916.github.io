---
title: '最短路'
---

## 参考资料

- [最短路 - OI Wiki](https://oi-wiki.org/graph/shortest-path/)
- [最短路问题 - 维基百科](https://zh.wikipedia.org/wiki/最短路问题)
- [差分约束 - OI Wiki](https://oi-wiki.org/graph/diff-constraints/)

## 算法对比

$n$ 代表图的点数，$m$ 代表图的边数。

|     算法名称      |  时间复杂度   | 最短路类型 | 负权图 |
| :---------------: | :-----------: | :--------: | :----: |
|    Floyd 算法     |   $O(n^3)$    | 全源最短路 |   能   |
| Bellman–Ford 算法 |    $O(nm)$    | 单源最短路 |   能   |
|   Dijkstra 算法   | $O(m\log m)$  | 单源最短路 |   否   |
|   Johnson 算法    | $O(nm\log m)$ | 全源最短路 |   能   |

## Floyd 算法

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

## Bellman–Ford 算法

SPFA（Shortest Path Faster Algorithm）是 Bellman–Ford 算法的一种实现。

```cpp
vector<pair<int,int>> G[N];
int dis[N],cnt[N];
bool vis[N];
bool spfa(int s,int n)
{
	memset(dis,0x3f,sizeof dis);
	dis[s]=0;vis[s]=1;
	queue<int> q;
	q.push(s);
	while(!q.empty())
	{
		int u=q.front();
		q.pop();
		vis[u]=0;
		for(auto [v,w]:G[u])
		{
			if(dis[v]<=dis[u]+w)continue;
			dis[v]=dis[u]+w;
			cnt[v]=cnt[u]+1;
			if(cnt[v]>=n)return 0;
			if(!vis[v]){q.push(v);vis[v]=1;}
		}
	}
	return 1;
}
```

## Dijkstra 算法

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

## Johnson 算法

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=3005;
const ll inf=0x3f3f3f3f3f3f3f3f;
vector<pair<int,int>> G[N];
ll h[N],dis[N];
int cnt[N];
bool vis[N];
bool spfa(int s,int n)
{
	memset(h,0x3f,sizeof h);
	h[s]=0;vis[s]=1;
	queue<int> q;
	q.push(s);
	while(!q.empty())
	{
		int u=q.front();
		q.pop();
		vis[u]=0;
		for(auto [v,w]:G[u])
		{
			if(h[v]<=h[u]+w)continue;
			h[v]=h[u]+w;
			cnt[v]=cnt[u]+1;
			if(cnt[v]>=n)return 0;
			if(!vis[v]){q.push(v);vis[v]=1;}
		}
	}
	return 1;
}
void dijkstra(int s)
{
	memset(dis,0x3f,sizeof dis);
	memset(vis,0,sizeof vis);
	priority_queue<pair<ll,int>> q;
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
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	while(m--)
	{
		int u,v,w;
		cin>>u>>v>>w;
		G[u].push_back({v,w});
	}
	for(int i=1;i<=n;i++)G[0].push_back({i,0});
	if(!spfa(0,n+1))
	{
		cout<<-1<<'\n';
		return 0;
	}
	for(int u=1;u<=n;u++)for(auto &[v,w]:G[u])w+=h[u]-h[v];
	for(int i=1;i<=n;i++)
	{
		dijkstra(i);
		ll ans=0;
		for(int j=1;j<=n;j++)
		{
			ans+=j*(dis[j]==inf?1000000000ll:dis[j]+h[j]-h[i]);
		}
		cout<<ans<<'\n';
	}
	return 0;
}
```

## 传递闭包

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N=105;
bool a[N][N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		for(int j=1;j<=n;j++)
		{
			cin>>a[i][j];
		}
	}
	for(int k=1;k<=n;k++)
	{
		for(int i=1;i<=n;i++)
		{
			for(int j=1;j<=n;j++)
			{
				a[i][j]|=a[i][k]&a[k][j];
			}
		}
	}
	for(int i=1;i<=n;i++)
	{
		for(int j=1;j<=n;j++)
		{
			cout<<a[i][j]<<' ';
		}
		cout<<'\n';
	}
	return 0;
}
```

## 差分约束

```cpp
#include <bits/stdc++.h>
using namespace std;

const int inf=0x3f3f3f3f;
const int N=5005;
vector<pair<int,int>> G[N];
int dis[N],cnt[N];
bool vis[N];
bool spfa(int s,int n)
{
	memset(dis,0x3f,sizeof dis);
	dis[s]=0;vis[s]=1;
	queue<int> q;
	q.push(s);
	while(!q.empty())
	{
		int u=q.front();
		q.pop();
		vis[u]=0;
		for(auto [v,w]:G[u])
		{
			if(dis[v]<=dis[u]+w)continue;
			dis[v]=dis[u]+w;
			cnt[v]=cnt[u]+1;
			if(cnt[v]>=n+1)return 0;
			if(!vis[v]){q.push(v);vis[v]=1;}
		}
	}
	return 1;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)G[0].push_back({i,0});
	while(m--)
	{
		int u,v,w;
		cin>>u>>v>>w;
		G[v].push_back({u,w});
	}
	if(!spfa(0,n))
	{
		cout<<"NO"<<'\n';
		return 0;
	}
	for(int i=1;i<=n;i++)
	{
		cout<<dis[i]<<' ';
	}
	return 0;
}
```

## 例题

<Problem id="B3647" />

<Problem id="B3611" />

<Problem id="P3371" />

<Problem id="P4779" />

<Problem id="P5905" />

<Problem id="P3385" />

<Problem id="P5960" />
