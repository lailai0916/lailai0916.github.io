#include <bits/stdc++.h>
#define ls (u<<1)
#define rs (u<<1|1)
#define mid (l+r>>1)
using namespace std;

using ll=long long;
const ll inf=0x3f3f3f3f3f3f3f3f;
const int N=100005;
const int K=N<<2;
int a[N];
vector<pair<int,int>> G[N<<3];
void build(int u,int l,int r)
{
	if(l==r){a[l]=u;return;}
	G[u].push_back({ls,0});
	G[u].push_back({rs,0});
	G[ls+K].push_back({u+K,0});
	G[rs+K].push_back({u+K,0});
	build(ls,l,mid);
	build(rs,mid+1,r);
}
void modify(int u,int l,int r,int x,int y,int v,int w,int type)
{
	if(x<=l&&r<=y)
	{
		if(type==2)G[v+K].push_back({u,w});
		else G[u+K].push_back({v,w});
		return;
	}
	if(x<=mid)modify(ls,l,mid,x,y,v,w,type);
	if(y>mid)modify(rs,mid+1,r,x,y,v,w,type);
}
ll dis[N<<3];
bool vis[N<<3];
void dijkstra(int s)
{
	memset(dis,0x3f,sizeof dis);
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
	int n,m,s;
	cin>>n>>m>>s;
	build(1,1,n);
	for(int i=1;i<=n;i++)
	{
		G[a[i]].push_back({a[i]+K,0});
		G[a[i]+K].push_back({a[i],0});
	}
	while(m--)
	{
		int op,v,u,l,r,w;
		cin>>op;
		if(op==1)
		{
			cin>>v>>u>>w;
			G[a[v]+K].push_back({a[u],w});
		}
		else
		{
			cin>>v>>l>>r>>w;
			modify(1,1,n,l,r,a[v],w,op);
		}
	}
	dijkstra(a[s]+K);
	for(int i=1;i<=n;i++)
	{
		cout<<(dis[a[i]]!=inf?dis[a[i]]:-1)<<' ';
	}
	return 0;
}
