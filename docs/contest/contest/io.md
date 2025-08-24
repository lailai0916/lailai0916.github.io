# 读写优化

## 参考资料

- [读入、输出优化 - OI Wiki](https://oi-wiki.org/contest/io/)

## 关闭同步

```cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
```

:::warning

关闭同步后，`cin`/`cout` 和 `scanf`/`printf` 不能混用，否则可能会导致未定义行为（UB），从而引发读写顺序错误。

:::

## 快速读入

```cpp
int read()
{
	int x=0,f=1;char c=getchar();
	while(c<'0'||c>'9'){if(c=='-')f=-1;c=getchar();}
	while(c>='0'&&c<='9'){x=x*10+c-48;c=getchar();}
	return x*f;
}
```

## 快速输出

```cpp
void write(int x)
{
	if(x<0)putchar('-'),x=-x;
	if(x>9)write(x/10);
	putchar(x%10+48);
}
```

## 例题

### 洛谷 P10815 【模板】快速读入

<Problem id="P10815" />
