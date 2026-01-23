---
title: 'Manacher'
---

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
	return n;
}
```

## 例题

<Problem id="P3805" />

<Problem id="P4555" />
