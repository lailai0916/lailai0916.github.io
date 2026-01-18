#include <bits/stdc++.h>
using namespace std;

const int N=1000005;
int a[N],ans[N];
int n,k;
void f(bool type)
{
	deque<pair<int,int>> q;
	for(int i=1;i<=n;i++)
	{
		while(!q.empty()&&(q.back().second>=a[i])^type)q.pop_back();
		q.push_back({i,a[i]});
		while(q.front().first<=i-k)q.pop_front();
		if(i>=k)ans[i]=q.front().second;
	}
	for(int i=k;i<=n;i++)cout<<ans[i]<<' ';cout<<'\n';
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>n>>k;
	for(int i=1;i<=n;i++)cin>>a[i];
	f(0);
	f(1);
	return 0;
}
