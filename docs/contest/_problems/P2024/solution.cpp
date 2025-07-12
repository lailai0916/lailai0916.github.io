#include <bits/stdc++.h>
using namespace std;

const int N=50005;
int fa[N*3];
int find(int u){return u==fa[u]?u:u=find(fa[u]);}
void merge(int u,int v){fa[find(v)]=find(u);}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,k;
	cin>>n>>k;
	for(int i=1;i<=n*3;i++)fa[i]=i;
	int ans=0;
	while(k--)
	{
		int op,u,v;
		cin>>op>>u>>v;
		if(u>n||v>n)
		{
			ans++;
			continue;
		}
		if(op==1)
		{
			if(find(u)==find(v+n)||find(u+n)==find(v))ans++;
			else
			{
				merge(u,v);
				merge(u+n,v+n);
				merge(u+n*2,v+n*2);
			}
		}
		else if(op==2)
		{
			if(find(u)==find(v)||find(u+n)==find(v))ans++;
			else
			{
				merge(u,v+n);
				merge(u+n,v+n*2);
				merge(u+n*2,v);
			}
		}
	}
	cout<<ans<<'\n';
	return 0;
}