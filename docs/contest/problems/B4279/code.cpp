#include <bits/stdc++.h>
using namespace std;

const int N=4005;
int a[10][10],ans[100];
struct DLX
{
	int cnt,tot;
	int l[N],r[N],u[N],d[N],row[N],col[N],siz[329],fst[734];
	void build()
	{
		for(int i=0;i<=324;i++)
		{
			l[i]=i-1;
			r[i]=i+1;
			u[i]=d[i]=i;
		}
		l[0]=324;
		r[324]=0;
		cnt=324;
	}
	void ins(int x,int y)
	{
		cnt++;
		row[cnt]=x;
		col[cnt]=y;
		siz[y]++;
		u[cnt]=u[y];
		d[cnt]=y;
		d[u[y]]=cnt;
		u[y]=cnt;
		if(!fst[x])fst[x]=l[cnt]=r[cnt]=cnt;
		else
		{
			r[cnt]=r[fst[x]];
			l[cnt]=fst[x];
			l[r[fst[x]]]=cnt;
			r[fst[x]]=cnt;
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
				siz[col[j]]--;
			}
		}
	}
	void rec(int c)
	{
		for(int i=u[c];i!=c;i=u[i])
		{
			for(int j=l[i];j!=i;j=l[j])
			{
				siz[col[j]]++;
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
		{
			if(siz[i]<siz[c])c=i;
		}
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
	for(int i=0;i<9;i++)
	{
		for(int j=0;j<9;j++)
		{
			char f;
			cin>>f;
			a[i][j]=f=='.'?0:f-'0';
		}
	}
	for(int i=0;i<9;i++)
	{
		for(int j=0;j<9;j++)
		{
			for(int k=0;k<9;k++)
			{
				if(a[i][j]&&a[i][j]!=k+1)continue;
				int x=i*81+j*9+k+1;
				dlx.ins(x,i*9+j+1);
				dlx.ins(x,81+i*9+k+1);
				dlx.ins(x,162+j*9+k+1);
				dlx.ins(x,243+(i/3*3+j/3)*9+k+1);
			}
		}
	}
	dlx.dance(0);
	for(int t=0;t<dlx.tot;t++)
	{
		int x=ans[t]-1;
		a[x/81][x%81/9]=x%9+1;
	}
	for(int i=0;i<9;i++)
	{
		for(int j=0;j<9;j++)
		{
			cout<<a[i][j];
		}
		cout<<'\n';
	}
	return 0;
}
