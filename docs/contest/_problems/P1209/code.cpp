#include <bits/stdc++.h>
using namespace std;

const int N=205;
int a[N],b[N];
int main() 
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int m,s,c;
	cin>>m>>s>>c;
	for(int i=1;i<=c;i++)
	{
		cin>>a[i];
	}
	if(m>c)
	{
		cout<<c<<'\n';
		return 0;
	}
	sort(a+1,a+c+1);
	int ans=a[c]-a[1]+1;
	for(int i=2;i<=c;i++)
	{
		b[i-1]=a[i]-a[i-1];
	}
	sort(b+1,b+c+1,greater<int>());
	for(int i=1;i<=m-1;i++)
	{
		ans-=b[i]-1;
	}
	cout<<ans<<'\n';
	return 0;
}
