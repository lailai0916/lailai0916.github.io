#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const double pi=acos(-1);
const ll inf=0x3f3f3f3f3f3f3f3f;
const int N=400005;
struct Point
{
	double x,y;
}a[N];
bool cmp(Point u,Point v)
{
	return u.x*u.y<v.x*v.y;
}
double dis2(Point u,Point v)
{
	return (u.x-v.x)*(u.x-v.x)+(u.y-v.y)*(u.y-v.y);
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	random_device rd;
	mt19937 gen(rd());
	uniform_real_distribution<> dist(0,pi*2);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i].x>>a[i].y;
	}
	double r=dist(gen);
	for(int i=1;i<=n;i++)
	{
		double x=a[i].x,y=a[i].y;
		a[i].x=x*cos(r)-y*sin(r);
		a[i].y=x*sin(r)+y*cos(r);
	}
	sort(a+1,a+n+1,cmp);
	double ans=inf;
	for(int i=1;i<n;i++)
	{
		for(int j=i+1;j<=min(i+100,n);j++)
		{
			ans=min(ans,dis2(a[i],a[j]));
		}
	}
	cout<<(ll)(ans+0.5)<<'\n';
	return 0;
}
