# lailai's Code Style

本文介绍我在 OI 中常用的代码规范。

## 参考资料

- [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html)
- [Menci's Code Style for OI | Menci's OI Blog](https://oi.men.ci/code-style-oi/)

## 通用要求

- 代码需要兼容 C++17，避免使用不兼容的特性。

## 代码格式

- 代码中不包含任何注释。
- 代码中不包含多余空行。
- 代码中尽量不包含可省略的空格。
- 所有大括号都需单独占一行。
- 如果 `if` 或 `for` 语句后只有一个语句，可省略大括号。
- 或代码较短并将该行代码与条件语句写在同一行。

## 缩进

- 使用 $4$ 空格或等长的 Tab 缩进。

## 代码开头

- 头文件：首行必须为 `#include <bits/stdc++.h>`，除非特殊情况，不使用其他头文件。
- 宏定义：如有需要，紧随头文件后编写宏定义。
- 命名空间：添加 `using namespace std;`，并紧跟在宏定义之后。
- 唯一空行：头文件、宏定义和命名空间之后保留整个代码中唯一的空行。
- 类型别名：如果代码中大量使用 `long long`，添加 `using ll=long long;`。
- 常量定义：常量需使用 `const` 定义，禁止使用宏进行常量定义。

## 主函数

- `main` 函数位于代码末尾。
- `main` 函数的返回值类型为 `int`。
- `main` 函数结尾需要有 `return 0`。

## 输入输出

- 如有需要，使用文件读写。

```cpp
freopen("problem.in","r",stdin);
freopen("problem.out","w",stdout);
```

- 使用关闭同步优化读写。

```cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
```

- 标准输入输出：统一使用 `cin` 和 `cout` 进行输入输出。
- 如标准方法无法满足需求，可使用 `getline` 等其他函数。
- 使用 `'\n'` 进行换行，不使用 `"\n"` 或 `endl`。

## 存储

- 局部变量：小型变量仅在局部范围定义，不定义为全局变量。
- 大型数组：对于大型数组，必须定义为全局变量。
- 静态数组优先：已知大小的数组（例如 `vector<int> a(n);`）尽量使用静态数组，避免使用 `vector`。
- 动态数组：当数组大小需要动态确定时（如邻接表存储图），可使用 `vector`。

## 常量命名

- 省略未使用的常量：仅定义实际用到的常量。
- 圆周率：优先使用 pi，请使用`const double pi=acos(-1);`。
- 极小值：优先使用 eps，根据需求定义具体大小，例如 `const double eps=1e-8;`。
- 无穷大：优先使用 inf，且无穷大一定为正数，负无穷大为 `-inf`。为了保证可以用 `memset` 初始化，请严格使用 `const int inf=0x3f3f3f3f;` 或 `const ll inf=0x3f3f3f3f3f3f3f3f`。
- 模数：优先使用 mod，根据需求定义具体大小，例如 `const int mod=1e9+7;`。
- 数组大小：优先使用 N，有多个数组可用 M、K 等其他大写字母命名，例如 `const int N=100005;`。
