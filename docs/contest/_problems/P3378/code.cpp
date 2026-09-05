#include <bits/stdc++.h>
using namespace std;

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	priority_queue<int> q;
	while(n--)
	{
		int op;
		cin>>op;
		if(op==1)
		{
			int x;
			cin>>x;
			q.push(-x);
		}
		else if(op==2)
		{
			cout<<-q.top()<<'\n';
		}
		else if(op==3)
		{
			q.pop();
		}
	}
	return 0;
}
