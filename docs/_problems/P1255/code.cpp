#include <bits/stdc++.h>
using namespace std;

const int N=5005;
int a[N][N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	a[1][1]=1;
	a[2][1]=2;
	int len=1;
	for(int i=3;i<=n;i++)
	{
		for(int j=1;j<=len;j++)
		{
			a[i][j]+=a[i-1][j]+a[i-2][j];
			a[i][j+1]+=a[i][j]/10;
			a[i][j]%=10;
		}
		if(a[i][len+1]>0)len++;
	}
	for(int i=len;i>=1;i--)cout<<a[n][i];
	return 0;
}
