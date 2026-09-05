#include <bits/stdc++.h>
#include <bits/extc++.h>
using namespace std;
using namespace __gnu_pbds;

const int N=100005;
__gnu_pbds::priority_queue<pair<int,int>,greater<pair<int,int>>> q[N];
bool del[N];
int fa[N];
int find(int u){return u==fa[u]?u:fa[u]=find(fa[u]);}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)
	{
		int v;
		cin>>v;
		q[i].push({v,i});
		fa[i]=i;
	}
	while(m--)
	{
		int op,x,y;
		cin>>op;
		if(op==1)
		{
			cin>>x>>y;
			if(del[x]||del[y])continue;
			x=find(x);y=find(y);
			if(x==y)continue;
			q[x].join(q[y]);
			fa[y]=x;
		}
		else if(op==2)
		{
			cin>>x;
			if(del[x]){cout<<-1<<'\n';continue;}
			x=find(x);
			cout<<q[x].top().first<<'\n';
			del[q[x].top().second]=1;
			q[x].pop();
		}
	}
	return 0;
}
