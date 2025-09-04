#include <bits/stdc++.h>
#include <bits/extc++.h>
using namespace std;
using namespace __gnu_pbds;

tree<pair<int,int>,null_type,less<pair<int,int>>,rb_tree_tag,tree_order_statistics_node_update> T;
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	int cnt=0;
	while(n--)
	{
		int op,x;
		cin>>op>>x;
		if(op==1)T.insert({x,++cnt});
		else if(op==2)T.erase(T.lower_bound({x,0}));
		else if(op==3)cout<<T.order_of_key({x,0})+1<<'\n';
		else if(op==4)cout<<T.find_by_order(x-1)->first<<'\n';
		else if(op==5)cout<<prev(T.lower_bound({x,0}))->first<<'\n';
		else if(op==6)cout<<T.lower_bound({x+1,0})->first<<'\n';
	}
	return 0;
}