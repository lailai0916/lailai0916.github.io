#include <bits/stdc++.h>
using namespace std;

const int N=50005;
struct Point
{
	int x,y;
}a[N];
bool cmp(Point u,Point v)
{
	return u.x*u.x+u.y*u.y<v.x*v.x+v.y*v.y;
}
int dis2(Point u,Point v)
{
	return (u.x-v.x)*(u.x-v.x)+(u.y-v.y)*(u.y-v.y);
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i].x>>a[i].y;
	}
	sort(a+1,a+n+1,cmp);
	int ans=0;
	for(int i=1;i<=n;i++)
	{
		for(int j=max(1,n-4);j<=n;j++)
		{
			ans=max(ans,dis2(a[i],a[j]));
		}
	}
	cout<<ans<<'\n';
	return 0;
}