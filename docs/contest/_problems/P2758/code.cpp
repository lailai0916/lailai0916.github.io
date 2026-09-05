#include <bits/stdc++.h>
using namespace std;

const int N=2005;
int f[N][N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	string a,b;
	cin>>a>>b;
	int n=a.size(),m=b.size();
	for(int i=0;i<=n;i++)f[i][0]=i;
	for(int j=0;j<=m;j++)f[0][j]=j;
	for(int i=1;i<=n;i++)
	{
		for(int j=1;j<=m;j++)
		{
			if(a[i-1]==b[j-1]){f[i][j]=f[i-1][j-1];continue;}
			f[i][j]=min({f[i-1][j-1],f[i-1][j],f[i][j-1]})+1;
		}
	}
	cout<<f[n][m]<<'\n';
	return 0;
}
