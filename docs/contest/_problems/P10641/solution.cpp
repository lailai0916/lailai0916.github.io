#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=200005;
struct Node
{
	ll ls,rs,val,dis;
	Node():ls(0),rs(0),val(0),dis(-1){}
	Node(int v):ls(0),rs(0),val(v),dis(0){}
}t[N];
int merge(int x,int y)
{
	if(!x||!y)return x|y;
	if(t[x].val<t[y].val)swap(x,y);
	t[x].rs=merge(t[x].rs,y);
	if(t[t[x].ls].dis<t[t[x].rs].dis)swap(t[x].ls,t[x].rs);
	t[x].dis=t[t[x].rs].dis+1;
	return x;
}
vector<int> G[N];
int dfs(int u)
{
	int res=0;
	for(auto v:G[u])
	{
		int w=dfs(v);
		res=merge(res,(w?w:v));
	}
	if(res)t[res].val+=t[u].val;
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,k;
	cin>>n>>k;
	for(int i=1;i<=n;i++)
	{
		int w;
		cin>>w;
		t[i]=Node(w);
	}
	for(int i=1;i<n;i++)
	{
		int u,v;
		cin>>u>>v;
		G[u].push_back(v);
	}
	int u=dfs(1);
	ll ans=0;
	while(k--)
	{
		ans+=t[u].val;
		u=merge(t[u].ls,t[u].rs);
	}
	cout<<ans<<'\n';
	return 0;
}