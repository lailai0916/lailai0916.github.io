#include <bits/stdc++.h>
using namespace std;

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	string s;
	cin>>s;
	int n=s.size();
	s=' '+s;
	int ans=0,i=1;
	while(i<=n)
	{
		int j=i,k=i+1;
		while(k<=n&&s[j]<=s[k])
		{
			if(s[j]<s[k])j=i;
			else j++;
			k++;
		}
		while(i<=j)
		{
			ans^=i+k-j-1;
			i+=k-j;
		}
	}
	cout<<ans<<'\n';
	return 0;
}
