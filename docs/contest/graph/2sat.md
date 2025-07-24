# 2-SAT

## 参考资料

- [2-SAT - OI Wiki](https://oi-wiki.org/graph/2-sat/)

## SCC

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N=1000005;
vector<int> G[N<<1];
int dfn[N<<1],low[N<<1],sccno[N<<1];
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
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	while(m--)
	{
		int u,x,v,y;
		cin>>u>>x>>v>>y;
		G[u+n*(1-x)].push_back(v+n*y);
		G[v+n*(1-y)].push_back(u+n*x);
	}
	for(int i=1;i<=(n<<1);i++)
	{
		if(!dfn[i])tarjan(i);
	}
	for(int i=1;i<=n;i++)
	{
		if(sccno[i]==sccno[i+n])
		{
			cout<<"IMPOSSIBLE"<<'\n';
			return 0;
		}
	}
	cout<<"POSSIBLE"<<'\n';
	for(int i=1;i<=n;i++)
	{
		cout<<(sccno[i]>sccno[i+n])<<' ';
	}
	return 0;
}
```

## 例题

### 洛谷 P4782 【模板】2-SAT

<Problem id="P4782" />
