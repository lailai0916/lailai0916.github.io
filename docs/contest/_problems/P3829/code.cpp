#include <bits/stdc++.h>
using namespace std;

const double pi=acos(-1);
const int N=10005;
struct Point
{
	double x,y;
	Point(){}
	Point(double _x,double _y):x(_x),y(_y){}
	Point operator+(Point B){return Point(x+B.x,y+B.y);}
	Point operator-(Point B){return Point(x-B.x,y-B.y);}
}a[N<<2];
double Dis(Point A,Point B){return sqrt((A.x-B.x)*(A.x-B.x)+(A.y-B.y)*(A.y-B.y));}
double Cross(Point A,Point B){return A.x*B.y-A.y*B.x;}
Point rotate(Point A,double t){return Point(A.x*cos(t)-A.y*sin(t),A.x*sin(t)+A.y*cos(t));}
bool cmp(Point A,Point B)
{
	return A.x!=B.x?A.x<B.x:A.y<B.y;
}
int s[N<<2];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	double A,B,r;
	cin>>n>>A>>B>>r;
	A=A/2-r;B=B/2-r;
	for(int i=1;i<=n;i++)
	{
		Point P;
		double t;
		cin>>P.x>>P.y>>t;
		a[i*4-3]=rotate({B,A},t)+P;
		a[i*4-2]=rotate({B,-A},t)+P;
		a[i*4-1]=rotate({-B,A},t)+P;
		a[i*4]=rotate({-B,-A},t)+P;
	}
	n<<=2;
	sort(a+1,a+n+1,cmp);
	int m=0;
	for(int i=1;i<=n;i++)
	{
		while(m>1&&Cross(a[s[m]]-a[s[m-1]],a[i]-a[s[m]])<=0)m--;
		s[++m]=i;
	}
	int t=m;
	for(int i=n-1;i>=1;i--)
	{
		while(m>t&&Cross(a[s[m]]-a[s[m-1]],a[i]-a[s[m]])<=0)m--;
		s[++m]=i;
	}
	if(m>1)m--;
	double ans=r*pi*2;
	for(int i=1;i<=m;i++)ans+=Dis(a[s[i]],a[s[i%m+1]]);
	cout<<fixed<<setprecision(2)<<ans<<'\n';
	return 0;
}