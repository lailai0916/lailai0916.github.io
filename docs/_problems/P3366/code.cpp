#include <bits/stdc++.h>
using namespace std;

const int N=5005;
struct Edge
{
	int u,v,w;
	bool operator<(const Edge &x) const{return w<x.w;}
};
vector<Edge> E;
int fa[N];
int find(int u){return u==fa[u]?u:fa[u]=find(fa[u]);}
int kruskal(int n)
{
	for(int i=1;i<=n;i++)fa[i]=i;
	sort(E.begin(),E.end());
	int ans=0,cnt=0;
	for(auto [u,v,w]:E)
	{
		int x=find(u),y=find(v);
		if(x==y)continue;
		fa[x]=y;
		ans+=w;
		cnt++;
	}
	return cnt==n-1?ans:-1;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	while(m--)
	{
		int u,v,w;
		cin>>u>>v>>w;
		E.push_back({u,v,w});
	}
	int ans=kruskal(n);
	if(ans!=-1)cout<<ans<<'\n';
	else cout<<"orz"<<'\n';
	return 0;
}
