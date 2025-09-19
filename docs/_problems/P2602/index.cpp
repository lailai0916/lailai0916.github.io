#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=15;
ll t1[N],t2[N];
ll ans1[N],ans2[N];
void init()
{
	t2[0]=1;
	for(int i=1;i<N;i++)
	{
		t1[i]=t1[i-1]*10+t2[i-1];
		t2[i]=t2[i-1]*10;
	}
}
void solve(ll x,ll *ans)
{
	ll t[N];
	int cnt=0;
	while(x){t[++cnt]=x%10;x/=10;} 
	for(int i=cnt;i>=1;i--)
	{
		for(int j=0;j<=9;j++)ans[j]+=t1[i-1]*t[i];
		for(int j=0;j<t[i];j++)ans[j]+=t2[i-1];
		ll k=0;
		for(int j=i-1;j>=1;j--)k=k*10+t[j];
		ans[t[i]]+=k+1;
		ans[0]-=t2[i-1];
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	init();
	ll a,b;
	cin>>a>>b;
	solve(a-1,ans1);
	solve(b,ans2);
	for(int i=0;i<=9;i++)
	{
		cout<<ans2[i]-ans1[i]<<' ';
	}
	return 0;
}
