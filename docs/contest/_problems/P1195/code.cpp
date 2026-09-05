#include <bits/stdc++.h>
using namespace std;

const int N=1005;
struct Edge
{
	int u,v,w;
	bool operator<(const Edge &x) const{return w<x.w;}
};
vector<Edge> E;
int fa[N];
int find(int u){return u==fa[u]?u:fa[u]=find(fa[u]);}
int kruskal(int n,int k)
{
	for(int i=1;i<=n;i++)fa[i]=i;
	sort(E.begin(),E.end());
	int ans=0,cnt=0;
	for(auto [u,v,w]:E)
	{
		if(cnt==n-k)break;
		int x=find(u),y=find(v);
		if(x==y)continue;
		fa[x]=y;
		ans+=w;
		cnt++;
	}
	return cnt==n-k?ans:-1;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m,k;
	cin>>n>>m>>k;
	while(m--)
	{
		int u,v,w;
		cin>>u>>v>>w;
		E.push_back({u,v,w});
	}
	int ans=kruskal(n,k);
	if(ans!=-1)cout<<ans<<'\n';
	else cout<<"No Answer"<<'\n';
	return 0;
}
