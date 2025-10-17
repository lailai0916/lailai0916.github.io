#include <bits/stdc++.h>
using namespace std;

const int mod=10000;
stack<int> s;
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int x;
	cin>>x;
	s.push(x);
	char f;
	while(cin>>f>>x)
	{
		if(f=='*')
		{
			int t=s.top();
			s.pop();
			x=x*t%mod;
		}
		s.push(x);
	}
	int ans=0;
	while(!s.empty())
	{
		ans=(ans+s.top())%mod;
		s.pop();
	}
	cout<<ans<<'\n';
	return 0;
}
