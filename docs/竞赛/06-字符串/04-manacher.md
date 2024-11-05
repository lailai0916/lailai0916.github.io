# manacher

## 实现

```cpp
int p[N<<1];
int manacher(string s)
{
	int n=s.size();
	string t((n<<1)+3,' ');
	t[0]='@';t[1]='#';
	for(int i=0;i<n;i++)
	{
		t[(i<<1)+2]=s[i];
		t[(i<<1)+3]='#';
	}
	n=n<<1|1;
	t[n+1]='&';
	s=t;
	for(int i=1,l=0,r=0;i<=n;i++)
	{
		p[i]=i<=r?min(p[2*l-i],r-i+1):1;
		while(s[i-p[i]]==s[i+p[i]])p[i]++;
		if(i+p[i]-1>r)r=i+p[i]-1,l=i;
	}
	int res=0;
	for(int i=1;i<=n;i++)// get answer.
	return res;
}
```

## 例题

### P3805 【模板】manacher

```cpp
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
	string t((n<<1)+3,' ');
	t[0]='@';t[1]='#';
	for(int i=0;i<n;i++)
	{
		t[(i<<1)+2]=s[i];
		t[(i<<1)+3]='#';
	}
	n=n<<1|1;
	t[n+1]='&';
	s=t;
	for(int i=1,l=0,r=0;i<=n;i++)
	{
		p[i]=i<=r?min(p[2*l-i],r-i+1):1;
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
```

### P4555 [国家集训队] 最长双回文串

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll=long long;
const int inf=0x3f3f3f3f;
const int mod=1e9+7;
const int N=1.1e7+5;
int p[N<<1],l[N<<1],r[N<<1];
int manacher(string s)
{
	int n=s.size();
	string t((n<<1)+3,' ');
	t[0]='@';t[1]='#';
	for(int i=0;i<n;i++)
	{
		t[(i<<1)+2]=s[i];
		t[(i<<1)+3]='#';
	}
	n=n<<1|1;
	t[n+1]='&';
	s=t;
	for(int i=1,l=0,r=0;i<=n;i++)
	{
		p[i]=i<=r?min(p[2*l-i],r-i+1):1;
		while(s[i-p[i]]==s[i+p[i]])p[i]++;
		if(i+p[i]-1>r)r=i+p[i]-1,l=i;
	}
	for(int i=1;i<=n;i++)
	{
		r[i+p[i]-1]=max(r[i+p[i]-1],p[i]-1);
		l[i-p[i]+1]=max(l[i-p[i]+1],p[i]-1);
	}
	int res=0;
	for(int i=n;i>=1;i-=2)r[i]=max(r[i],r[i+2]-2);
	for(int i=1;i<=n;i+=2)l[i]=max(l[i],l[i-2]-2);
	for(int i=1;i<=n;i+=2)if(r[i]&&l[i])res=max(res,l[i]+r[i]);
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
```
