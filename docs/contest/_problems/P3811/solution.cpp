#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=3000005;
int mod;
ll inv[N];
void init()
{
	inv[1]=1;
	for(int i=2;i<N;i++)
	{
		inv[i]=(mod-mod/i)*inv[mod%i]%mod;
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n>>mod;
	init();
	for(int i=1;i<=n;i++)
	{
		cout<<inv[i]<<'\n';
	}
	return 0;
}