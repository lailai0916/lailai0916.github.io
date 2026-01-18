#include <bits/stdc++.h>
using namespace std;

using ll=long long;
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	if(n==1){cout<<-1<<'\n';return 0;}
	cout<<n<<' '<<n+1<<' '<<n*(n+1)<<'\n';
	return 0;
}
