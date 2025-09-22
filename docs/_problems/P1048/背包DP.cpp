#include <bits/stdc++.h>
using namespace std;

const int N=105;
const int T=1005;
int a[N],b[N],f[T];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int t,m;
	cin>>t>>m;
	for(int i=1;i<=m;i++)
	{
		cin>>a[i]>>b[i];
	}
	for(int i=1;i<=m;i++) 
	{
		for(int j=t;j>=a[i];j--) 
		{
			f[j]=max(f[j],f[j-a[i]]+b[i]);
		}
	}    
	cout<<f[t]<<'\n';
	return 0;
}
