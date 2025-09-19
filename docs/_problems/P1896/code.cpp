#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=10;
ll dp[N][N*N][1<<N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,x;
	cin>>n>>x;
	dp[0][0][0]=1;
	for(int i=1;i<=n;i++)
	{
		for(int l=0;l<=x;l++)
		{
			for(int j=0;j<1<<n;j++)
			{
				if(l<__builtin_popcount(j))continue;
				if(j&j>>1)continue;
				for(int k=0;k<1<<n;k++)
				{
					if(j&k<<1||j&k||j&k>>1)continue;
					dp[i][l][j]+=dp[i-1][l-__builtin_popcount(j)][k];
				}
			}
		}
	}
	ll ans=0;
	for(int i=0;i<1<<n;i++)ans+=dp[n][x][i];
	cout<<ans<<'\n';
	return 0;
}
