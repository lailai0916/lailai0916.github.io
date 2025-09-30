# 洛谷题目

[洛谷](https://www.luogu.com.cn) 的 [咕值系统](https://help.luogu.com.cn/manual/luogu/account/guzhi) 有一个 **社区贡献** 指标，满分为 $100$ 分，其中 $70$ 分来自 **题解**，$30$ 分来自 **搬题**。

每搬运一道主题库题目可获得 $1$ 分 **永久** 咕值，搬满 $30$ 题即可拿满 **搬题** 的 $30$ 分咕值。

## 参考资料

- [洛谷主题库题目规范 | 洛谷帮助中心](https://help.luogu.com.cn/rules/academic/problem-standard)
- [洛谷主题库题解规范（2023 试行版） | 洛谷帮助中心](https://help.luogu.com.cn/rules/academic/solution-standard)
- [如何用 Markdown 和 LaTeX 写一篇排版整齐的题解？ | 洛谷帮助中心](https://help.luogu.com.cn/rules/academic/guide/solution)

## 题解

本文是我的洛谷题解模板。

### 题解模板

````markdown
[![](https://img.shields.io/badge/Luogu-{PID}-blue?style=for-the-badge&logo=codeforces)](https://www.luogu.com.cn/problem/{PID})
[![](https://img.shields.io/badge/Luogu-Solution-blue?style=for-the-badge&logo=markdown)](https://www.luogu.com.cn/article/{AID})
[![](https://img.shields.io/badge/Blog-Solution-blue?style=for-the-badge&logo=markdown)](https://lailai.one/blog/solution/{PID})

## 参考资料

## 题意简述

## 基础知识

## 解题思路

## 参考代码

```cpp

```
````

:::tip

**参考资料**、**题意简述**、**基础知识** 板块可根据实际需求决定是否添加。

:::

### 例题：洛谷 P1001 A+B Problem

<Problem id="P1001" />

<details>
<summary>Solution</summary>

<Tabs>
<TabItem value="题解示例">

````markdown
[![](https://img.shields.io/badge/Luogu-P1001-blue?style=for-the-badge&logo=codeforces)](https://www.luogu.com.cn/problem/P1001)
[![](https://img.shields.io/badge/Luogu-Solution-blue?style=for-the-badge&logo=markdown)](https://www.luogu.com.cn/article/abcd1234)
[![](https://img.shields.io/badge/Blog-Solution-blue?style=for-the-badge&logo=markdown)](https://lailai.one/blog/solution/P1001)

## 参考资料

- [加法 - 维基百科](https://zh.wikipedia.org/zh-cn/加法)

## 题意简述

给定两个整数 $a,b$，求它们的和。（$|a|,|b| \le {10}^9$）

## 基础知识

加法是基本的算术运算之一，两个自然数相加是将他们组合起来的总量。

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

</TabItem>
<TabItem value="效果展示">

<BrowserWindow>

[![](https://img.shields.io/badge/Luogu-P1001-blue?style=for-the-badge&logo=codeforces)](https://www.luogu.com.cn/problem/P1001)
[![](https://img.shields.io/badge/Luogu-Solution-blue?style=for-the-badge&logo=markdown)](https://www.luogu.com.cn/article/abcd1234)
[![](https://img.shields.io/badge/Blog-Solution-blue?style=for-the-badge&logo=markdown)](https://lailai.one/blog/solution/P1001)

<h2>参考资料</h2>

- [加法 - 维基百科](https://zh.wikipedia.org/zh-cn/加法)

<h2>题意简述</h2>

给定两个整数 $a,b$，求它们的和。（$|a|,|b| \le {10}^9$）

<h2>基础知识</h2>

加法是基本的算术运算之一，两个自然数相加是将他们组合起来的总量。

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

</TabItem>
</Tabs>

</details>

## 搬题

本文是我的题目搬运记录。

### 题目测试点配置文件生成器

- [题目测试点配置文件 | 洛谷帮助中心](https://help.luogu.com.cn/manual/luogu/problem/testcase-config)

以下程序可以根据时间限制、空间限制、子任务的分值和数量，自动生成标准格式的题目配置文件。

```cpp title="main.cpp"
#include <bits/stdc++.h>
using namespace std;

const int TL=1000; // ms
const int ML=256*1024; // kb
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(nullptr);
	int id=0,sum=0,cnt=0;
	int score,num;
	while(cin>>score>>num)
	{
		for(int i=1;i<=num;i++)
		{
			cout<<id<<setfill('0')<<setw(2)<<i<<".in:"<<'\n';
			cout<<"  timeLimit: "<<TL<<'\n';
			cout<<"  memoryLimit: "<<ML<<'\n';
			cout<<"  score: "<<score<<'\n';
			cout<<"  subtaskId: "<<id<<'\n';
			cout<<'\n';
		}
		id++;
		sum+=score;
		cnt+=num;
	}
	cerr<<"config.yml"<<'\n';
	cerr<<"Total Score: "<<sum<<'\n';
	cerr<<"Total File: "<<(cnt<<1)<<'\n';
	return 0;
}
```

### Special Judge

- [Special Judge 功能说明 | 洛谷帮助中心](https://help.luogu.com.cn/manual/luogu/problem/special-judge)

<GitHub repo="MikeMirzayanov/testlib" />

### 提示词

以下提示词可用于 AI 翻译整理英文 PDF 题面为规范格式。

```text title="翻译整理题面"
请将提供的算法竞赛题目的英文 PDF，翻译成中文，并严格按照《洛谷主题库题目规范》（https://help.luogu.com.cn/rules/academic/problem-standard）整理成 Markdown 格式，具体要求如下：

### 1. 内容

- 全文忠实翻译，不增删任何信息。
- 语言严谨、规范，表达简洁清晰。

### 2. 结构

题目各部分依次为：

- `## 题目背景`
- `## 题目描述`
- `## 输入格式`
- `## 输出格式`
- `## 样例组`
- 若有多个样例，使用：
  - `### 样例 1`
  - `### 样例 2`
  - ……
- `## 说明/提示`
- 若原文有样例解释，使用：
  - `【样例解释】`
  - `对于样例 #1：`
  - `对于样例 #2：`
  - ……
- 若原文有数据范围与子任务，使用：
  - `【数据范围】`

### 3. 样例格式

- 输入、输出数据**不使用代码块**，直接正常排版。
- 样例数据与原文保持完全一致。
- 仅整理原文提供的样例解释，**禁止**自行推测或补充。

### 4. 数据范围

- 数据范围放在 `## 说明/提示` 末尾。
- 子任务部分用表格，具体格式如下：

| 子任务编号 | 分值 |       特殊限制        |
| :--------: | :--: | :-------------------: |
|    $1$     | $3$  |    $N = 2, Q = 1$     |
|    $2$     | $10$ | $1 \leq N, Q \leq 30$ |
|     ……     |  ……  |          ……           |

- 要求：
  - 所有列居中对齐。
  - 所有数字用 `$` 包裹，转为 LaTeX 公式。
  - 特殊限制中的数学表达式使用 LaTeX 规范。

### 5. 其他规范

- 中文与英文、数字、公式之间用半角空格。
- 排版整齐，严格符合洛谷题面书写规范。
- 最终仅输出 Markdown 源文本，**不得**添加额外解释、图示或格式改动。
```

### 搬题记录

我搬运了 $30$ 道新加坡全国信息学奥林匹克竞赛（NOISG）的题目。

<GitHub repo="noisg/sg_noi_archive" />

#### NOISG 比赛搬题表

| 年份 / 后缀 |                       (null)                       |                       Qualification                       |                        Prelim                        |                       Finals                       | Practice | Prelim Practice |
| :---------: | :------------------------------------------------: | :-------------------------------------------------------: | :--------------------------------------------------: | :------------------------------------------------: | :------: | :-------------: |
|    1998     |                         X                          |                             -                             |                          -                           |                         -                          |    -     |        -        |
|    1999     |                         X                          |                             -                             |                          -                           |                         -                          |    -     |        -        |
|    2000     |                         X                          |                             -                             |                          -                           |                         -                          |    -     |        -        |
|    2001     |                         X                          |                             -                             |                          -                           |                         -                          |    -     |        -        |
|    2002     |                         X                          |                             -                             |                          -                           |                         -                          |    -     |        -        |
|    2003     |                         X                          |                             -                             |                          -                           |                         -                          |    -     |        -        |
|    2004     |                         X                          |                             -                             |                          -                           |                         -                          |    -     |        -        |
|    2005     |                         X                          |                             X                             |                          -                           |                         -                          |    -     |        -        |
|    2006     |                         X                          |                             X                             |                          -                           |                         -                          |    -     |        -        |
|    2007     |                         X                          |                             -                             |                          -                           |                         -                          |    -     |        -        |
|    2008     |                         X                          |                             -                             |                          -                           |                         -                          |    -     |        -        |
|    2009     |                         X                          |                             -                             |                          -                           |                         -                          |    -     |        -        |
|    2010     |                         X                          |                             -                             |                          -                           |                         -                          |    -     |        -        |
|    2011     |                         X                          |                             -                             |                          -                           |                         -                          |    -     |        -        |
|    2012     |                         X                          |                             -                             |                          -                           |                         -                          |    -     |        -        |
|    2013     |                         X                          |                             -                             |                          -                           |                         -                          |    -     |        -        |
|    2014     |                         X                          |                             -                             |                          -                           |                         -                          |    -     |        -        |
|    2015     |                         X                          |                             -                             |                          -                           |                         -                          |    -     |        -        |
|    2016     |                         X                          |                             -                             |                          -                           |                         -                          |    -     |        -        |
|    2017     |                         X                          |                             -                             |                          -                           |                         -                          |    -     |        -        |
|    2018     | [Shunpower](https://www.luogu.com.cn/user/399150)  |                             -                             |  [ToastBread](https://www.luogu.com.cn/user/545809)  |                         -                          |    X     |        X        |
|    2019     | [lailai0916](https://www.luogu.com.cn/user/455474) |                             -                             |  [ToastBread](https://www.luogu.com.cn/user/545809)  |                         -                          |    -     |        -        |
|    2020     |                         -                          |    [lailai0916](https://www.luogu.com.cn/user/455474)     |  [lailai0916](https://www.luogu.com.cn/user/455474)  | [lailai0916](https://www.luogu.com.cn/user/455474) |    -     |        -        |
|    2021     |                         -                          | [Mortidesperatslav](https://www.luogu.com.cn/user/482610) |                          -                           | [lailai0916](https://www.luogu.com.cn/user/455474) |    -     |        -        |
|    2022     |                         -                          |    [lailai0916](https://www.luogu.com.cn/user/455474)     |                          -                           | [Eason_cyx](https://www.luogu.com.cn/user/741244)  |    -     |        -        |
|    2023     |                         -                          |     [Eason_cyx](https://www.luogu.com.cn/user/741244)     |                          -                           | [StayAlone](https://www.luogu.com.cn/user/409236)  |    -     |        -        |
|    2024     |                         -                          |                             -                             |  [Eason_cyx](https://www.luogu.com.cn/user/741244)   | [lailai0916](https://www.luogu.com.cn/user/455474) |    -     |        -        |
|    2025     |                         -                          |                             -                             | [Starrykiller](https://www.luogu.com.cn/user/235125) |   [Milmon](https://www.luogu.com.cn/user/234641)   |    -     |        -        |

#### NOISG 2022 Qualification

- [洛谷 P11293 [NOISG 2022 Qualification] L-Board](https://www.luogu.com.cn/problem/P11293)
- [洛谷 P11294 [NOISG 2022 Qualification] Tree Cutting](https://www.luogu.com.cn/problem/P11294)
- [洛谷 P11295 [NOISG 2022 Qualification] Dragonfly](https://www.luogu.com.cn/problem/P11295)

#### NOISG 2021 Finals

- [洛谷 P11299 [NOISG 2021 Finals] Fraud](https://www.luogu.com.cn/problem/P11299)
- [洛谷 P11300 [NOISG 2021 Finals] Archaeologist](https://www.luogu.com.cn/problem/P11300)
- [洛谷 P11301 [NOISG 2021 Finals] Password](https://www.luogu.com.cn/problem/P11301)
- [洛谷 P11302 [NOISG 2021 Finals] Tiles](https://www.luogu.com.cn/problem/P11302)
- [洛谷 P11303 [NOISG 2021 Finals] Pond](https://www.luogu.com.cn/problem/P11303)

#### NOISG 2020 Qualification

- [洛谷 P11319 [NOISG 2020 Qualification] Cryptography](https://www.luogu.com.cn/problem/P11319)
- [洛谷 P11320 [NOISG 2020 Qualification] Fuel Station](https://www.luogu.com.cn/problem/P11320)
- [洛谷 P11321 [NOISG 2020 Qualification] Relay Marathon](https://www.luogu.com.cn/problem/P11321)
- [洛谷 P11322 [NOISG 2020 Qualification] Firefighting](https://www.luogu.com.cn/problem/P11322)

#### NOISG 2020 Finals

- [洛谷 P11332 [NOISG 2020 Finals] Labels](https://www.luogu.com.cn/problem/P11332)
- [洛谷 P11333 [NOISG 2020 Finals] Discharging](https://www.luogu.com.cn/problem/P11333)
- [洛谷 P11334 [NOISG 2020 Finals] Progression](https://www.luogu.com.cn/problem/P11334)
- [洛谷 P11335 [NOISG 2020 Finals] Arcade](https://www.luogu.com.cn/problem/P11335)
- [洛谷 P11336 [NOISG 2020 Finals] Aesthetic](https://www.luogu.com.cn/problem/P11336)

#### NOISG 2024 Finals

- [洛谷 P11349 [NOISG 2024 Finals] Problem Setter](https://www.luogu.com.cn/problem/P11349)
- [洛谷 P11350 [NOISG 2024 Finals] Shops](https://www.luogu.com.cn/problem/P11350)
- [洛谷 P11351 [NOISG 2024 Finals] Toxic Gene 2（交互题，暂时无法评测）](https://www.luogu.com.cn/problem/P11351)
- [洛谷 P11352 [NOISG 2024 Finals] Coin](https://www.luogu.com.cn/problem/P11352)
- [洛谷 P11353 [NOISG 2024 Finals] Field](https://www.luogu.com.cn/problem/P11353)

#### NOISG 2020 Prelim

- [洛谷 P12931 [NOISG 2020 Prelim] Mountains](https://www.luogu.com.cn/problem/P12931)
- [洛谷 P12932 [NOISG 2020 Prelim] Visiting Singapore](https://www.luogu.com.cn/problem/P12932)
- [洛谷 P12933 [NOISG 2020 Prelim] Mountains](https://www.luogu.com.cn/problem/P12933)

#### NOISG 2019

- [洛谷 P13075 [NOISG 2019] Pilot](https://www.luogu.com.cn/problem/P13075)
- [洛谷 P13076 [NOISG 2019] Lasers](https://www.luogu.com.cn/problem/P13076)
- [洛谷 P13077 [NOISG 2019] Feast](https://www.luogu.com.cn/problem/P13077)
- [洛谷 P13078 [NOISG 2019] Rigged Roads](https://www.luogu.com.cn/problem/P13078)
- [洛谷 P13079 [NOISG 2019] Shuffle](https://www.luogu.com.cn/problem/P13079)
