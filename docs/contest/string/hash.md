# 字符串哈希

## 参考资料

- [字符串哈希 - OI Wiki](https://oi-wiki.org/string/hash/)

## 实现

```cpp
using ull=unsigned long long;
const int base=131;
const ull mod=212370440130137957;
ull get_hash(string s)
{
	ull res=0;
	for(int i=0;i<s.size();i++)
	{
		res=(res*base+s[i])%mod;
	}
	return res;
}
```

## 例题

<Problem id="P3370" />

<Problem id="U461211" />
