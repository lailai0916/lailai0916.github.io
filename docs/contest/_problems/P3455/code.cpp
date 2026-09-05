#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=50005;
int pri[N],mu[N],s[N];
bool vis[N];
void sieve(int n)
{
	mu[1]=1;
	int cnt=0;
	for(int i=2;i<=n;i++)
	{
		if(!vis[i])
		{
			pri[++cnt]=i;
			mu[i]=-1;
		}
		for(int j=1;j<=cnt&&i*pri[j]<=n;j++)
		{
			vis[i*pri[j]]=1;
			if(i%pri[j]==0)
			{
				mu[i*pri[j]]=0;
				break;
			}
			mu[i*pri[j]]=-mu[i];
		}
	}
	for(int i=1;i<=n;i++)s[i]=s[i-1]+mu[i];
}
ll calc(int a,int b)
{
	ll res=0;
	for(int l=1,r;l<=min(a,b);l=r+1)
	{
		r=min(a/(a/l),b/(b/l));
		res+=(ll)(s[r]-s[l-1])*(a/l)*(b/l);
	}
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	sieve(N-5);
	int T;
	cin>>T;
	while(T--)
	{
		int a,b,d;
		cin>>a>>b>>d;
		cout<<calc(a/d,b/d)<<'\n';
	}
	return 0;
}
