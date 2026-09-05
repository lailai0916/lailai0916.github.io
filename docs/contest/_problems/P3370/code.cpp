#include <bits/stdc++.h>
using namespace std;

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	set<string> s;
	for(int i=1;i<=n;i++)
	{
		string t;
		cin>>t;
		s.insert(t);
	}
	cout<<s.size()<<'\n';
	return 0;
}
