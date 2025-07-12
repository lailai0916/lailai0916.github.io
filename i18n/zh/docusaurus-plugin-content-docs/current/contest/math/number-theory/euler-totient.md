# 欧拉函数

## 扩展欧拉定理

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int inf=0x3f3f3f3f;
const int mod=1e9+7;
const int N=200005;
ll phi(ll n)
{
	ll res=n;
	for(ll i=2;i*i<=n;i++)
	{
	    if(n%i==0)
	    {
			res=res/i*(i-1);
			while(n%i==0)n/=i;
		}
	}
	if(n>1)res=res/n*(n-1);
	return res;
}
ll Pow(ll a,ll b,ll m)
{
	a%=m;
	ll res=1;
	while(b)
	{
		if(b&1)res=res*a%m;
		a=a*a%m;
		b>>=1;
	}
	return res;
}
ll Mod(string s,ll m)
{
    ll res=0,f=0;
    for(auto c:s)
    {
        res=res*10+(c-'0');
        if(res>=m)f=1;
        res%=m;
    }
    return res+m*f;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	ll a,m;
	string b;
	cin>>a>>m>>b;
	cout<<Pow(a,Mod(b,phi(m)),m)<<'\n';
	return 0;
}
```

## 例题

### 洛谷 P5091 【模板】扩展欧拉定理

<Problem id="P5091" />
