#include <bits/stdc++.h>
using namespace std;

void dfs(int x1,int y1,int n,int x,int y)
{
	int x2=x1+n/2,y2=y1+n/2;
	int x0[4]={x2-1,x2-1,x2,x2};
	int y0[4]={y2-1,y2,y2-1,y2};
	if(x1<=x&&x<x2&&y1<=y&&y<y2)
	{
		cout<<x2<<' '<<y2<<' '<<1<<'\n';
		x0[0]=x;y0[0]=y;
	}
	else if(x1<=x&&x<x2)
	{
		cout<<x2<<' '<<y2-1<<' '<<2<<'\n';
		x0[1]=x;y0[1]=y;
	}
	else if(y1<=y&&y<y2)
	{
		cout<<x2-1<<' '<<y2<<' '<<3<<'\n';
		x0[2]=x;y0[2]=y;
	}
	else
	{
		cout<<x2-1<<' '<<y2-1<<' '<<4<<'\n';
		x0[3]=x;y0[3]=y;
	}
	if(n<=2)return;
	dfs(x1,y1,n/2,x0[0],y0[0]);
	dfs(x1,y2,n/2,x0[1],y0[1]);
	dfs(x2,y1,n/2,x0[2],y0[2]);
	dfs(x2,y2,n/2,x0[3],y0[3]);
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int k,x,y;
	cin>>k>>x>>y;
	dfs(1,1,1<<k,x,y);
	return 0;
}