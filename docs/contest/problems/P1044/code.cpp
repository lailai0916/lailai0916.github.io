#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=25;
ll f[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	f[0]=1;
	for(int i=1;i<=n;i++)
	{
		for(int j=0;j<i;j++)f[i]+=f[j]*f[i-1-j];
	}
	cout<<f[n]<<'\n';
	return 0;
}
