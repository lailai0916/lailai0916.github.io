# 拓扑排序

## 实现

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N=105;
vector<int> G[N];
int in[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		int t;
		while(cin>>t&&t!=0)
		{
			G[i].push_back(t);
			in[t]++;
		}
	}
    queue<int> q;
	for(int i=1;i<=n;i++)
	{
		if(!in[i])q.push(i);
	}
	while(!q.empty())
	{
		int u=q.front();
		q.pop();
		cout<<u<<' ';
		for(auto v:G[u])
		{
			in[v]--;
			if(!in[v])q.push(v);
		}
	}
	return 0;
}
```

## 例题

### 洛谷 B3644 【模板】拓扑排序 / 家谱树

<Problem id="B3644" />
