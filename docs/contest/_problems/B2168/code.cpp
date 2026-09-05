#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=2005;
string s[N],ans[N];
int ls[N],rs[N];
void dfs(int u,string t="")
{
	if(!ls[u]&&!rs[u])
	{
		ans[u]=t.empty()?"0":t;
		return;
	}
	if(ls[u])dfs(ls[u],t+'0');
	if(rs[u])dfs(rs[u],t+'1');
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	priority_queue<pair<ll,int>> q;
	for(int i=1;i<=n;i++)
	{
		ll w;
		cin>>s[i]>>w;
		q.push({-w,i});
	}
	for(int i=1;i<n;i++)
	{
		auto [x,u]=q.top();
		q.pop();
		auto [y,v]=q.top();
		q.pop();
		ls[n+i]=u;
		rs[n+i]=v;
		q.push({x+y,n+i});
	}
	dfs(q.top().second);
	for(int i=1;i<=n;i++)cout<<s[i]<<' '<<ans[i]<<'\n';
	return 0;
}
