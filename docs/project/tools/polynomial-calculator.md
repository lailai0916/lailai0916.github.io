# 多项式计算器

```cpp
#include <bits/stdc++.h>
using namespace std;

using T=long long;
char ch;
struct Poly
{
	vector<T> v;
	Poly(initializer_list<T> a={}):v(a){}
	void maintain(){while(!v.empty()&&v.back()==0)v.pop_back();}
	T &operator[](int u){if(u>=v.size())v.resize(u+1,0);return v[u];}
	Poly operator+(const Poly &rhs) const
	{
		Poly res;
		for(int i=0;i<max(v.size(),rhs.v.size());i++)
		{
			res[i]=v[i]+rhs.v[i];
		}
		res.maintain();
		return res;
	}
	Poly operator-(const Poly &rhs) const
	{
		Poly res;
		for(int i=0;i<max(v.size(),rhs.v.size());i++)
		{
			res[i]=v[i]-rhs.v[i];
		}
		res.maintain();
		return res;
	}
	Poly operator*(const Poly &rhs) const
	{
		Poly res;
		for(int i=0;i<v.size();i++)
		{
			for(int j=0;j<rhs.v.size();j++)
			{
				res[i+j]+=v[i]*rhs.v[j];
			}
		}
		res.maintain();
		return res;
	}
	Poly operator^(const Poly &rhs) const
	{
		if(rhs.v.size()!=1)cout<<"warning"<<'\n';
		T exp=rhs.v[0];
		Poly res({1}),base=*this;
		while(exp)
		{
			if(exp&1)res=res*base;
			base=base*base;
			exp>>=1;
		}
		res.maintain();
		return res;
	}
};
void print(Poly a)
{
	bool tmp=1;
	for(int i=a.v.size()-1;i>=0;i--)
	{
		T num=a[i];
		if(num==0)continue;
		if(num<0)cout<<'-';
		else if(!tmp)cout<<'+';
		if(i==0||abs(num)!=1)cout<<abs(num);
		if(i==1)cout<<ch;
		else if(i>1)cout<<ch<<'^'<<i;
		tmp=0;
	}
	if(tmp)cout<<0;
	cout<<'\n';
}
bool isoption(char f){return f=='+'||f=='-'||f=='*'||f=='^';}
bool isvariable(char f){return f==ch;}
int priority(char f)
{
	switch(f)
	{
		case '(':return 0;
		case ')':return 0;
		case '+':return 1;
		case '-':return 1;
		case '*':return 2;
		case '^':return 3;
	}
	return 0;
}
stack<Poly> P;
stack<char> F;
void pop()
{
	char f=F.top();F.pop();
	Poly p=P.top();P.pop();
	Poly q=P.top();P.pop();
	switch(f)
	{
		case '+':P.push(q+p);break;
		case '-':P.push(q-p);break;
		case '*':P.push(q*p);break;
		case '^':P.push(q^p);break;
	}
}
Poly calc(string s)
{
	string t;
	for(int i=0;i<s.size();i++)
	{
		if(isalpha(s[i]))
		{
			if(isalpha(ch))s[i]=ch;
			else ch=s[i];
		}
	}
	for(int i=0;i<s.size();i++)
	{
		if((i==0||s[i-1]=='(')&&s[i]=='-')
		{
			t.push_back('0');
		}
		else if(i>0&&(isdigit(s[i-1])||isvariable(s[i-1]))&&isvariable(s[i]))
		{
			t.push_back('*');
		}
		else if(i>0&&(isdigit(s[i-1])||isvariable(s[i-1])||s[i-1]==')')&&s[i]=='(')
		{
			t.push_back('*');
		}
		t.push_back(s[i]);
	}
	s=t;
	while(!P.empty())P.pop();
	while(!F.empty())F.pop();
	for(int i=0;i<s.size();i++)
	{
		if(isdigit(s[i]))
		{
			T num=s[i]-'0';
			while(isdigit(s[i+1]))
			{
				num=num*10+s[++i]-'0';
			}
			P.push(Poly({num}));
		}
		else if(isvariable(s[i]))
		{
			P.push(Poly({0,1}));
		}
		else if(isoption(s[i]))
		{
			while(!F.empty()&&priority(s[i])<=priority(F.top()))pop();
			F.push(s[i]);
		}
		else if(s[i]=='(')
		{
			F.push(s[i]);
		}
		else if(s[i]==')')
		{
			while(!F.empty()&&F.top()!='(')pop();
			F.pop();
		}
	}
	while(!F.empty())pop();
	return P.top();
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	string s;
	while(cin>>s)
	{
		Poly ans=calc(s);
		print(ans);
	}
	return 0;
}
```
