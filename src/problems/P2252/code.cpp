#include <bits/stdc++.h>
using namespace std;

using ll=long long;
using ld=long double;
const ld phi=(sqrt(ld(5))+1)/2;
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	ll a,b;
	cin>>a>>b;
	if(a>b)swap(a,b);
	cout<<(a!=ll((b-a)*phi))<<'\n';
	return 0;
}
