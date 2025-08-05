#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const ll inf=0x3f3f3f3f3f3f3f3f;
const int N=100005;
struct Point
{
	double x,y;
}a[N];
bool cmp(Point a,Point b)
{
	return a.x<b.x;
}
double dis(Point a,Point b)
{
	return sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
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
	double mn=inf,mx=0;
	for(int i=1;i<n;i++)
	{
		for(int j=i+1;j<=min(i+20,n);j++)
		{
			mn=min(mn,dis(a[i],a[j]));
		}
		for(int j=1;j<=min(20,n);j++)
		{
			mx=max(mx,dis(a[i],a[j]));
		}
		for(int j=max(1,n-20);j<=n;j++)
		{
			mx=max(mx,dis(a[i],a[j]));
		}
	}
	cout<<fixed<<setprecision(2)<<mn<<' '<<mx<<'\n';
	return 0;
}