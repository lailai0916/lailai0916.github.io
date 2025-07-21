# lailai's Code Style

本文记录我在 OI 中常用的代码风格规范。

我的代码风格会调整，因此旧代码可能不符合当前的规范。

## 参考资料

- [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html)
- [Menci's Code Style for OI | Menci's OI Blog](https://oi.men.ci/code-style-oi/)

## 通用

### 兼容性

- 代码兼容 `c++17`，避免使用不兼容的特性。
- 修改代码时请确保不改变原有的逻辑，以保证修改前后的代码功能保持一致。

### 简洁性

- 不包含未使用的变量，仅定义需要使用的变量。
- 不保留注释和调试代码。
- 不添加多余的空行，除了开头部分后的唯一空行。
- 不添加原则上非必要的空格，除非因为特殊原因可以省略。

```cpp
bool operator<(const Node &rhs) const
```

### 大括号

- 大括号单独占一行。

```cpp
for(int i=1;i<=n;i++)
{
	// do sth
}
```

- 若代码较短，可以与条件语句同一行。

```cpp
if(x<=l&&r<=y){gx(u,v,r-l+1);return;}
```

- 若条件语句后只有一个语句，可以省略大括号。

```cpp
if(n%i==0)return 0;
```

### 缩进

- C++ 使用 Tab 缩进，Markdown 使用 $4$ 空格缩进。

```cpp
int main()
{
	// do sth
	return 0;
}
```

## 开头

### 头文件

- 使用万能头文件。若无法满足需求，可以使用其他头文件。

```cpp
#include <bits/stdc++.h>
```

### 宏定义

- 需要时可以使用宏定义。

```cpp
#define mid (l+r>>1)
```

### 命名空间

- 使用标准命名空间。

```cpp
using namespace std;
```

### 空行

- 头文件、宏定义和命名空间之后保留唯一的空行。

### 别名

- 若代码中大量使用较长的类型名，可以使用 `using` 定义别名。

```cpp
using ll=long long;
using uint=unsigned int;
using pii=pair<int,int>;
```

### 修饰

- 常量使用 `const` 定义，避免使用宏进行常量定义。

```cpp
const int N=100005;
```

- 不使用 `static`、`register`、`inline` 修饰。

## 核心

### 主函数

- 主函数位于代码末尾。
- 主函数的返回值类型为 `int`，结尾有 `return 0`。

```cpp
int main()
{
	// do sth
	return 0;
}
```

### 读写

- 若需要文件读写，在主函数开头添加 `freopen`。

```cpp
freopen("problem.in","r",stdin);
freopen("problem.out","w",stdout);
```

- 若 IO 数据量较大，在主函数开头添加关闭同步和优化读写。

```cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
```

- 使用 `cin` 和 `cout` 进行读写，若无法满足需求，可以使用 `getline` 等其他函数，但避免使用 `scanf` 和 `printf`。
- 使用 `'\n'` 进行换行，避免使用 `"\n"` 或 `endl`。

```cpp
cout<<"Yes"<<'\n';
```

### 存储

- 小型变量应在局部范围内定义，避免使用全局变量。
- 大型数组应定义为全局变量。
- 若数组大小需要动态确定（如邻接表存储图），可使用 `vector`。

```cpp
vector<int> G[N];
```

- 若数组大小已知，使用静态数组，避免使用 `vector`。

```cpp
int a[N];
for(int i=1;i<=n;i++)cin>>a[i];
```

## 命名

- 变量名和常量名应简洁，通常不超过 $3$ 个字符。
- 仅定义实际用到的变量和常量。

### 常量命名

#### 数据范围

- 使用大写字母 `N`，值通常为最大范围 $+5$。

```cpp
const int N=100005;
```

- 若有多个变量的范围，可以用 `M`、`K` 等其他大写字母。

#### 模数

- 使用 `mod`，大小根据需求设置。

```cpp
const int mod=998244353;
```

#### 无穷大

- 使用 `inf`，范围根据需求选择 `int` 或 `long long`。

```cpp
const int inf=0x3f3f3f3f;
const ll inf=0x3f3f3f3f3f3f3f3f;
```

:::tip

1. 无穷大 `inf` 默认为正数，负无穷大使用 `-inf`，避免将 `inf` 设为负数。
2. 为了保证可以使用 `memset` 初始化，通常使用 $(3f3f3f3f)_{16}$ 或 $(3f3f3f3f3f3f3f3f)_{16}$

:::

#### 极小值

- 使用 `eps`，大小根据需求设置。

```cpp
const double eps=1e-8;
```

#### 圆周率

- 使用 `pi`，值为 $\arccos{(-1)}$。

```cpp
const double pi=acos(-1);
```

### 变量命名

#### 多组数据

- 使用大写字母 `T`。

```cpp
int T;
cin>>T;
while(T--)
{
	// do sth
}
```

#### 组数序号

- 使用美元符号 `$`。

```cpp
int T;
cin>>T;
for(int $=1;$<=T;$++)
{
	// do sth
	cout<<$<<'\n';
}
```

#### 数据范围

- 使用题目中所给的小写字母，一般为 `n`。

```cpp
int n;
cin>>n;
```

#### 操作次数

- 使用题目中所给的小写字母，一般为 `m` 或 `q`。
- 使用 `op` 表示操作种类。

```cpp
int m;
cin>>m;
while(m--)
{
	int op;
	cin>>op;
	if(op==1)
	{
		// do sth
	}
	else if(op==2)
	{
		// do sth
	}
	// ...
}
```

#### 通用变量名

- `res`：函数的返回值或局部结果。
- `ans`：最终答案。
- `cnt`：计数器。
- `tmp`：临时变量。
- `mx`：最大值。
- `mn`：最小值。
