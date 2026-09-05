#include <bits/stdc++.h>
using namespace std;

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int T;
	cin>>T;
	while(T--)
	{
		int n;
		cin>>n;
		int sum=0;
		for(int i=1;i<=n;i++)
		{
			int t;
			cin>>t;
			sum^=t;
		}
		cout<<(sum==0?"No":"Yes")<<'\n';
	}
	return 0;
}
