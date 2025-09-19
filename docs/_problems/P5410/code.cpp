#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int N=40000005;
int z[N];
void get_z(string s,int n)
{
	z[1]=n;
	for(int i=2,l=1,r=1;i<=n;i++)
	{
		z[i]=i<=r?min(z[i-l+1],r-i+1):0;
		while(i+z[i]<=n&&s[i+z[i]]==s[1+z[i]])z[i]++;
		if(i+z[i]-1>r)r=i+z[i]-1,l=i;
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	string a,b;
	cin>>a>>b;
	int n=a.size(),m=b.size();
	b=' '+b+'$'+a;
	get_z(b,n+m+1);
	ll ans1=0,ans2=0;
	z[1]=m;
	for(int i=1;i<=m;i++)ans1^=(ll)(z[i]+1)*i;
	for(int i=1;i<=n;i++)ans2^=(ll)(z[m+i+1]+1)*i;
	cout<<ans1<<'\n'<<ans2<<'\n';
	return 0;
}
