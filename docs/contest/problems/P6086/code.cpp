#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=5000005;
int f[N],p[N],d[N];
int n,m;
void tree_to_prufer()
{
	for(int i=1;i<n;i++)d[f[i]]++;
	for(int i=1,j=1;i<=n-2;i++,j++)
	{
		while(d[j])j++;
		p[i]=f[j];
		while(i<=n-2&&--d[p[i]]==0&&p[i]<j)
		{
			p[i+1]=f[p[i]];
			i++;
		}
	}
}
void prufer_to_tree()
{
	for(int i=1;i<=n-2;i++)d[p[i]]++;
	p[n-1]=n;
	for(int i=1,j=1;i<=n-1;i++,j++)
	{
		while(d[j])j++;
		f[j]=p[i];
		while(i<=n-1&&--d[p[i]]==0&&p[i]<j)
		{
			f[p[i]]=p[i+1];
			i++;
		}
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	cin>>n>>m;
	ll ans=0;
	if(m==1)
	{
		for(int i=1;i<=n-1;i++)cin>>f[i];
		tree_to_prufer();
		for(int i=1;i<=n-2;i++)ans^=(ll)i*p[i];
	}
	else
	{
		for(int i=1;i<=n-2;i++)cin>>p[i];
		prufer_to_tree();
		for(int i=1;i<=n-1;i++)ans^=(ll)i*f[i];
	}
	cout<<ans<<'\n';
	return 0;
}
