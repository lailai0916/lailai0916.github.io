#include <bits/stdc++.h>
using namespace std;

const int N=255;
const int mod=10007;
int a[N][N];
int Pow(int x,int y)
{
	x%=mod;
	int res=1;
	while(y)
	{
		if(y&1)res=res*x%mod;
		x=x*x%mod;
		y>>=1;
	}
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=m;i++)
	{
		int u,v;
		cin>>u>>v;
		if(u==v||a[u][v])continue;
		a[u][u]++;
		a[u][v]=mod-1;
	}
	int ans=1;
	for(int i=2;i<=n;i++)
	{
		int t=i;
		while(t<=n&&!a[t][i])t++;
		if(t>n)
		{
			ans=0;
			break;
		}
		if(t!=i)
		{
			swap(a[i],a[t]);
			ans=mod-ans;
		}
		ans=ans*a[i][i]%mod;
		int inv=Pow(a[i][i],mod-2);
		for(int j=i+1;j<=n;j++)
		{
			if(!a[j][i])continue;
			int f=a[j][i]*inv%mod;
			for(int k=i+1;k<=n;k++)a[j][k]=(a[j][k]-a[i][k]*f%mod+mod)%mod;
			a[j][i]=0;
		}
	}
	cout<<ans<<'\n';
	return 0;
}
