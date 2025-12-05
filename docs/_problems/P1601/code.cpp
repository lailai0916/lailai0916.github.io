#include <bits/stdc++.h>
using namespace std;

const int N=505;
int a[N],b[N];
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	string s,t;
	cin>>s>>t;
	int n=s.size(),m=t.size(),k=max(n,m);
	for(int i=0;i<n;i++)a[n-i-1]=s[i]-'0';
	for(int i=0;i<m;i++)b[m-i-1]=t[i]-'0';
	for(int i=0;i<k;i++)
	{
		a[i]+=b[i];
		a[i+1]+=a[i]/10;
		a[i]%=10;
	}
	if(a[k])k++;
	for(int i=k-1;i>=0;i--)cout<<a[i];
	return 0;
}
