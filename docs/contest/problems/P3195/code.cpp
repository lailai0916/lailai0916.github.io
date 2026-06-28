#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const int N=50005;
ll g[N],f[N];
int q[N];
ll Y(int i)
{
	return f[i]+g[i]*g[i];
}
ll X(int i)
{
	return g[i];
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	ll L;
	cin>>n>>L;
	for(int i=1;i<=n;i++)
	{
		ll c;
		cin>>c;
		g[i]=g[i-1]+c;
	}
	for(int i=0;i<=n;i++)g[i]+=i;
	int hh=0,tt=0;
	q[0]=0;
	for(int j=1;j<=n;j++)
	{
		ll k=2*(g[j]-1-L);
		while(hh<tt&&Y(q[hh+1])-Y(q[hh])<=k*(X(q[hh+1])-X(q[hh])))hh++;
		int i=q[hh];
		ll x=g[j]-g[i]-1-L;
		f[j]=f[i]+x*x;
		while(hh<tt&&(Y(q[tt])-Y(q[tt-1]))*(X(j)-X(q[tt]))>=(Y(j)-Y(q[tt]))*(X(q[tt])-X(q[tt-1])))tt--;
		q[++tt]=j;
	}
	cout<<f[n]<<'\n';
	return 0;
}
