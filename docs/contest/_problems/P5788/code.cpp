#include <bits/stdc++.h>
using namespace std;

const int N=3000005;
int a[N],ans[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
	}
	stack<int> s;
	for(int i=n;i>=1;i--)
	{
		while(!s.empty()&&a[s.top()]<=a[i])s.pop();
		if(!s.empty())ans[i]=s.top();
		s.push(i);
	}
	for(int i=1;i<=n;i++)
	{
		cout<<ans[i]<<' ';
	}
	return 0;
}