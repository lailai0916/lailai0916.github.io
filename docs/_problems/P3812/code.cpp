#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=63;
ll p[N];
void insert(ll x)
{
	for(int i=N;i>=0;i--)
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
ll query()
{
	ll res=0;
	for(int i=N;i>=0;i--)res=max(res,res^p[i]);
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
		ll t;
		cin>>t;
		insert(t);
	}
	cout<<query()<<'\n';
	return 0;
}
