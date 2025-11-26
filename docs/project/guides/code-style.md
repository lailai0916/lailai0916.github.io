# lailai's Code Style Guide

本文为我在 OI 中的 C++ 代码风格指南。

## 参考资料

- [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html)
- [Menci's Code Style for OI | Menci's OI Blog](https://oi.men.ci/code-style-oi/)
- [代码风格指南 - Baoshuo's OI Blog](https://oi.baoshuo.ren/code-style-guide/)

## 通用

- 修改代码风格时不得改变原有逻辑。
- 应遵循 [C++17](https://cppreference.com/w/cpp/17.html) 标准，避免使用不兼容特性。
- 仅定义必要的常量和变量。
- 不保留注释或调试代码。
- 不使用任何防御性编程。
- 不应添加多余的空格，特殊情况除外。

```cpp
bool operator<(const Node &rhs) const
```

## 文件

- 文件应使用 **UTF-8** 编码。
- 文件末尾应以 $1$ 个 **空行** 结束。
- C++ 源文件的扩展名应使用 `.cpp`，避免使用 `.cc` 和 `.cxx`。

## 结构

### 缩进

- C++ 代码应使用 <kbd>Tab</kbd> 缩进。
- 空行不应使用缩进，不应添加 $2$ 个连续的空行。

### 大括号

- 大括号通常单独成行，简短语句可以 **写在同一行或省略大括号**。

```cpp
for(int i=1;i<=n;i++)
{
	/* code */
}
if(x<=l&&r<=y){gx(u,v,r-l+1);return;}
if(n%i==0)return 0;
```

### 头文件

- 头文件通常只使用万能头文件 `<bits/stdc++.h>`，若有特殊需求可补充其他头文件。

```cpp
#include <bits/stdc++.h>
#include <bits/extc++.h>
```

### 宏定义

- 宏定义可以按需使用。

```cpp
#define ls (u<<1)
#define rs (u<<1|1)
#define mid (l+r>>1)
```

### 命名空间

- 通常只使用标准命名空间 `std`，若有特殊需求可补充其他命名空间。

```cpp
using namespace std;
using namespace __gnu_pbds;
```

## 类型

### 别名

- 应选择合适的数据类型，例如能用 `int` 就不用 `long long`，能用 `bool` 就不用 `int`。
- 若频繁使用较长的类型名，应使用 `using` 定义别名，避免使用宏定义。

```cpp
using ll=long long;
using ld=long double;
using uint=unsigned int;
using pii=pair<int,int>;
using Comp=complex<double>;
```

### 修饰

- 使用 `const` 定义常量，避免使用宏定义。
- 避免使用 `static`、`register`、`inline` 等修饰符。

```cpp
const int N=100005;
```

## 主体

### 主函数

- 主函数应放在代码的末尾。
- 主函数的返回类型应为 `int`，并以 `return 0;` 结束。

```cpp
int main()
{
	/* code */
	return 0;
}
```

### 读写

- 若需要文件读写，应添加 `freopen`。

```cpp
freopen("problem.in","r",stdin);
freopen("problem.out","w",stdout);
```

- 若 I/O 数据量较大，应添加 **关闭同步和优化读写**。

```cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
```

- 优先使用 `cin` 和 `cout` 读写，避免使用 `scanf` 和 `printf`；按需使用 `getline` 等函数。
- 换行使用 `'\n'`，避免使用 `"\n"` 和 `endl`。

```cpp
cout<<"Yes"<<'\n';
```

### 存储

- 小变量定义在局部作用域，避免使用全局变量；大数组使用全局变量。
- 优先使用静态数组；按需使用 `vector`，例如邻接表存图。

```cpp
const int N=100005;
int a[N];
vector<int> G[N];
```

## 命名

### 命名规范

- 命名简洁，通常不超过三个字符。
- 命名通常使用英文单词辅音字母，避免使用中文拼音。
- 常用命名：

| `ans`<br />最终答案 |  `cmp`<br />比较  | `cnt`<br />计数器 | `cur`<br />当前值 |   `dep`<br />深度   | `dis`<br />距离 | `fa`<br />父节点  |
| :-----------------: | :---------------: | :---------------: | :---------------: | :-----------------: | :-------------: | :---------------: |
|   `len`<br />长度   | `mn`<br />最小值  | `mx`<br />最大值  |  `pos`<br />位置  |  `res`<br />返回值  | `rnk`<br />排名 | `rt`<br />根节点  |
|   `siz`<br />大小   | `son`<br />子节点 |  `sum`<br />总和  |  `tag`<br />标记  | `tmp`<br />临时变量 | `val`<br />价值 | `vis`<br />访问性 |

### 常量命名

- 数据规模使用 `N`、`M`、`K` 等大写字母，值为最大数据规模 $+5$。
- 模数使用 `mod`，值根据需求设置。
- 无穷大使用 `inf`，值为 `0x3f...`，以便使用 `memset` 初始化，范围根据需求选择，避免将 `inf` 设为负数。
- 圆周率使用 `pi`，值为 $\arccos(-1)$。
- 自然常数使用 `e`，值为 $\exp(1)$。

```cpp
const int N=100005; // const int K=5005;
const int mod=998244353;
const int inf=0x3f3f3f3f; // const ll inf=0x3f3f3f3f3f3f3f3f;
const double eps=1e-10;
const double pi=acos(-1);
const double e=exp(1);
```

### 变量命名

- 多组数据使用大写字母 `T`；若需要输出组号，应使用美元符号 `$`。
- 数据规模使用题目中所给的小写字母，通常为 `n`。
- 操作次数使用题目中所给的小写字母，通常为 `m` 或 `q`；操作种类使用 `op` 表示。
- 循环变量使用 `i`、`j`、`k` 等字母。

```cpp
int T;
cin>>T;
for(int $=1;$<=T;$++)
{
	int n,m;
	cin>>n>>m;
	for(int i=1;i<=n;i++)cin>>a[i];
	while(m--)
	{
		int op;
		cin>>op;
		if(op==1)/* code */
		else if(op==2)/* code */
		// ...
	}
	cout<<"Case #"<<$<<'\n';
}
```
