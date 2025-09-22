# 常用模板

本文是我的竞赛常用模板。

## 参考资料

- [OI Wiki](https://oi-wiki.org)
- [ACM 常用算法模板](https://acm.sdut.edu.cn/10th_anniversary_celebration/kuangbin的ACM模板（新）.pdf)

## 文件

下载 [name.zip](./assets/name.zip)

## 框架

<Tabs>
<TabItem value="基础框架">

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{

	return 0;
}
```

</TabItem>
<TabItem value="快捷框架 1">

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=100005;
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);

	return 0;
}
```

</TabItem>
<TabItem value="快捷框架 2">

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int inf=0x3f3f3f3f;
const int mod=998244353;
const int N=100005;
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);

	return 0;
}
```

</TabItem>
</Tabs>

## 读写优化

详见 [读写优化](../contest/io)

### 关闭同步 & 解除关联

```cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
```

### 快读快写

```cpp
int read()
{
	int x=0,f=1;char c=getchar();
	while(c<'0'||c>'9'){if(c=='-')f=-1;c=getchar();}
	while(c>='0'&&c<='9')x=x*10+c-48,c=getchar();
	return x*f;
}
void write(int x)
{
	if(x<0)putchar('-'),x=-x;
	if(x>9)write(x/10);
	putchar(x%10+48);
}
```

## 算法基础

### 二分

详见 [二分](../basic/binary)

```cpp
int l=x,r=y+1;
while(l<r)
{
	int mid=l+r>>1;
	if(check(mid))r=mid;
	else l=mid+1;
}
```

## 字符串

### KMP 算法

详见 [字符串匹配](../string/match)

```cpp
int kmp(string s,string t)
{
	int n=s.size(),m=t.size();
	for(int i=1;i<m;i++)
	{
		int j=nxt[i-1];
		while(j&&t[i]!=t[j])j=nxt[j-1];
		if(t[i]==t[j])j++;
		nxt[i]=j;
	}
	int j=0;
	for(int i=0;i<n;i++)
	{
		while(j&&s[i]!=t[j])j=nxt[j-1];
		if(s[i]==t[j])j++;
		if(j==m)return i-m+1;
	}
	return -1;
}
```

### 字典树

详见 [字典树](../string/trie)

```cpp
struct Trie
{
	int T[N][M],val[N];
	int cnt=0;
	void init()
	{
		for(int i=0;i<=cnt;i++)
		{
			memset(T[i],0,sizeof T[i]);
			val[i]=0;
		}
		cnt=0;
	}
	void insert(string s)
	{
		int u=0;
		for(auto c:s)
		{
			int &v=T[u][c];
			if(!v)v=++cnt;
			val[u=v]++;
		}
	}
	int query(string s)
	{
		int u=0;
		for(auto c:s)
		{
			int v=T[u][c];
			if(!v)return 0;
			u=v;
		}
		return val[u];
	}
};
```

## 数学

### 快速幂

详见 [快速幂](../math/binary-exponentiation)

```cpp
ll Pow(ll x,ll y)
{
	x%=mod;
	ll res=1;
	while(y)
	{
		if(y&1)res=res*x%mod;
		x=x*x%mod;
		y>>=1;
	}
	return res;
}
```

### 排列组合

详见 [排列组合](../math/combinatorics/permutation-and-combination)

```cpp
ll inv[N],fac[N],jv[N];
void init()
{
	fac[0]=jv[0]=1;
	for(int i=1;i<N;i++)
	{
		inv[i]=i==1?1:(mod-mod/i)*inv[mod%i]%mod;
		fac[i]=fac[i-1]*i%mod;
		jv[i]=jv[i-1]*inv[i]%mod;
	}
}
ll C(ll n,ll m)
{
	if(n<m||m<0)return 0;
	return fac[n]*jv[n-m]%mod*jv[m]%mod;
}
ll A(ll n,ll m)
{
	if(n<m||m<0)return 0;
	return fac[n]*jv[n-m]%mod;
}
```

### 筛法

详见 [筛法](../math/number-theory/sieve)

```cpp
void init()
{
	vis[0]=vis[1]=1;
	int cnt=0;
	for(int i=2;i<N;i++)
	{
		if(!vis[i])pri[++cnt]=i;
		for(int j=1;j<=cnt;j++)
		{
			if(i*pri[j]>=N)break;
			vis[i*pri[j]]=1;
			if(i%pri[j]==0)break;
		}
	}
}
```

## 数据结构

### 并查集

详见 [并查集](../ds/dsu)

```cpp
struct DSU
{
	int fa[N];
	void init(int n){for(int i=1;i<=n;i++)fa[i]=i;}
	int find(int u){return u==fa[u]?u:fa[u]=find(fa[u]);}
	void merge(int u,int v){fa[find(u)]=find(v);}
    bool query(int u,int v){return find(u)==find(v);}
};
```

### ST 表

详见 [ST 表](../ds/sparse-table)

```cpp
struct ST
{
	ll a[N][25];
	void init(int n)
	{
		for(int j=1;j<=__lg(n);j++)
		{
			for(int i=1;i<=n-(1<<j)+1;i++)
			{
				a[i][j]=max(a[i][j-1],a[i+(1<<(j-1))][j-1]);
			}
		}
	}
	ll query(int l,int r)
	{
		int k=__lg(r-l+1);
		return max(a[l][k],a[r-(1<<k)+1][k]);
	}
};
```

### 树状数组

详见 [树状数组](../ds/fenwick)

```cpp
struct BIT
{
	int c[N];
	void add(int u,int v){while(u<N){c[u]+=v;u+=u&-u;}}
	int sum(int u){int res=0;while(u){res+=c[u];u-=u&-u;}return res;}
};
```

### 线段树

详见 [线段树](../ds/seg)

```cpp
struct SEG
{
	ll a[N],val[N<<2],tag[N<<2];
	void gx(int u,ll v,int len){val[u]+=v*len;tag[u]+=v;}
	void push_up(int u){val[u]=val[ls]+val[rs];}
	void push_down(int u,int l,int r)
	{
		gx(ls,tag[u],mid-l+1);
		gx(rs,tag[u],r-mid);
		tag[u]=0;
	}
	void build(int u,int l,int r)
	{
		if(l==r){val[u]=a[l];return;}
		build(ls,l,mid);
		build(rs,mid+1,r);
		push_up(u);
	}
	void update(int u,int l,int r,int x,int y,ll v)
	{
		if(x<=l&&r<=y){gx(u,v,r-l+1);return;}
		push_down(u,l,r);
		if(x<=mid)update(ls,l,mid,x,y,v);
		if(y>mid)update(rs,mid+1,r,x,y,v);
		push_up(u);
	}
	ll query(int u,int l,int r,int x,int y)
	{
		if(x<=l&&r<=y)return val[u];
		push_down(u,l,r);
		ll res=0;
		if(x<=mid)res+=query(ls,l,mid,x,y);
		if(y>mid)res+=query(rs,mid+1,r,x,y);
		return res;
	}
};
```

## 计算几何

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

## 杂项

### 文件读写

```cpp
freopen(".in","r",stdin);
freopen(".out","w",stdout);
```

### cout 格式化

```cpp
cout<<fixed<<setprecision(6)<<x<<'\n';
cout<<setfill('0')<<setw(6)<<x<<'\n';
```

### 刷新缓冲区

```cpp
cout<<flush;
fflush(stdout);
cout.flush();
```

### `__gnu_pbds::tree`

```cpp
#include <bits/extc++.h>
using namespace __gnu_pbds;
__gnu_pbds::tree<pair<int,int>,null_type,less<pair<int,int>>,rb_tree_tag,tree_order_statistics_node_update> T;
```

### `mt19937`

```cpp
random_device rd;
mt19937 gen(rd());
uniform_int_distribution<int> dist(1,100);
int k=dist(gen);
```
