#include <bits/stdc++.h>
using namespace std;

const int N=105;
struct Point
{
	double x,y;
}a[N];
double Cross(Point A,Point B){return A.x*B.y-A.y*B.x;}
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
	double ans=0;
	for(int i=1;i<=n;i++)
	{
		ans+=Cross(a[i],a[i%n+1])/2;
	}
	cout<<fabs(ans)<<'\n';
	return 0;
}