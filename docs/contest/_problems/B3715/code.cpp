#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=105;
ll a[N];
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
		for(int i=1;i<=cnt;i++)
		{
			cout<<a[i]<<' ';
		}
		cout<<'\n';
	}
	return 0;
}
