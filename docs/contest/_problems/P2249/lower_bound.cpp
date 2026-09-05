#include <bits/stdc++.h>
using namespace std;

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	vector<int> a(n);
	for(auto &x:a)cin>>x;
	while(m--)
	{
		int q;
		cin>>q;
		auto it=lower_bound(a.begin(),a.end(),q);
		cout<<(it!=a.end()&&*it==q?it-a.begin()+1:-1)<<' ';
	}
	return 0;
}
