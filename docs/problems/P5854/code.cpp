#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=10000005;
int a[N],s[N],son[N][2];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	cin>>n;
	for(int i=1;i<=n;i++)cin>>a[i];
	int top=0;
	s[++top]=0;
	for(int i=1;i<=n;i++)
	{
		while(top&&a[s[top]]>a[i])son[i][0]=s[top--];
		if(s[top])son[s[top]][1]=i;
		s[++top]=i;
	}
	ll ans1=0,ans2=0;
	for(int i=1;i<=n;i++)
	{
		ans1^=i*(son[i][0]+1ll);
		ans2^=i*(son[i][1]+1ll);
	}
	cout<<ans1<<' '<<ans2<<'\n';
	return 0;
}
