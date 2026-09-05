#include <bits/stdc++.h>
using namespace std;

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	string s;
	cin>>n>>s;
	s+=s;
	int i=0,j=1,k=0;
	while(k<n&&i<n&&j<n)
	{
		if(s[i+k]==s[j+k]){k++;continue;}
		if(s[i+k]>s[j+k])i+=k+1;
		else j+=k+1;
		if(i==j)j++;
		k=0;
	}
	cout<<s.substr(min(i,j),n)<<'\n';
	return 0;
}
