# 凸包

## 参考资料

- [凸包 - OI Wiki](https://oi-wiki.org/geometry/convex-hull/)
- [凸包 - 维基百科](https://zh.wikipedia.org/wiki/凸包)

## Andrew 算法

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N=100005;
struct Point
{
	double x,y;
	Point(){}
	Point(double _x,double _y):x(_x),y(_y){}
	Point operator-(Point B){return Point(x-B.x,y-B.y);}
}a[N];
double Dis(Point A,Point B){return sqrt((A.x-B.x)*(A.x-B.x)+(A.y-B.y)*(A.y-B.y));}
double Cross(Point A,Point B){return A.x*B.y-A.y*B.x;}
bool cmp(Point A,Point B)
{
	return A.x!=B.x?A.x<B.x:A.y<B.y;
}
int s[N];
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
	double ans=0;
	for(int i=1;i<=m;i++)ans+=Dis(a[s[i]],a[s[i%m+1]]);
	cout<<fixed<<setprecision(2)<<ans<<'\n';
	return 0;
}
```

## Graham 扫描法

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N=100005;
struct Point
{
	double x,y;
	Point(){}
	Point(double _x,double _y):x(_x),y(_y){}
	Point operator-(Point B){return Point(x-B.x,y-B.y);}
}a[N];
double Dis(Point A,Point B){return sqrt((A.x-B.x)*(A.x-B.x)+(A.y-B.y)*(A.y-B.y));}
double Cross(Point A,Point B){return A.x*B.y-A.y*B.x;}
bool cmp(Point A,Point B)
{
	double t=Cross(A-a[1],B-a[1]);
	return t!=0?t>0:Dis(A,a[1])<Dis(B,a[1]);
}
int s[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i].x>>a[i].y;
		if(a[i].y!=a[1].y?a[i].y<a[1].y:a[i].x<a[1].x)swap(a[i],a[1]);
	}
	sort(a+2,a+n+1,cmp);
	int m=0;
	for(int i=1;i<=n;i++)
	{
		while(m>1&&Cross(a[s[m]]-a[s[m-1]],a[i]-a[s[m]])<=0)m--;
		s[++m]=i;
	}
	double ans=0;
	for(int i=1;i<=m;i++)ans+=Dis(a[s[i]],a[s[i%m+1]]);
	cout<<fixed<<setprecision(2)<<ans<<'\n';
	return 0;
}
```

## 例题

### 洛谷 P2742 [USACO5.1] 圈奶牛Fencing the Cows /【模板】二维凸包

<Problem id="P2742" />

### 洛谷 P2116 城墙

<Problem id="P2116" />

### 洛谷 P3829 [SHOI2012] 信用卡凸包

<Problem id="P3829" />

### 洛谷 UVA1303 Wall

<Problem id="UVA1303" />
