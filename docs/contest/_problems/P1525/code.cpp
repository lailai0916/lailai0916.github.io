#include <bits/stdc++.h>
using namespace std;

const int N=20005;
const int M=100005;
struct Node
{
	int u,v,w;
}a[M];
bool cmp(const Node &u,const Node &v)
{
	return u.w>v.w;
}
int fa[N<<1];
int find(int u){return u==fa[u]?u:fa[u]=find(fa[u]);}
int main()
{
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=m;i++)
	{
		cin>>a[i].u>>a[i].v>>a[i].w;
	}
	sort(a+1,a+m+1,cmp);
	for(int i=1;i<=n<<1;i++)fa[i]=i;
	int ans=0;
	for(int i=1;i<=m;i++)
	{
		int x=a[i].u,y=a[i].v;
		if(find(x)==find(y)||find(x+n)==find(y+n))
		{
			ans=a[i].w;
			break;
		}
		fa[find(x)]=find(y+n);
		fa[find(x+n)]=find(y);
	}
	cout<<ans<<'\n';
	return 0;
}