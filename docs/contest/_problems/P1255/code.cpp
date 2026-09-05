#include <bits/stdc++.h>
using namespace std;

const int N=5005;
int a[2][N]={{1},{2}};
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	int len=1;
	for(int i=2;i<n;i++)
	{
		for(int j=0;j<len;j++)
		{
			a[i&1][j]+=a[i&1^1][j];
		}
		for(int j=0;j<len;j++)
		{
			a[i&1][j+1]+=a[i&1][j]/10;
			a[i&1][j]%=10;
		}
		if(a[i&1][len])len++;
	}
	for(int i=len-1;i>=0;i--)cout<<a[n&1^1][i];
	return 0;
}
