#include <bits/stdc++.h>
using namespace std;

const int N=2050;
struct BIT
{
	int c[N][N];
	void add(int x,int y,int v)
	{
		if(!x||!y)return;
		for(int i=x;i<N;i+=i&-i)
		{
			for(int j=y;j<N;j+=j&-j)
			{
				c[i][j]+=v;
			}
		}
	}
	int query(int x,int y)
	{
		int res=0;
		for(int i=x;i;i-=i&-i)
		{
			for(int j=y;j;j-=j&-j)
			{
				res+=c[i][j];
			}
		}
		return res;
	}
}A,B,C,D;
int n,m;
void add(int x,int y,int v)
{
	A.add(x,y,v*x*y);
	B.add(x,y,v*x);
	C.add(x,y,v*y);
	D.add(x,y,v);
}
int query(int x,int y)
{
	return A.query(x,y)+y*(B.query(x,m)-B.query(x,y))+x*(C.query(n,y)-C.query(x,y))+x*y*(D.query(n,m)-D.query(x,m)-D.query(n,y)+D.query(x,y));
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	char op;
	cin>>op>>n>>m;
	while(cin>>op)
	{
		int a,b,c,d,v;
		if(op=='L')
		{
			cin>>a>>b>>c>>d>>v;
			add(c,d,v);
			add(a-1,d,-v);
			add(c,b-1,-v);
			add(a-1,b-1,v);
		}
		else if(op=='k')
		{
			cin>>a>>b>>c>>d;
			cout<<query(c,d)-query(a-1,d)-query(c,b-1)+query(a-1,b-1)<<'\n';
		}
	}
	return 0;
}
