#include <bits/stdc++.h>
using namespace std;

const int N=2000005;
int a[N],c[N],ans[N];
void add(int u){while(u<N){c[u]++;u+=u&-u;}}
int sum(int u){int res=0;while(u){res+=c[u];u-=u&-u;}return res;}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)cin>>a[i];
	vector<tuple<int,int,int,int>> s;
	for(int i=1;i<=m;i++)
	{
		int l,r,x;
		cin>>l>>r>>x;
		s.push_back({r,x,i,1});
		s.push_back({l-1,x,i,-1});
	}
	sort(s.begin(),s.end());
	int i=1;
	for(auto [p,x,id,f]:s)
	{
		while(i<=p)add(a[i++]);
		ans[id]+=sum(x)*f;
	}
	for(int i=1;i<=m;i++)cout<<ans[i]<<'\n';
	return 0;
}
