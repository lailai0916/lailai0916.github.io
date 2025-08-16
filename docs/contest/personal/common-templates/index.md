# 常用模板

本文是我的竞赛常用模板。

## 框架

### 基础框架

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{

	return 0;
}
```

### 便捷框架

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

## 读写

### 文件读写

```cpp
freopen(".in","r",stdin);
freopen(".out","w",stdout);
```

### 读写优化

```cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
```

### 快速读入

```cpp
int read()
{
	int x=0,f=1;char c=getchar();
	while(c<'0'||c>'9'){if(c=='-')f=-1;c=getchar();}
	while(c>='0'&&c<='9'){x=x*10+c-48;c=getchar();}
	return x*f;
}
```

### 快速输出

```cpp
void write(int x)
{
	if(x<0)putchar('-'),x=-x;
	if(x>9)write(x/10);
	putchar(x%10+48);
}
```

### cout 格式化

```cpp
cout<<fixed<<setprecision(6)<<x<<'\n';
cout<<setw(6)<<x<<'\n';
```

### 刷新缓冲区

```cpp
cout<<flush;
fflush(stdout);
cout.flush();
```

## 数学

### 快速幂

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

### 组合数学

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
```

## 杂项

### pb_ds

```cpp
#include <bits/extc++.h>
using namespace __gnu_pbds;
tree<pair<int,int>,null_type,less<pair<int,int>>,rb_tree_tag,tree_order_statistics_node_update> T;
```

### mt19937

```cpp
random_device rd;
mt19937 gen(rd());
uniform_int_distribution<int> dist(1,100);
int k=dist(gen);
```
