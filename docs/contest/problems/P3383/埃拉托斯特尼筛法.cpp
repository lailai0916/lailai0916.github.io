#include <bits/stdc++.h>
using namespace std;

const int N=100000005;
bool vis[N];
int pri[N];
void sieve()
{
	vis[0]=vis[1]=1;
	for(int i=2;i*i<N;i++)
	{
		if(vis[i])continue;
		for(int j=i*i;j<N;j+=i)vis[j]=1;
	}
	int cnt=0;
	for(int i=2;i<N;i++)
	{
		if(vis[i])continue;
		pri[++cnt]=i;
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	sieve();
	int n,q;
	cin>>n>>q;
	while(q--)
	{
		int k;
		cin>>k;
		cout<<pri[k]<<'\n';
	}
	return 0;
}
