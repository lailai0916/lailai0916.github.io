#include <bits/stdc++.h>
using namespace std;

const int N=200005;
struct point
{
	double x,y;
}p[N],t[N];
bool cmpx(const point &a,const point &b)
{
	return a.x<b.x;
}
bool cmpy(const point &a,const point &b)
{
	return a.y<b.y;
}
double dist(const point &a,const point &b)
{
	double dx=a.x-b.x,dy=a.y-b.y;
	return sqrt(dx*dx+dy*dy);
}
double solve(int l,int r)
{
	if(l==r)return 1e18;
	int mid=l+r>>1;
	double midx=p[mid].x;
	double d=min(solve(l,mid),solve(mid+1,r));
	inplace_merge(p+l,p+mid+1,p+r+1,cmpy);
	int cnt=0;
	for(int i=l;i<=r;i++)
		if(fabs(p[i].x-midx)<d)t[++cnt]=p[i];
	for(int i=1;i<=cnt;i++)
		for(int j=i+1;j<=cnt&&t[j].y-t[i].y<d;j++)
			d=min(d,dist(t[i],t[j]));
	return d;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)cin>>p[i].x>>p[i].y;
	sort(p+1,p+n+1,cmpx);
	cout<<fixed<<setprecision(4)<<solve(1,n)<<'\n';
	return 0;
}
