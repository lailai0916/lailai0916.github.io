#include <bits/stdc++.h>
using namespace std;

const int inf=0x3f3f3f3f;
const int N=3005,M=305;
int a[N],s[N],f[M][N];
int w(int i,int j)
{
	int mid=i+j>>1;
	return s[j]-s[mid]-(j-mid)*a[mid]+(mid-i)*a[mid]-(s[mid-1]-s[i-1]);
}
void solve(int p,int l,int r,int pl,int pr)
{
	if(l>r)return;
	int mid=l+r>>1;
	int pos=pl;
	f[p][mid]=inf;
	for(int k=min(mid,pr);k>=pl;k--)
	{
		int val=f[p-1][k-1]+w(k,mid);
		if(val<=f[p][mid])
		{
			f[p][mid]=val;
			pos=k;
		}
	}
	solve(p,l,mid-1,pl,pos);
	solve(p,mid+1,r,pos,pr);
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)cin>>a[i];
	sort(a+1,a+n+1);
	for(int i=1;i<=n;i++)s[i]=s[i-1]+a[i];
	for(int i=1;i<=n;i++)f[0][i]=inf;
	f[0][0]=0;
	for(int p=1;p<=m;p++)solve(p,1,n,1,n);
	cout<<f[m][n]<<'\n';
	return 0;
}
