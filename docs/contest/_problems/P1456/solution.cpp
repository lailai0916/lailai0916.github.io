#include <bits/stdc++.h>
using namespace std;

const int N=100005;
struct Node
{
	int ls,rs,val,dis;
	Node():ls(0),rs(0),val(0),dis(-1){}
	Node(int v):ls(0),rs(0),val(v),dis(0){}
}t[N];
int merge(int x,int y)
{
	if(!x||!y)return x|y;
	if(t[x].val<t[y].val)swap(x,y);
	t[x].rs=merge(t[x].rs,y);
	if(t[t[x].ls].dis<t[t[x].rs].dis)swap(t[x].ls,t[x].rs);
	t[x].dis=t[t[x].rs].dis+1;
	return x;
}
int fa[N];
int find(int u){return u==fa[u]?u:fa[u]=find(fa[u]);}
int change(int x)
{
	int y=merge(t[x].ls,t[x].rs);
	t[x]=Node(t[x].val>>1);
	return fa[x]=fa[y]=merge(x,y);
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	while(cin>>n)
	{
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
			int x,y;
			cin>>x>>y;
			x=find(x);y=find(y);
			if(x==y)
			{
				cout<<"-1"<<'\n';
				continue;
			}
			x=change(x);y=change(y);
			cout<<t[fa[x]=fa[y]=merge(x,y)].val<<'\n';
		}
	}
	return 0;
}