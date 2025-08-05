#include <bits/stdc++.h>
using namespace std;

const int N=1005;
int fa[N<<1];
int find(int u){return u==fa[u]?u:fa[u]=find(fa[u]);}
void merge(int u,int v){fa[find(v)]=find(u);}
int main()
{
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=(n<<1);i++)fa[i]=i;
	for(int i=1;i<=m;i++)
	{
		char op;
		int p,q;
		cin>>op>>p>>q;
		if(op=='F')
		{
			merge(q,p);
		}
		else if(op=='E')
		{
			merge(p,q+n);
			merge(q,p+n);
		}
	}
	int ans=0;
	for(int i=1;i<=n;i++)
	{
		if(fa[i]==i)ans++;
	}
	cout<<ans<<'\n';
	return 0;
}