#include <bits/stdc++.h>
using namespace std;

const int N=1000005;
bool vis[N];
int pri[N],sum[N];
void init()
{
	int cnt=0;
	vis[0]=vis[1]=1;
	for(int i=2;i<N;i++)
	{
		sum[i]=sum[i-1];
		if(!vis[i])
		{
			pri[++cnt]=i;
			sum[i]++;
		}
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
	int n,m;
	cin>>n>>m;
	while(n--)
	{
		int l,r;
		cin>>l>>r;
		if(l>=1&&r<=m)cout<<sum[r]-sum[l-1]<<'\n';
		else cout<<"Crossing the line"<<'\n';
	}
	return 0;
}