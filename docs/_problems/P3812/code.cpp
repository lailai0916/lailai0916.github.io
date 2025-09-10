#include <bits/stdc++.h>
using namespace std;

using ull=unsigned long long;
const int N=64;
ull p[N];
void insert(ull x)
{
	for(int i=N-1;i>=0;i--)
	{
		if(x>>i&1)
		{
			if(!p[i])
			{
				p[i]=x;
				return;
			}
			x^=p[i];
		}
	}
}
ull query()
{
	ull res=0;
	for(int i=N-1;i>=0;i--)
	{
		res=max(res,res^p[i]);
	}
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		ull t;
		cin>>t;
		insert(t);
	}
	cout<<query()<<'\n';
	return 0;
}
