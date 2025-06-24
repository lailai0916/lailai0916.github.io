# Manacher

## 参考资料

- [Manacher - OI Wiki](https://oi-wiki.org/string/manacher/)

## 实现

```cpp
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

### 洛谷 P3805 【模板】manacher

:::info[[洛谷 P3805 【模板】manacher](https://www.luogu.com.cn/problem/P3805)]

给出一个只由小写英文字符组成的字符串 $S$，求 $S$ 中最长回文串的长度。

:::

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
```

### 洛谷 P4555 [国家集训队] 最长双回文串

:::info[[洛谷 P4555 [国家集训队] 最长双回文串](https://www.luogu.com.cn/problem/P4555)]

给定长度为 $n$ 的字符串 $S$，求 $S$ 的最长双回文子串 $T$，即可将 $T$ 分为两部分 $X, Y$（$|X|,|Y|\ge1$）且 $X$ 和 $Y$ 都是回文串。

:::

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
		p[i]=i<=r?min(p[2*l-i],r-i+1):1;
		while(s[i-p[i]]==s[i+p[i]])p[i]++;
		if(i+p[i]-1>r)r=i+p[i]-1,l=i;
	}
	for(int i=1;i<=n;i++)
	{
		r[i+p[i]-1]=max(r[i+p[i]-1],p[i]-1);
		l[i-p[i]+1]=max(l[i-p[i]+1],p[i]-1);
	}
	for(int i=3;i<=n;i+=2)l[i]=max(l[i],l[i-2]-2);
	for(int i=n-2;i>=1;i-=2)r[i]=max(r[i],r[i+2]-2);
	int res=0;
	for(int i=1;i<=n;i+=2)
	{
		if(l[i]&&r[i])res=max(res,l[i]+r[i]);
	}
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
