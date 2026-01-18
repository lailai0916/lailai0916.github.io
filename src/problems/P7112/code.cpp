#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int inf=0x3f3f3f3f;
const int N=605;
ll a[N][N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,mod;
	cin>>n>>mod;
	for(int i=1;i<=n;i++)
	{
		for(int j=1;j<=n;j++)
		{
			cin>>a[i][j];
		}
	}
	ll ans=1;
	for(int i=1;i<=n;i++)
	{
		for(int j=i+1;j<=n;j++)
		{
			while(a[i][i])
			{
				int tmp=a[j][i]/a[i][i];
				for(int k=i;k<=n;k++)
				{
					a[j][k]=(a[j][k]-a[i][k]*tmp%mod)%mod;
				}
				swap(a[i],a[j]);
				ans=-ans;
			}
			swap(a[i],a[j]);
			ans=-ans;
		}
	}
	for(int i=1;i<=n;i++)
	{
		ans=ans*a[i][i]%mod;
	}
	cout<<(ans+mod)%mod<<'\n';
	return 0;
}
