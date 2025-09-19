#include <bits/stdc++.h>
using namespace std;

using ll=long long;
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	ll n,m;
	cin>>n>>m;
	ll k=min(n,m),t=k*n*m-k*(k-1)/2*(n+m)+k*(k-1)*(k*2-1)/6;
	cout<<t<<' '<<n*(n+1)/2*m*(m+1)/2-t<<'\n';
	return 0;
}
