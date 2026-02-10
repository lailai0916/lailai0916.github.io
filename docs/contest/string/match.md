---
title: '字符串匹配'
---

## 参考资料

- [字符串匹配 - OI Wiki](https://oi-wiki.org/string/match/)
- [前缀函数与 KMP 算法 - OI Wiki](https://oi-wiki.org/string/kmp/)
- [KMP算法 - 维基百科](https://zh.wikipedia.org/wiki/KMP算法)
- [拉宾-卡普算法 - 维基百科](https://zh.wikipedia.org/wiki/拉宾-卡普算法)

## KMP 算法

```cpp
int kmp(string s,string t)
{
	int n=s.size(),m=t.size();
	for(int i=1,j=0;i<m;i++)
	{
		while(j&&t[i]!=t[j])j=nxt[j-1];
		if(t[i]==t[j])j++;
		nxt[i]=j;
	}
	for(int i=0,j=0;i<n;i++)
	{
		while(j&&s[i]!=t[j])j=nxt[j-1];
		if(s[i]==t[j])j++;
		if(j==m)return i-m+1;
	}
	return -1;
}
```

## Rabin–Karp 算法（Hash）

```cpp
int RK(string s,string t)
{
	int n=s.size(),m=t.size();
	if(n<m)return -1;
	ull h1=0,h2=0,p=Pow(base,m-1);
	for(int i=0;i<m;i++)
	{
		h1=h1*base+s[i];
		h2=h2*base+t[i];
	}
	s+='$';
	for(int i=0;i<=n-m;i++)
	{
		if(h1==h2&&s.substr(i,m)==t)return i;
		h1=(h1-s[i]*p)*base+s[i+m];
	}
	return -1;
}
```

## 例题

<Problem id="P3375" />

<Problem id="P3618" />
