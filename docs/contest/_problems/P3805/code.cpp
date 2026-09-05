#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int inf=0x3f3f3f3f;
const int mod=1e9+7;
const int N=1.1e7+5;
int p[N<<1];
int manacher(string s)
{
	int n=s.size();
	string t="@#";
	for(int i=0;i<n;i++)
	{
		t+=s[i];
		t+='#';
	}
	t+='&';
	s=t;
	n=n<<1|1;
	for(int i=1,l=0,r=0;i<=n;i++)
	{
		p[i]=i<=r?min(p[l*2-i],r-i+1):1;
		while(s[i-p[i]]==s[i+p[i]])p[i]++;
		if(i+p[i]-1>r)r=i+p[i]-1,l=i;
	}
	int res=0;
	for(int i=1;i<=n;i++)res=max(res,p[i]-1);
	return res;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	string s;
	cin>>s;
	cout<<manacher(s)<<'\n';
	return 0;
}