#include <bits/stdc++.h>
using namespace std;

const int N=1000005;
const int M=26;
int T[N][M],fail[N],vis[N];
int sum[N],id[N];
int cnt=0,tmp=0;
vector<int> G[N];
void init()
{
	for(int i=0;i<=cnt;i++)
	{
		memset(T[i],0,sizeof T[i]);
		fail[i]=vis[i]=sum[i]=id[i]=0;
		G[i].clear();
	}
	cnt=tmp=0;
}
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
string s[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	while(cin>>n&&n)
	{
		for(int i=1;i<=n;i++)
		{
			cin>>s[i];
			id[i]=insert(s[i]);
		}
		build();
		string t;
		cin>>t;
		query(t);
		dfs(0);
		int mx=0;
		for(int i=1;i<=n;i++)
		{
			mx=max(mx,sum[id[i]]);
		}
		cout<<mx<<'\n';
		for(int i=1;i<=n;i++)
		{
			if(mx==sum[id[i]])cout<<s[i]<<'\n';
		}
		init();
	}
	return 0;
}
