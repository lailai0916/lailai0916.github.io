#include <bits/stdc++.h>
using namespace std;

const int R=729;
const int C=324;
const int N=4005;
int a[10][10],ans[100];
struct DLX
{
	int idx,tot;
	int l[N],r[N],u[N],d[N],row[N],col[N],siz[C+5],fst[R+5];
	void build()
	{
		for(int i=0;i<=C;i++)
		{
			l[i]=i-1;
			r[i]=i+1;
			u[i]=d[i]=i;
		}
		l[0]=C;
		r[C]=0;
		idx=C;
		memset(fst,0,sizeof fst);
		memset(siz,0,sizeof siz);
	}
	void ins(int x,int y)
	{
		idx++;
		row[idx]=x;
		col[idx]=y;
		siz[y]++;
		u[idx]=u[y];
		d[idx]=y;
		d[u[y]]=idx;
		u[y]=idx;
		if(!fst[x])fst[x]=l[idx]=r[idx]=idx;
		else
		{
			r[idx]=r[fst[x]];
			l[idx]=fst[x];
			l[r[fst[x]]]=idx;
			r[fst[x]]=idx;
		}
	}
	void del(int c)
	{
		l[r[c]]=l[c];
		r[l[c]]=r[c];
		for(int i=d[c];i!=c;i=d[i])
		{
			for(int j=r[i];j!=i;j=r[j])
			{
				u[d[j]]=u[j];
				d[u[j]]=d[j];
				--siz[col[j]];
			}
		}
	}
	void rec(int c)
	{
		for(int i=u[c];i!=c;i=u[i])
		{
			for(int j=l[i];j!=i;j=l[j])
			{
				++siz[col[j]];
				u[d[j]]=j;
				d[u[j]]=j;
			}
		}
		l[r[c]]=c;
		r[l[c]]=c;
	}
	bool dance(int dep)
	{
		if(!r[0])
		{
			tot=dep;
			return 1;
		}
		int c=r[0];
		for(int i=r[0];i;i=r[i])
			if(siz[i]<siz[c])c=i;
		del(c);
		for(int i=d[c];i!=c;i=d[i])
		{
			ans[dep]=row[i];
			for(int j=r[i];j!=i;j=r[j])del(col[j]);
			if(dance(dep+1))return 1;
			for(int j=l[i];j!=i;j=l[j])rec(col[j]);
		}
		rec(c);
		return 0;
	}
}dlx;
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	dlx.build();
	for(int i=1;i<=9;i++)
	{
		for(int j=1;j<=9;j++)
		{
			cin>>a[i][j];
		}
	}
	for(int i=1;i<=9;i++)
	{
		for(int j=1;j<=9;j++)
		{
			for(int k=1;k<=9;k++)
			{
				if(a[i][j]&&a[i][j]!=k)continue;
				int x=(i-1)*81+(j-1)*9+k;
				int b=(i-1)/3*3+(j-1)/3+1;
				dlx.ins(x,(i-1)*9+j);
				dlx.ins(x,81+(i-1)*9+k);
				dlx.ins(x,162+(j-1)*9+k);
				dlx.ins(x,243+(b-1)*9+k);
			}
		}
	}
	dlx.dance(0);
	for(int t=0;t<dlx.tot;t++)
	{
		int x=ans[t]-1;
		int i=x/81+1;
		x%=81;
		int j=x/9+1;
		a[i][j]=x%9+1;
	}
	for(int i=1;i<=9;i++)
	{
		for(int j=1;j<=9;j++)
		{
			cout<<a[i][j]<<' ';
		}
		cout<<'\n';
	}
	return 0;
}
