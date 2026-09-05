#include <bits/stdc++.h>
using namespace std;

const int N=10005;
int fa[N];
void init(int n){for(int i=1;i<=n;i++)fa[i]=i;}
int find(int u){return u==fa[u]?u:fa[u]=find(fa[u]);}
void merge(int u,int v){fa[find(u)]=find(v);}
bool query(int u,int v){return find(u)==find(v);}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	init(n);
	while(m--)
	{
		int z,x,y;
		cin>>z>>x>>y;
		if(z==1)merge(x,y);
		else if(z==2)cout<<(query(x,y)?'Y':'N')<<'\n';
	}
	return 0;
}