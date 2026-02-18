#include <bits/stdc++.h>
using namespace std;

const int inf=0x3f3f3f3f;
const int N=205;
int a[N],s[N],mn[N][N],mx[N][N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)
	{
		cin>>a[i];
		a[i+n]=a[i];
	}
	for(int i=1;i<=n<<1;i++)
	{
		s[i]=s[i-1]+a[i];
		for(int j=1;j<=n<<1;j++)mn[i][j]=inf;
		mn[i][i]=0;
	}
	for(int len=1;len<n;len++)
	{
		for(int i=1;i+len<=n<<1;i++)
		{
			int j=i+len;
			for(int k=i;k<j;k++)
			{
				mn[i][j]=min(mn[i][j],mn[i][k]+mn[k+1][j]+s[j]-s[i-1]);
				mx[i][j]=max(mx[i][j],mx[i][k]+mx[k+1][j]+s[j]-s[i-1]);
			}
		}
	}
	int ans1=inf,ans2=0;
	for(int i=1;i<=n;i++)
	{
		ans1=min(ans1,mn[i][i+n-1]);
		ans2=max(ans2,mx[i][i+n-1]);
	}
	cout<<ans1<<'\n'<<ans2<<'\n';
	return 0;
}
