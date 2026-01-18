# 分解质因数

## 参考资料

- [分解质因数 - OI Wiki](https://oi-wiki.org/math/number-theory/pollard-rho/)

## 朴素算法

```cpp
void factorize(ll n)
{
	int cnt=0;
	for(ll k=2;k*k<=n;k++)
	{
		while(n%k==0)
		{
			a[++cnt]=k;
			n/=k;
		}
	}
	if(n!=1)a[++cnt]=n;
}
```

## Pollard Rho 算法

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll=long long;
using ld=long double;
ll mul(ll a,ll b,ll mod)
{
	return (a*b-ll(ld(a)/mod*b+0.5)*mod+mod)%mod;
}
ll Pow(ll x,ll y,ll mod)
{
	x%=mod;
	ll res=1;
	while(y)
	{
		if(y&1)res=mul(res,x,mod);
		x=mul(x,x,mod);
		y>>=1;
	}
	return res;
}
bool miller_rabin(ll n,int k)
{
	if(n<2)return 0;
	if(n==2||n==3)return 1;
	ll d=n-1,r=0;
	while(!(d&1)){r++;d>>=1;}
	while(k--)
	{
		ll x=Pow(rand()%(n-2)+2,d,n);
		if(x==1||x==n-1)continue;
		for(int i=0;i<r-1;i++)
		{
			x=mul(x,x,n);
			if(x==n-1)break;
		}
		if(x!=n-1)return 0;
	}
	return 1;
}
ll pollard_rho(ll n)
{
	ll c=rand()%(n-1)+1,sum=0,tmp=0;
	for(int i=1;;i*=2)
	{
		ll val=1;
		for(int j=1;j<=i;j++)
		{
			sum=(mul(sum,sum,n)+c)%n;
			val=mul(val,abs(sum-tmp),n);
			if(j%127==0)
			{
				ll g=__gcd(val,n);
				if(g>1)return g;
			}
		}
		ll g=__gcd(val,n);
		if(g>1)return g;
		tmp=sum;
	}
}
ll ans;
void factorize(ll n)
{
	if(n<2||n<=ans)return;
	if(miller_rabin(n,10)){ans=max(ans,n);return;}
	ll p=n;
	while(p>=n)p=pollard_rho(n);
	while(n%p==0)n/=p;
	factorize(n);
	factorize(p);
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int T;
	cin>>T;
	while(T--)
	{
		ll n;
		cin>>n;
		ans=0;
		factorize(n);
		if(ans==n)cout<<"Prime"<<'\n';
		else cout<<ans<<'\n';
	}
	return 0;
}
```

## 例题

<Problem id="B3715" />

<Problem id="P4718" />
