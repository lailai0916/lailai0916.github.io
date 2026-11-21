#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=86;
const int M=14;
const int mod=1000000000;
ll a[N][N];
int id[M][M];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	int cnt=0;
	for(int i=1;i<=n;i++)
	{
		for(int j=1;j<=m;j++)
		{
			char c;
			cin>>c;
			if(c=='*')continue;
			cnt++;
			int u=id[i][j]=cnt;
			int v[2]={id[i-1][j],id[i][j-1]};
			for(auto x:v)
			{
				if(!x)continue;
				a[u][u]++;
				a[x][x]++;
				a[u][x]=a[x][u]=mod-1;
			}
		}
	}
	ll ans=1;
	for(int i=1;i<cnt;i++)
	{
		for(int j=i+1;j<cnt;j++)
		{
			while(a[j][i])
			{
				int f=a[i][i]/a[j][i];
				for(int k=i;k<cnt;k++)a[i][k]=(a[i][k]-a[j][k]*f%mod+mod)%mod;
				swap(a[i],a[j]);
				ans=mod-ans;
			}
		}
		ans=ans*a[i][i]%mod;
		if(!ans)break;
	}
	cout<<ans<<'\n';
	return 0;
}
