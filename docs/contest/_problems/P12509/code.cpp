#include <bits/stdc++.h>
using namespace std;

int f(string s)
{
	int res=0;
	for(int i=0;i<s.length();i++)
	{
		res^=(s[i]-'0')*(i+1);
	}
	return res;
}
int Alice(string S)
{
	return f(S);
}
int Bob(string T,int X)
{
	return f(T)^X;
}