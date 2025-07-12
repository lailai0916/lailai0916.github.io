# 封装

```cpp
#include <bits/stdc++.h>
using namespace std;

const double pi=acos(-1);
const double eps=1e-10;
int sgn(double x){return (x>eps)-(x<-eps);}
struct Point
{
	double x,y;
	Point(){}
	Point(double _x,double _y):x(_x),y(_y){}
	Point operator+(Point B){return Point(x+B.x,y+B.y);}
	Point operator-(Point B){return Point(x-B.x,y-B.y);}
	Point operator*(double k){return Point(x*k,y*k);}
	Point operator/(double k){return Point(x/k,y/k);}
	bool operator==(Point B){return sgn(x-B.x)==0&&sgn(y-B.y)==0;}
};
double Dis(Point A,Point B){return sqrt((A.x-B.x)*(A.x-B.x)+(A.y-B.y)*(A.y-B.y));}
double Dis2(Point A,Point B){return (A.x-B.x)*(A.x-B.x)+(A.y-B.y)*(A.y-B.y);}
typedef Point Vector;
double Dot(Vector A,Vector B){return A.x*B.x+A.y*B.y;}
double Cross(Vector A,Vector B){return A.x*B.y-A.y*B.x;}
double Len(Vector A){return sqrt(Dot(A,A));}
double Len2(Vector A){return Dot(A,A);}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);

	return 0;
}
```
