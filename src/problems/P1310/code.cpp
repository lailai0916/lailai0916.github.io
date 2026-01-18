#include <bits/stdc++.h>
using namespace std;

const int mod=10007;
const int N=100005;
stack<pair<int,int>> s1;
stack<char> s2;
void pop()
{
	auto [x0,x1]=s1.top();s1.pop();
	auto [y0,y1]=s1.top();s1.pop();
	char f=s2.top();s2.pop();
	if(f=='*')s1.push({(x0*y0+x0*y1+x1*y0)%mod,x1*y1%mod});
	else if(f=='+')s1.push({x0*y0%mod,(x0*y1+x1*y0+x1*y1)%mod});
}
int pri(char f)
{
	if(f=='('||f==')')return 0;
	else if(f=='+')return 1;
	else if(f=='*')return 2;
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int n;
	string s;
	cin>>n>>s;
	string t;
	t.push_back('$');
	for(int i=0;i<n;i++)
	{
		t.push_back(s[i]);
		t.push_back('$');
	}
	n=n*2+1;
	for(int i=0;i<n;i++)
	{
		if(t[i]!='$')continue;
		char l=i>0?t[i-1]:'#',r=i<n-1?t[i+1]:'#';
		if((l=='+'||l=='*'||l =='('||l == '#')&&r=='(')continue;
		if(l ==')'&&(r =='+'||r=='*'||r ==')'||r=='#'))continue;
		t[i]='x';
	}
	s=t;
	for(int i=0;i<n;i++)
	{
		if(s[i]=='x')
		{
			s1.push({1,1});
		}
		else if(s[i]=='+'||s[i]=='*')
		{
			while(!s2.empty()&&pri(s[i])<=pri(s2.top()))pop();
			s2.push(s[i]);
		}
		else if(s[i]=='(')
		{
			s2.push(s[i]);
		}
		else if(s[i]==')')
		{
			while(!s2.empty()&&s2.top()!='(')pop();
			s2.pop();
		}
	}
	while(!s2.empty())pop();
	cout<<s1.top().first<<'\n';
	return 0;
}
