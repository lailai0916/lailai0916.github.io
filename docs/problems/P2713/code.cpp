#include <bits/stdc++.h>
using namespace std;

const int N=1000005;
struct Node
{
	int ls,rs,val,dis;
	Node():ls(0),rs(0),val(0),dis(-1){}
	Node(int v):ls(0),rs(0),val(v),dis(0){}
}t[N];
int merge(int x,int y)
{
	if(!x||!y)return x|y;
	if(t[x].val>t[y].val)swap(x,y);
	t[x].rs=merge(t[x].rs,y);
	if(t[t[x].ls].dis<t[t[x].rs].dis)swap(t[x].ls,t[x].rs);
	t[x].dis=t[t[x].rs].dis+1;
	return x;
}
bool del[N];
int fa[N];
int find(int u){return u==fa[u]?u:fa[u]=find(fa[u]);}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		int v;
		cin>>v;
		t[i]=Node(v);
		fa[i]=i;
	}
	int m;
	cin>>m;
	while(m--)
	{
		char op;
		int x,y;
		cin>>op;
		if(op=='M')
		{
			cin>>x>>y;
			if(del[x]||del[y])continue;
			x=find(x);y=find(y);
			if(x==y)continue;
			fa[x]=fa[y]=merge(x,y);
		}
		else if(op=='K')
		{
			cin>>x;
			if(del[x])
			{
				cout<<"0"<<'\n';
				continue;
			}
			x=find(x);
			cout<<t[x].val<<'\n';
			del[x]=1;
			fa[x]=fa[t[x].ls]=fa[t[x].rs]=merge(t[x].ls,t[x].rs);
		}
	}
	return 0;
}