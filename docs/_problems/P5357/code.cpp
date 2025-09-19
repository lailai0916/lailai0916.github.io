#include <bits/stdc++.h>
using namespace std;

const int N=200005;
const int M=26;
int T[N][M],fail[N],vis[N];
int cnt=0,tmp=0;
int insert(string s)
{
	int u=0;
	for(auto c:s)
	{
		int &v=T[u][c-'a'];
		if(!v)v=++cnt;
		u=v;
	}
	if(!vis[u])vis[u]=++tmp;
	return u;
}
vector<int> G[N];
void build()
{
	queue<int> q;
	for(int i=0;i<M;i++)
	{
		if(!T[0][i])continue;
		q.push(T[0][i]);
		G[0].push_back(T[0][i]);
	}
	while(!q.empty())
	{
		int u=q.front();
		q.pop();
		for(int i=0;i<M;i++)
		{
			int &v=T[u][i],w=T[fail[u]][i];
			if(!v){v=w;continue;}
			fail[v]=w;
			G[w].push_back(v);
			q.push(v);
		}
	}
}
int sum[N],id[N];
void query(string s)
{
	int u=0;
	for(auto c:s)
	{
		u=T[u][c-'a'];
		sum[u]++;
	}
}
void dfs(int u)
{
	for(auto v:G[u])
	{
		dfs(v);
		sum[u]+=sum[v];
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		string s;
		cin>>s;
		id[i]=insert(s);
	}
	build();
	string s;
	cin>>s;
	query(s);
	dfs(0);
	for(int i=1;i<=n;i++)
	{
		cout<<sum[id[i]]<<'\n';
	}
	return 0;
}
