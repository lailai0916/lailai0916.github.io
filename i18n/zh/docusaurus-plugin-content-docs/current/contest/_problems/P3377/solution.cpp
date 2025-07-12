#include <bits/stdc++.h>
using namespace std;

const int N=100005;
struct Node
{
	int val,ls,rs,dis;
}t[N];
int merge(int x,int y)
{
	if(!x||!y)return x|y;
	if(t[x].val>t[y].val||(t[x].val==t[y].val&&x>y))swap(x,y);
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
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)
	{
		int v;
		cin>>v;
		t[i].val=v;
		fa[i]=i;
	}
	while(m--)
	{
		int op,x,y;
		cin>>op;
		if(op==1)
		{
			cin>>x>>y;
			if(del[x]||del[y])continue;
			x=find(x);y=find(y);
			if(x==y)continue;
			fa[x]=fa[y]=merge(x,y);
		}
		else if(op==2)
		{
			cin>>x;
			if(del[x])
			{
				cout<<"-1"<<'\n';
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