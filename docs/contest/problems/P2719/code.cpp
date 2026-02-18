#include <bits/stdc++.h>
using namespace std;

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	n>>=1;
	double ans=1;
	for(int i=1;i<n;i++)ans=ans*(i+n-1)/(i<<2);
	cout<<fixed<<setprecision(4)<<1-ans<<'\n';
	return 0;
}
