#include <bits/stdc++.h>
using namespace std;

using ull=unsigned long long;
const int base=131;
const ull mod=212370440130137957;
ull get_hash(string s)
{
	ull res=0;
	for(int i=0;i<s.size();i++)
	{
		res=(res*base+s[i])%mod;
	}
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	map<ull,int> m;
	int ans=0;
	while(n--)
	{
		string s;
		cin>>s;
		ull h=get_hash(s);
		if(!m[h])
		{
			ans++;
			m[h]=1;
		}
	}
	cout<<ans<<'\n';
	return 0;
}