# 旋转卡壳

## 参考资料

- [旋转卡壳 - OI Wiki](https://oi-wiki.org/geometry/rotating-calipers/)
- [关于为什么最远点对一定在凸包上的证明 - 博客园](https://www.cnblogs.com/Ishtar/p/10010792.html)

## 说明

凸包的直径就是平面最远点对的距离。

> 读音：旋（xuán）转（zhuǎn）卡（kǎ）壳（ké）

## Andrew 算法

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=50005;
struct Point
{
	ll x,y;
	Point(){}
	Point(ll _x,ll _y):x(_x),y(_y){}
	Point operator-(Point B){return Point(x-B.x,y-B.y);}
}a[N],b[N];
ll Dis2(Point A,Point B){return (A.x-B.x)*(A.x-B.x)+(A.y-B.y)*(A.y-B.y);}
ll Cross(Point A,Point B){return A.x*B.y-A.y*B.x;}
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
	for(int i=1;i<=m;i++)b[i]=a[s[i]];
	ll ans=0;
	int j=2;
	for(int i=1;i<=m;i++)
	{
		while(abs(Cross(b[i]-b[j],b[i%m+1]-b[j]))<abs(Cross(b[i]-b[j+1],b[i%m+1]-b[j%m+1])))j=j%m+1;
		ans=max(ans,max(Dis2(b[i],b[j]),Dis2(b[i%m+1],b[j])));
	}
	cout<<ans<<'\n';
	return 0;
}
```

## Graham 扫描法

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=50005;
struct Point
{
	ll x,y;
	Point(){}
	Point(ll _x,ll _y):x(_x),y(_y){}
	Point operator-(Point B){return Point(x-B.x,y-B.y);}
}a[N],b[N];
ll Dis2(Point A,Point B){return (A.x-B.x)*(A.x-B.x)+(A.y-B.y)*(A.y-B.y);}
ll Cross(Point A,Point B){return A.x*B.y-A.y*B.x;}
bool cmp(Point A,Point B)
{
	ll t=Cross(A-a[1],B-a[1]);
	return t!=0?t>0:Dis2(A,a[1])<Dis2(B,a[1]);
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
	for(int i=1;i<=m;i++)b[i]=a[s[i]];
	ll ans=0;
	int j=2;
	for(int i=1;i<=m;i++)
	{
		while(abs(Cross(b[i]-b[j],b[i%m+1]-b[j]))<abs(Cross(b[i]-b[j+1],b[i%m+1]-b[j%m+1])))j=j%m+1;
		ans=max(ans,max(Dis2(b[i],b[j]),Dis2(b[i%m+1],b[j])));
	}
	cout<<ans<<'\n';
	return 0;
}
```

## 例题

### 洛谷 P1452 【模板】旋转卡壳 | [USACO03FALL] Beauty Contest G

<Problem id="P1452" />
