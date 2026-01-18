#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int mod=998244353;
const int N=1000005;
int a[N],c[N];
ll fac[N];
void add(int u){while(u<N){c[u]++;u+=u&-u;}}
int sum(int u){int res=0;while(u){res+=c[u];u-=u&-u;}return res;}
void init(){for(int i=0;i<N;i++){fac[i]=i==0?1:fac[i-1]*i%mod;}}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	init();
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
	}
	ll ans=1;
	for(int i=n;i>=1;i--)
	{
		ans=(ans+fac[n-i]*sum(a[i]))%mod;
		add(a[i]);
	}
	cout<<ans<<'\n';
	return 0;
}