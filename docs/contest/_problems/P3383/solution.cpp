#include <bits/stdc++.h>
using namespace std;

const int N=100000005;
bool vis[N];
int pri[N];
void init()
{
	vis[0]=vis[1]=1;
	int cnt=0;
	for(int i=2;i<N;i++)
	{
		if(!vis[i])pri[++cnt]=i;
		for(int j=1;j<=cnt;j++)
		{
			if(i*pri[j]>=N)break;
			vis[i*pri[j]]=1;
			if(i%pri[j]==0)break;
		}
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	init();
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