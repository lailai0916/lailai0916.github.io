#include <bits/stdc++.h>
using namespace std;

bool palindrome(int n)
{
	int x=0,y=n;
	while(n)
	{
		x=x*10+n%10;
		n/=10;
	}
	return x==y;
}
bool prime(int n)
{
	if(n<2)return 0;
	for(int i=2;i*i<=n;i++)
	{
		if(n%i==0)return 0;
	}
	return 1;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int a,b;
	cin>>a>>b;
	for(int i=a|1;i<=b;i+=2)
	{
		if(palindrome(i)&&prime(i))cout<<i<<'\n';
	}
	return 0;
}
