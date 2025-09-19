# 读写优化

## 参考资料

- [读入、输出优化 - OI Wiki](https://oi-wiki.org/contest/io/)

## 关闭同步 & 解除关联

```cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
```

:::warning

关闭同步后，`cin`/`cout` 和 `scanf`/`printf` 不能混用，否则可能会导致未定义行为（UB），从而引发读写顺序错误。

:::

## 快读快写

<Tabs>
<TabItem value="getchar">

```cpp
int read()
{
	int x=0,f=1;char c=getchar();
	while(c<'0'||c>'9'){if(c=='-')f=-1;c=getchar();}
	while(c>='0'&&c<='9')x=x*10+c-48,c=getchar();
	return x*f;
}
void write(int x)
{
	if(x<0)putchar('-'),x=-x;
	if(x>9)write(x/10);
	putchar(x%10+48);
}
```

</TabItem>
<TabItem value="getchar_unlocked">

```cpp
int read()
{
	int x=0,f=1;char c=getchar_unlocked();
	while(c<'0'||c>'9'){if(c=='-')f=-1;c=getchar_unlocked();}
	while(c>='0'&&c<='9')x=x*10+c-48,c=getchar_unlocked();
	return x*f;
}
void write(int x)
{
	if(x<0)putchar('-'),x=-x;
	if(x>9)write(x/10);
	putchar(x%10+48);
}
```

</TabItem>
<TabItem value="namespace IO">

```cpp
namespace IO
{
	#define MAX_SIZE (1<<16)
	char buf[MAX_SIZE],pbuf[MAX_SIZE],*p1,*p2,*pp=pbuf;
	#define getchar() (p1==p2&&(p2=(p1=buf)+fread(buf,1,MAX_SIZE,stdin),p1==p2)?EOF:*p1++)
	#define putchar(x) (pp==pbuf+MAX_SIZE&&(fwrite(pbuf,1,MAX_SIZE,stdout),pp=pbuf),*pp++=(x))
	#define flush() (fwrite(pbuf,1,pp-pbuf,stdout),pp=pbuf)
	inline char read(char &x){while(x=getchar(),isspace(x));return x;}
	inline void print(const char x){putchar(x);}
	inline char* read(char *x){static char ch;while(ch=getchar(),isspace(ch));while(~ch&&!isspace(ch)) *x++=ch,ch=getchar();*x='\000';return x;}
	inline void print(char *x){while(*x) putchar(*x++);}inline void print(const char *x){while(*x) putchar(*x++);}
	template<typename T> inline T read(T &x){static char ch;bool f=true;x=0;while(ch=getchar(),(~ch&&!isdigit(ch))) f&=(bool)(ch^'-');while(isdigit(ch)) x=(x<<1)+(x<<3)+(ch^48),ch=getchar();return x=f?x:-x;}
	template<typename T> inline void print(T x){static short stk[20],top=0;if(x<0) x=-x,putchar('-');do stk[top++]=x%10,x/=10;while(x);while(top) putchar(stk[--top]^48);}
	template<typename T,typename ...T1>inline T read(T &a,T1 &...b){return read(a),read(b...),a;}
	template<typename T,typename ...T1>inline void print(const T a,const T1 ...b){print(a);print(b...);}
	struct in{}cin;struct out{~out(){flush();}}cout;
	inline in& operator>>(in &io,char *x){return read(x),io;}
	template<typename T> inline in& operator>>(in &io,T &x){return read(x),io;}
	template<typename T> inline out& operator<<(out &io,const T x){return print(x),io;}
}
```

</TabItem>
</Tabs>

## 例题

### 洛谷 P10815 【模板】快速读入

<Problem id="P10815" />
