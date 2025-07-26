# 题解模板

本文是我的洛谷题解模板。

## 参考资料

- [洛谷主题库题解规范（2023 试行版） - 洛谷帮助中心](https://help.luogu.com.cn/rules/academic/solution-standard)
- [如何用 Markdown 和 LaTeX 写一篇排版整齐的题解？ - 洛谷帮助中心](https://help.luogu.com.cn/rules/academic/guide/solution)

## 例题

### 洛谷 P1001 A+B Problem

<Problem id="P1001" />

## 题解示例

````markdown
## 原题链接

- [洛谷 P1001 A+B Problem](https://www.luogu.com.cn/problem/P1001)

## 参考资料

- [加法 - 维基百科](https://zh.wikipedia.org/zh-cn/加法)

## 题意简述

输入两个整数 $a,b$，输出它们的和。（$|a|,|b| \le {10}^9$）

## 解题思路

使用 `cin` 读入两个整数，使用 `cout` 输出它们的和。

## 参考代码

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
	int a,b;
	cin>>a>>b;
	cout<<a+b<<'\n';
	return 0;
}
```
````

:::tip

“参考资料”和“题意简述”板块为可选项，应根据实际需求选择是否添加。

:::

## 效果展示

<BrowserWindow>

<h2>原题链接</h2>

- [洛谷 P1001 A+B Problem](https://www.luogu.com.cn/problem/P1001)

<h2>参考资料</h2>

- [加法 - 维基百科](https://zh.wikipedia.org/zh-cn/加法)

<h2>题意简述</h2>

输入两个整数 $a,b$，输出它们的和。（$|a|,|b| \le {10}^9$）

<h2>解题思路</h2>

使用 `cin` 读入两个整数，使用 `cout` 输出它们的和。

<h2>参考代码</h2>

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
	int a,b;
	cin>>a>>b;
	cout<<a+b<<'\n';
	return 0;
}
```

</BrowserWindow>
