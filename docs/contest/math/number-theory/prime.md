# 素数

## 素性测试

### 试除法

时间复杂度 $O(\sqrt{n})$。

```cpp
bool prime(int n)
{
	if(n<2)return 0;
	for(int i=2;i*i<=n;i++)
	{
		if(n%i==0)return 0;
	}
	return 1;
}
```

### Fermat 素性测试

- 咕.

## 例题

### 洛谷 P1217 [USACO1.5] 回文质数 Prime Palindromes

<Problem id="P1217" />
