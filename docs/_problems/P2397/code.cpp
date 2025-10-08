#include <bits/stdc++.h>
using namespace std;

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	int now,cnt=0;
	while(n--)
	{
		int x;
		cin>>x;
		if(!cnt)now=x;
		if(now==x)cnt++;
		else cnt--;
	}
	cout<<now<<'\n';
	return 0;
}
