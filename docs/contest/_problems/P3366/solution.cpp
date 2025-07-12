#include <bits/stdc++.h>
using namespace std;

const int N=5005;
const int M=200005;
struct Edge
{
	int u,v,w;
	bool operator<(const Edge &x) const{return w<x.w;}
}e[M];
int fa[N];
int find(int u){return u==fa[u]?u:fa[u]=find(fa[u]);}
int kruskal(int n,int m)
{
	for(int i=1;i<=n;i++)fa[i]=i;
	sort(e+1,e+m+1);
	int ans=0,cnt=0;
	for(int i=1;i<=m;i++)
	{
		int x=find(e[i].u),y=find(e[i].v);
		if(x==y)continue;
		fa[x]=y;
		ans+=e[i].w;
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
	for(int i=1;i<=m;i++)
	{
		cin>>e[i].u>>e[i].v>>e[i].w;
	}
	int ans=kruskal(n,m);
	if(ans!=-1)cout<<ans<<'\n';
	else cout<<"orz"<<'\n';
	return 0;
}