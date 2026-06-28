#include <bits/stdc++.h>
using namespace std;

const double eps=1e-8;
const int N=505;

struct Point
{
	double x,y;
	Point(double x=0,double y=0):x(x),y(y){}
	Point operator+(const Point&p)const{return Point(x+p.x,y+p.y);}
	Point operator-(const Point&p)const{return Point(x-p.x,y-p.y);}
	Point operator*(double t)const{return Point(x*t,y*t);}
};

struct Line
{
	Point p,v;
	double ang;
	Line(){}
	Line(Point p,Point v):p(p),v(v){ang=atan2(v.y,v.x);}
};

double cross(const Point&a,const Point&b)
{
	return a.x*b.y-a.y*b.x;
}

bool cmp(const Line&a,const Line&b)
{
	if(fabs(a.ang-b.ang)>eps)return a.ang<b.ang;
	return cross(a.v,b.p-a.p)<0;
}

Point inter(const Line&a,const Line&b)
{
	double t=cross(b.v,a.p-b.p)/cross(a.v,b.v);
	return a.p+a.v*t;
}

bool onright(const Line&a,const Point&p)
{
	return cross(a.v,p-a.p)<-eps;
}

Line ls[N];
int q[N];

int main()
{
	int n;
	scanf("%d",&n);
	int m=0;
	for(int i=0;i<n;i++)
	{
		int k;
		scanf("%d",&k);
		vector<Point> ps(k);
		for(int j=0;j<k;j++)scanf("%lf%lf",&ps[j].x,&ps[j].y);
		for(int j=0;j<k;j++)
		{
			Point a=ps[j],b=ps[(j+1)%k];
			ls[m++]=Line(a,b-a);
		}
	}
	sort(ls,ls+m,cmp);
	int cnt=0;
	for(int i=0;i<m;i++)
	{
		if(i&&fabs(ls[i].ang-ls[i-1].ang)<eps)continue;
		ls[cnt++]=ls[i];
	}
	int hh=0,tt=-1;
	vector<Point> ip(cnt);
	for(int i=0;i<cnt;i++)
	{
		while(hh<tt&&onright(ls[i],ip[tt-1]))tt--;
		while(hh<tt&&onright(ls[i],ip[hh]))hh++;
		q[++tt]=i;
		if(hh<tt)ip[tt-1]=inter(ls[q[tt]],ls[q[tt-1]]);
	}
	while(hh<tt&&onright(ls[q[hh]],ip[tt-1]))tt--;
	if(tt-hh<=1)
	{
		printf("0.000\n");
		return 0;
	}
	ip[tt]=inter(ls[q[tt]],ls[q[hh]]);
	double area=0;
	for(int i=hh;i<tt;i++)area+=cross(ip[i],ip[i+1]);
	area+=cross(ip[tt],ip[hh]);
	printf("%.3f\n",fabs(area)/2);
	return 0;
}
