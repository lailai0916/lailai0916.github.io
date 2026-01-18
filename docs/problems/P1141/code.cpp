#include <bits/stdc++.h>
using namespace std;

const int dx[4]={1,-1,0,0};
const int dy[4]={0,0,1,-1};
const int N=1005;
bool a[N][N],vis[N][N];
int b[N][N],f[N*N];
void bfs(int x,int y,int k,int n)
{
	int cnt=0;
	vis[x][y]=1;
	queue<pair<int,int>> q;
	q.push({x,y});
	while(!q.empty())
	{
		auto [x1,y1]=q.front();
		q.pop();
		cnt++;
		b[x1][y1]=k;
		for(int i=0;i<4;i++)
		{
			int x2=x1+dx[i],y2=y1+dy[i];
			if(x2<1||x2>n||y2<1||y2>n)continue;
			if(a[x2][y2]^a[x1][y1]&&!vis[x2][y2])
			{
				vis[x2][y2]=1;
				q.push({x2,y2});
			}
		}
	}
	f[k]=cnt;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)
	{
		for(int j=1;j<=n;j++)
		{
			char f;
			cin>>f;
			a[i][j]=f-'0';
		}
	}
	for(int i=1;i<=m;i++)
	{
		int x,y;
		cin>>x>>y;
		if(!vis[x][y])bfs(x,y,i,n);
		cout<<f[b[x][y]]<<'\n';
	}
	return 0;
}