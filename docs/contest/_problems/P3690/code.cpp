#include <bits/stdc++.h>
using namespace std;

const int N=100005;
int ch[N][2],fa[N],val[N],sum[N];
bool rev[N];
bool nroot(int u){return ch[fa[u]][0]==u||ch[fa[u]][1]==u;}
void push_up(int u){sum[u]=sum[ch[u][0]]^sum[ch[u][1]]^val[u];}
void push_rev(int u){swap(ch[u][0],ch[u][1]);rev[u]^=1;}
void push_down(int u)
{
	if(rev[u])
	{
		if(ch[u][0])push_rev(ch[u][0]);
		if(ch[u][1])push_rev(ch[u][1]);
		rev[u]=0;
	}
}
void rotate(int u)
{
	int f=fa[u],g=fa[f],k=ch[f][1]==u,w=ch[u][!k];
	if(nroot(f))ch[g][ch[g][1]==f]=u;
	ch[u][!k]=f;
	ch[f][k]=w;
	if(w)fa[w]=f;
	fa[f]=u;
	fa[u]=g;
	push_up(f);
}
void update(int u)
{
	if(nroot(u))update(fa[u]);
	push_down(u);
}
void splay(int u)
{
	update(u);
	while(nroot(u))
	{
		int f=fa[u],g=fa[f];
		if(nroot(f))rotate((ch[f][1]==u)^(ch[g][1]==f)?u:f);
		rotate(u);
	}
	push_up(u);
}
void access(int u)
{
	for(int v=0;u;v=u,u=fa[u])
	{
		splay(u);
		ch[u][1]=v;
		push_up(u);
	}
}
void make_root(int u)
{
	access(u);
	splay(u);
	push_rev(u);
}
int find_root(int u)
{
	access(u);
	splay(u);
	while(ch[u][0])
	{
		push_down(u);
		u=ch[u][0];
	}
	splay(u);
	return u;
}
void split(int x,int y)
{
	make_root(x);
	access(y);
	splay(y);
}
void link(int x,int y)
{
	make_root(x);
	if(find_root(y)!=x)fa[x]=y;
}
void cut(int x,int y)
{
	make_root(x);
	if(find_root(y)==x&&fa[y]==x&&!ch[y][0])
	{
		fa[y]=ch[x][1]=0;
		push_up(x);
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)cin>>val[i];
	while(m--)
	{
		int op,x,y;
		cin>>op>>x>>y;
		if(op==0)
		{
			split(x,y);
			cout<<sum[y]<<'\n';
		}
		else if(op==1)link(x,y);
		else if(op==2)cut(x,y);
		else if(op==3)
		{
			splay(x);
			val[x]=y;
			push_up(x);
		}
	}
	return 0;
}
