#include <bits/stdc++.h>
using namespace std;

const int N=50005,M=100005;
int fa[N];
int find(int u){return u==fa[u]?u:fa[u]=find(fa[u]);}
struct Edge
{
	int u,v,w,c;
}e[M],g[M];
int n,m,k;
int check(int x,int &sum)
{
	for(int i=1;i<=m;i++)
	{
		g[i]=e[i];
		if(g[i].c==0)g[i].w+=x;
	}
	sort(g+1,g+m+1,[](const Edge &a,const Edge &b)
	{
		return a.w!=b.w?a.w<b.w:a.c<b.c;
	});
	for(int i=0;i<n;i++)fa[i]=i;
	int cnt=0;
	sum=0;
	for(int i=1;i<=m;i++)
	{
		int fu=find(g[i].u),fv=find(g[i].v);
		if(fu==fv)continue;
		fa[fu]=fv;
		sum+=g[i].w;
		if(g[i].c==0)cnt++;
	}
	return cnt;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>n>>m>>k;
	for(int i=1;i<=m;i++)cin>>e[i].u>>e[i].v>>e[i].w>>e[i].c;
	int l=-100,r=100,ans=0,sum;
	while(l<=r)
	{
		int mid=l+r>>1;
		if(check(mid,sum)>=k)
		{
			ans=sum-mid*k;
			l=mid+1;
		}
		else r=mid-1;
	}
	cout<<ans<<'\n';
	return 0;
}
