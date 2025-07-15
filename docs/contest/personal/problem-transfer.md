# 题目搬运

[洛谷](https://www.luogu.com.cn) 的 [咕值系统](https://help.luogu.com.cn/manual/luogu/account/guzhi) 中有一个指标是“社区贡献”，满分为 $100$ 分，其中 $70$ 分来自题解，$30$ 分来自搬题。

每搬运一道主题库题目可获得 $1$ 分咕值，搬满 $30$ 题即可 **永久** 拿满搬题部分的 $30$ 分咕值。

## 参考资料

- [洛谷主题库题目规范 - 洛谷帮助中心](https://help.luogu.com.cn/rules/academic/problem-standard)
- [题目测试点配置文件 - 洛谷帮助中心](https://help.luogu.com.cn/manual/luogu/problem/testcase-config)
- [MikeMirzayanov/testlib: C++ library to develop competitive programming problems](https://github.com/MikeMirzayanov/testlib)
- [noisg/sg_noi_archive: Archive of Singapore National Olympiad in Informatics (NOI)](https://github.com/noisg/sg_noi_archive)

## 题目测试点配置文件生成器

以下程序可根据子任务分值与数量，自动生成标准格式的题目配置文件。

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

## 提示词

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

## NOISG

### 搬题表

<style>{`
  .center-table th, .center-table td {
    text-align: center;
  }
`}</style>

<table className="center-table">
  <thead>
    <tr>
      <th>年份 / 后缀</th>
      <th>(null)</th>
      <th>Qualification</th>
      <th>Prelim</th>
      <th>Finals</th>
      <th>Practice</th>
      <th>Prelim Practice</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>1998</td><td>?</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>1999</td><td>?</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>2000</td><td>?</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>2001</td><td>?</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>2002</td><td>?</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>2003</td><td>?</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>2004</td><td>?</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>2005</td><td>?</td><td>?</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>2006</td><td>?</td><td>?</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>2007</td><td>?</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>2008</td><td>?</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>2009</td><td>?</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>2010</td><td>?</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>2011</td><td>?</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>2012</td><td>?</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>2013</td><td>?</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>2014</td><td>?</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>2015</td><td>?</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>2016</td><td>?</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>2017</td><td>?</td><td>/</td><td>/</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>2018</td><td>Shunpower</td><td>/</td><td>ToastBread</td><td>/</td><td>?</td><td>?</td></tr>
    <tr><td>2019</td><td>lailai0916</td><td>/</td><td>ToastBread</td><td>/</td><td>/</td><td>/</td></tr>
    <tr><td>2020</td><td>/</td><td>lailai0916</td><td>lailai0916</td><td>lailai0916</td><td>/</td><td>/</td></tr>
    <tr><td>2021</td><td>/</td><td>CEFqwq</td><td>/</td><td>lailai0916</td><td>/</td><td>/</td></tr>
    <tr><td>2022</td><td>/</td><td>lailai0916</td><td>/</td><td>Eason_cyx</td><td>/</td><td>/</td></tr>
    <tr><td>2023</td><td>/</td><td>Eason_cyx</td><td>/</td><td>StayAlone</td><td>/</td><td>/</td></tr>
    <tr><td>2024</td><td>/</td><td>/</td><td>Eason_cyx</td><td>lailai0916</td><td>/</td><td>/</td></tr>
    <tr><td>2025</td><td>/</td><td>/</td><td>Starrykiller</td><td>Milmon</td><td>/</td><td>/</td></tr>
  </tbody>
</table>

### NOISG 2022 Qualification

- [洛谷 P11293 [NOISG 2022 Qualification] L-Board](https://www.luogu.com.cn/problem/P11293)
- [洛谷 P11294 [NOISG 2022 Qualification] Tree Cutting](https://www.luogu.com.cn/problem/P11294)
- [洛谷 P11295 [NOISG 2022 Qualification] Dragonfly](https://www.luogu.com.cn/problem/P11295)

### NOISG 2021 Finals

- [洛谷 P11299 [NOISG 2021 Finals] Fraud](https://www.luogu.com.cn/problem/P11299)
- [洛谷 P11300 [NOISG 2021 Finals] Archaeologist（交互题，暂时无法评测）](https://www.luogu.com.cn/problem/P11300)
- [洛谷 P11301 [NOISG 2021 Finals] Password](https://www.luogu.com.cn/problem/P11301)
- [洛谷 P11302 [NOISG 2021 Finals] Tiles](https://www.luogu.com.cn/problem/P11302)
- [洛谷 P11303 [NOISG 2021 Finals] Pond](https://www.luogu.com.cn/problem/P11303)

### NOISG 2020 Qualification

- [洛谷 P11319 [NOISG 2020 Qualification] Cryptography](https://www.luogu.com.cn/problem/P11319)
- [洛谷 P11320 [NOISG 2020 Qualification] Fuel Station](https://www.luogu.com.cn/problem/P11320)
- [洛谷 P11321 [NOISG 2020 Qualification] Relay Marathon](https://www.luogu.com.cn/problem/P11321)
- [洛谷 P11322 [NOISG 2020 Qualification] Firefighting](https://www.luogu.com.cn/problem/P11322)

### NOISG 2020 Finals

- [洛谷 P11332 [NOISG 2020 Finals] Labels](https://www.luogu.com.cn/problem/P11332)
- [洛谷 P11333 [NOISG 2020 Finals] Discharging](https://www.luogu.com.cn/problem/P11333)
- [洛谷 P11334 [NOISG 2020 Finals] Progression](https://www.luogu.com.cn/problem/P11334)
- [洛谷 P11335 [NOISG 2020 Finals] Arcade](https://www.luogu.com.cn/problem/P11335)
- [洛谷 P11336 [NOISG 2020 Finals] Aesthetic](https://www.luogu.com.cn/problem/P11336)

### NOISG 2024 Finals

- [洛谷 P11349 [NOISG 2024 Finals] Problem Setter](https://www.luogu.com.cn/problem/P11349)
- [洛谷 P11350 [NOISG 2024 Finals] Shops](https://www.luogu.com.cn/problem/P11350)
- [洛谷 P11351 [NOISG 2024 Finals] Toxic Gene 2（交互题，暂时无法评测）](https://www.luogu.com.cn/problem/P11351)
- [洛谷 P11352 [NOISG 2024 Finals] Coin](https://www.luogu.com.cn/problem/P11352)
- [洛谷 P11353 [NOISG 2024 Finals] Field](https://www.luogu.com.cn/problem/P11353)

### NOISG 2020 Prelim

- [洛谷 P12931 [NOISG 2020 Prelim] Mountains](https://www.luogu.com.cn/problem/P12931)
- [洛谷 P12932 [NOISG 2020 Prelim] Visiting Singapore](https://www.luogu.com.cn/problem/P12932)
- [洛谷 P12933 [NOISG 2020 Prelim] Mountains](https://www.luogu.com.cn/problem/P12933)

### NOISG 2019

- [洛谷 P13075 [NOISG 2019] Pilot](https://www.luogu.com.cn/problem/P13075)
- [洛谷 P13076 [NOISG 2019] Lasers](https://www.luogu.com.cn/problem/P13076)
- [洛谷 P13077 [NOISG 2019] Feast](https://www.luogu.com.cn/problem/P13077)
- [洛谷 P13078 [NOISG 2019] Rigged Roads](https://www.luogu.com.cn/problem/P13078)
- [洛谷 P13079 [NOISG 2019] Shuffle](https://www.luogu.com.cn/problem/P13079)
