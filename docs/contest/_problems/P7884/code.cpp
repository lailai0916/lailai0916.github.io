#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const double eps=1e-6;
const int N=85000010;
const int M=30000005;
int c[N],lim,sq,tot;
ll g[M],w[M];
double inv[M];
bool vis[N];
void add(int u){vis[u]=1;while(u<=lim){c[u]++;u+=u&-u;}}
ll query(int u){ll res=u;while(u){res-=c[u];u-=u&-u;}return res;}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	ll n;
	cin>>n;
	sq=sqrt(n)+1;
	lim=max((int)pow(n/log2(n),0.66),sq);
	lim=max(lim,10000);
	lim=min((ll)lim,n);
	for(int i=1;i<=sq;i++)w[i]=i-1,inv[i]=1.0/i;
	for(tot=1;1ll*lim*tot<n;tot++)g[tot]=n*inv[tot]+eps-1;
	tot--;
	add(1);
	for(int i=2;1ll*i*i<=n;i++)
	{
		if(vis[i])continue;
		ll x0=w[i-1],t=n/i,r=1ll*i*i;
		int tl=min((ll)tot,n/r);
		int tl2=min((ll)tl,ll(n/(1.0*sq*i)));
		int tl3=min(tl2,tot/i);
		for(int j=1;j<=tl3;j++)g[j]-=g[j*i]-x0;
		for(int j=tl3+1;j<=tl2;j++)g[j]-=query(t*inv[j]+eps)-x0;
		for(int j=tl2+1;j<=tl;j++)g[j]-=w[int(t*inv[j]+eps)]-x0;
		for(int j=sq;j>=r;j--)w[j]-=w[int(j*inv[i]+eps)]-x0;
		if(1ll*i*i<=lim)for(int j=i*i;j<=lim;j+=i)if(!vis[j])add(j);
	}
	if(!tot)g[1]=query(n);
	cout<<g[1]<<'\n';
	return 0;
}
