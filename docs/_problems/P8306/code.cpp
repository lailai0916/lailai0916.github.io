#include <bits/stdc++.h>
using namespace std;

const int N=3000005;
const int M=128;
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
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int T;
	cin>>T;
	while(T--)
	{
		int n,q;
		cin>>n>>q;
		for(int i=1;i<=n;i++)
		{
			string s;
			cin>>s;
			insert(s);
		}
		while(q--)
		{
			string s;
			cin>>s;
			cout<<query(s)<<'\n';
		}
		init();
	}
	return 0;
}
