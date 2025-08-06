#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=200005;
struct Node
{
	int v,l,r;
}a[N];
bool vis[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i].v;
	}
	if(m>n/2)
	{
		cout<<"Error!"<<'\n';
		return 0;
	}
	priority_queue<pair<int,int>> q;
	for(int i=1;i<=n;i++)
	{
		q.push({a[i].v,i});
		a[i].l=(i-2+n)%n+1;
		a[i].r=i%n+1;
	}
	ll ans=0;
	while(m)
	{
		int u=q.top().second;
		q.pop();
		if(vis[u])continue;
		ans+=a[u].v;
		m--;
		int x=a[u].l,y=a[u].r;
		vis[x]=vis[y]=1;
		a[u].l=a[x].l;a[a[x].l].r=u;
		a[u].r=a[y].r;a[a[y].r].l=u;
		a[u].v=a[x].v+a[y].v-a[u].v;
		q.push({a[u].v,u});
	}
	cout<<ans<<'\n';
	return 0;
}
