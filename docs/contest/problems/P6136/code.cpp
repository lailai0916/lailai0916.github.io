#include <bits/stdc++.h>
#include <bits/extc++.h>
using namespace std;
using namespace __gnu_pbds;

tree<pair<int,int>,null_type,less<pair<int,int>>,rb_tree_tag,tree_order_statistics_node_update> T;
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	int cnt=0;
	for(int i=1;i<=n;i++)
	{
		int x;
		cin>>x;
		T.insert({x,++cnt});
	}
	int ans=0,last=0;
	while(m--)
	{
		int op,x;
		cin>>op>>x;
		x^=last;
		if(op==1)T.insert({x,++cnt});
		if(op==2)T.erase(T.lower_bound({x,0}));
		if(op==3)ans^=last=T.order_of_key({x,0})+1;
		if(op==4)ans^=last=T.find_by_order(x-1)->first;
		if(op==5)ans^=last=prev(T.lower_bound({x,0}))->first;
		if(op==6)ans^=last=T.lower_bound({x+1,0})->first;
	}
	cout<<ans<<'\n';
	return 0;
}
