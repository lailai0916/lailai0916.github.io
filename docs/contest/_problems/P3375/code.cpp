#include <bits/stdc++.h>
using namespace std;

const int N=1000005;
int nxt[N];
void kmp(string s,string t)
{
	int n=s.size(),m=t.size();
	for(int i=1;i<m;i++)
	{
		int j=nxt[i-1];
		while(j&&t[i]!=t[j])j=nxt[j-1];
		if(t[i]==t[j])j++;
		nxt[i]=j;
	}
	int j=0;
	for(int i=0;i<n;i++)
	{
		while(j&&s[i]!=t[j])j=nxt[j-1];
		if(s[i]==t[j])j++;
		if(j==m)cout<<i-m+2<<'\n';
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	string s,t;
	cin>>s>>t;
	kmp(s,t);
	for(int i=0;i<t.size();i++)
	{
		cout<<nxt[i]<<' ';
	}
	return 0;
}