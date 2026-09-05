#include <bits/stdc++.h>
using namespace std;

const int inf=0x3f3f3f3f;
const int N=105;
const int M=10005;
int u[M],v[M],w[M];
int in[N],pre[N],id[N],vis[N];
int n,m,r;
int zhuliu()
{
	int res=0;
	while(true)
	{
		for(int i=1;i<=n;i++)in[i]=inf;
		for(int i=1;i<=m;i++)
		{
			if(u[i]!=v[i]&&w[i]<in[v[i]])
			{
				in[v[i]]=w[i];
				pre[v[i]]=u[i];
			}
		}
		for(int i=1;i<=n;i++)
		{
			if(i!=r&&in[i]==inf)return -1;
		}
		int cnt=0;
		for(int i=1;i<=n;i++)id[i]=vis[i]=0;
		for(int i=1;i<=n;i++)
		{
			if(i==r)continue;
			res+=in[i];
			int x=i;
			while(vis[x]!=i&&!id[x]&&x!=r)
			{
				vis[x]=i;
				x=pre[x];
			}
			if(x!=r&&!id[x])
			{
				id[x]=++cnt;
				for(int y=pre[x];y!=x;y=pre[y])id[y]=cnt;
			}
		}
		if(!cnt)break;
		for(int i=1;i<=n;i++)
		{
			if(!id[i])id[i]=++cnt;
		}
		for(int i=1;i<=m;i++)
		{
			int a=u[i],b=v[i];
			u[i]=id[a];
			v[i]=id[b];
			if(u[i]!=v[i])w[i]-=in[b];
		}
		n=cnt;
		r=id[r];
	}
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>n>>m>>r;
	for(int i=1;i<=m;i++)cin>>u[i]>>v[i]>>w[i];
	cout<<zhuliu()<<'\n';
	return 0;
}
