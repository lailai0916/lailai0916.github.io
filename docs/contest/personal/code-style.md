# lailai's Code Style

本文是我在 OI 中使用的 C++ 代码风格规范，旨在提升代码的可读性、一致性与简洁性。

我的代码风格会调整，因此旧代码可能不符合当前的规范。

## 参考资料

- [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html)
- [Menci's Code Style for OI | Menci's OI Blog](https://oi.men.ci/code-style-oi/)
- [代码风格指南 - Baoshuo's OI Blog](https://oi.baoshuo.ren/code-style-guide/)

## 通用

### 兼容性

- 使用 [C++17](https://cppreference.com/w/cpp/17.html) 标准，避免使用不兼容特性。
- 修改代码风格应确保不改变原有逻辑。

### 简洁性

- 仅定义必要的常量和变量。
- 不保留注释或调试代码。
- 不需要使用防御性编程。
- 除开头外不添加多余空行。
- 原则上不添加多余空格，特殊情况除外。

```cpp
bool operator<(const Node &rhs) const
```

### 缩进与大括号

- C++ 代码使用 <kbd>Tab</kbd> 缩进。
- 大括号通常单独成行。

```cpp
for(int i=1;i<=n;i++)
{
	// do sth
}
```

- 简短语句可写在同一行或省略大括号：

```cpp
if(x<=l&&r<=y){gx(u,v,r-l+1);return;}
if(n%i==0)return 0;
```

## 文件结构

### 头文件

- 使用万能头文件 `bits/stdc++.h`。
- 如有特殊需求，可补充其他头文件。

```cpp
#include <bits/stdc++.h>
#include <bits/extc++.h>
```

### 宏定义

- 如有需要可使用宏定义。

```cpp
#define mid (l+r>>1)
```

### 命名空间

- 使用标准命名空间 `std`。
- 如有特殊需求，可补充其他命名空间。

```cpp
using namespace std;
using namespace __gnu_pbds;
```

### 空行

- 头文件、宏定义和命名空间之后保留一行空行。

### 别名

- 若代码中大量使用较长的类型名，可使用 `using` 定义别名。

```cpp
using ll=long long;
using uint=unsigned int;
using pii=pair<int,int>;
```

### 修饰

- 使用 `const` 定义常量，避免使用宏。
- 避免使用 `static`、`register`、`inline`。

```cpp
const int N=100005;
```

## 主体结构

### 主函数

- 主函数位于末尾，返回值为 `int`，结尾写 `return 0`。

```cpp
int main()
{
	// do sth
	return 0;
}
```

### 读写

- 若需要文件读写，添加 `freopen`。

```cpp
freopen("problem.in","r",stdin);
freopen("problem.out","w",stdout);
```

- 若 I/O 数据量较大，添加关闭同步和优化读写。

```cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
```

- 优先使用 `cin` 和 `cout` 读写，避免使用 `scanf` 和 `printf`。
- 若无法满足读写需求，可以使用 `getline` 等函数。
- 换行使用 `'\n'`，避免使用 `"\n"` 或 `endl`。

```cpp
cout<<"Yes"<<'\n';
```

### 存储

- 小变量定义在局部作用域，避免使用全局变量。
- 大数组使用全局变量。
- 默认使用静态数组；仅在确有必要时使用 `vector`（如邻接表存图等）。

```cpp
const int N=100005;
int a[N];
vector<int> G[N];
```

## 命名

### 命名规范

- 命名简洁（通常不超过三个字符）。
- 命名优先使用英文单词辅音字母，避免使用中文拼音。

### 常用命名

- `res`：函数返回值
- `ans`：最终答案
- `cnt`：计数器
- `sum`：总和
- `tmp`：临时变量
- `vis`：访问性
- `dis`：距离
- `siz`：大小
- `len`：长度
- `rnk`：排名
- `tag`：标记
- `val`：价值
- `pos`：位置
- `cur`：当前值
- `mx`：最大值
- `mn`：最小值
- `rt`：根节点
- `fa`：父节点
- `son`：子节点
- `dep`：深度
- `cmp`：比较
- ...

### 常量命名

#### 数据范围

- 使用大写字母 `N`、`M`、`K` 等，值通常取数据最大范围 $+5$。

```cpp
const int N=100005;
```

#### 模数

- 使用 `mod`，值根据需求设置。

```cpp
const int mod=998244353;
```

#### 无穷大

- 使用 `inf`，范围根据需求选择，值通常为 `0x3f` 以便 `memset` 初始化。
- 无穷大 `inf` 为正数，负无穷大使用 `-inf`，避免将 `inf` 设为负数。

```cpp
const int inf=0x3f3f3f3f;
const ll inf=0x3f3f3f3f3f3f3f3f;
```

#### 极小值

- 使用 `eps`，值根据需求设置。

```cpp
const double eps=1e-8;
```

#### 圆周率

- 使用 `pi`，值通常为 $\arccos{(-1)}$。

```cpp
const double pi=acos(-1);
```

#### 自然常数

- 使用 `e`，值通常为 $\exp(1)$。

```cpp
const double e=exp(1);
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

- 若需要输出组号，使用美元符号 `$`。

```cpp
int T;
cin>>T;
for(int $=1;$<=T;$++)
{
	// do sth
	cout<<"Case #"<<$<<'\n';
}
```

#### 数据范围

- 使用题目中所给的小写字母，通常为 `n`。

```cpp
int n;
cin>>n;
```

#### 操作次数

- 使用题目中所给的小写字母，通常为 `m` 或 `q`。
- 使用 `op` 表示操作种类。

```cpp
int m;
cin>>m;
while(m--)
{
	int op;
	cin>>op;
	if(op==1)// do sth
	else if(op==2)// do sth
	// ...
}
```
