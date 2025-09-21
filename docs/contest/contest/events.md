# 赛事 & 题型

## 参考资料

- [OI 赛事与赛制 - OI Wiki](https://oi-wiki.org/contest/oi/)
- [ICPC/CCPC 赛事与赛制 - OI Wiki](https://oi-wiki.org/contest/icpc/)
- [题型概述 - OI Wiki](https://oi-wiki.org/contest/problems/)
- [自产生程序 - 维基百科](https://zh.wikipedia.org/zh-cn/自產生程式)

## 赛事

### OI

信息学奥林匹克竞赛（Olympiad in Informatics，OI）是一门在中学生中广泛开展的学科竞赛，和物理、数学等竞赛性质相同；该竞赛于 1984 年在中国起源，属中国高中五大学科竞赛之一。OI 考察的内容是参赛者运用算法、数据结构和数学知识，通过编写计算机程序解决实际问题的能力。

- [NOI 全国青少年信息学奥林匹克竞赛](https://www.noi.cn)

### ICPC

国际大学生程序设计竞赛（International Collegiate Programming Contest，ICPC）由 ICPC 基金会（ICPC Foundation）举办，是最具影响力的大学生计算机竞赛。

- [The ICPC International Collegiate Programming Contest](https://icpc.global)
- [中国大学生程序设计竞赛(CCPC)-官网](https://oi-wiki.org/contest/icpc/)

## 赛制

### OI 赛制

选手仅有一次提交机会。比赛时无法看到评测结果，评分会在赛后公布。每道题都有多个测试点，根据每道题通过的测试点的数量获得相应的分数；每个测试点还可能会有部分分，即使只有部分数据通过也能拿到分数。

CSP-J/S 第二轮、NOIP、省选、NOI 都是 OI 赛制。

### IOI 赛制

选手在比赛时有多次提交机会。比赛实时评测并返回结果，如果提交的结果是错误的，不会有任何惩罚。每道题都有多个测试点，根据每道题通过的测试点的数量获得相应的分数。

APIO、IOI 都是 IOI 赛制。目前国内比赛也在逐渐向 IOI 赛制靠拢。

### ICPC 赛制

一般是三个人组成一队使用一台机器，在比赛时有多次提交机会。比赛实时评测并返回结果，如果提交的结果错误会有 20 分钟的罚时，错误次数越多，加罚的时间也越长。每个题目只有在所有数据点全部正确后才能得到分数。比赛排名根据做题数来评判，做题数相同的，根据总用时来评判。总用时是每题用时的和。每题的用时是从比赛开始到做出该题的分钟数与该题的罚时之和。

一些 ICPC 相关赛事中，比赛结束前一小时进行封榜，封榜后的提交和排名将无法被其他选手看见。

在 ICPC 相关赛事中，选手允许带一定量的纸质资料。

除 ICPC 和 CCPC 外，众多比赛也采用该赛制，如 LeetCode 周赛及全国编程大赛、牛客小白赛练习赛挑战赛等。

### CF 赛制

[Codeforces](https://codeforces.com) 是一个在线评测系统，会定期举办比赛。

它的比赛特点是在比赛过程中只测试一部分数据（Pretests），而在比赛结束后返回完整的所有测试点的测试结果（System Tests）。比赛时可以多次提交，允许 Hack 别人的代码（此处 Hack 的意思是提交一个测试数据，使得别人的代码无法给出正确答案）。如果想要 Hack，选手必须要锁定自己的代码（换言之，比赛时无法重新提交该题）。Hack 时不允许将选手程序拷贝到本地进行测试，源代码会被转换成图片。

Codeforces 同时提供另外一种赛制，称作扩展 ICPC（Extended ICPC 或 ICPC+）。在这一赛制中，在比赛过程中会测试全部数据，但比赛结束以后会有 12 小时的全网 Hack 时间。Hack 时允许将选手程序拷贝到本地进行测试。

## 题型

### 传统题

#### 评测结果

- AC（Accept）：程序通过。
- CE（Compile Error）：编译错误。
- PC（Partially Correct）：部分正确。
- WA（Wrong Answer）：答案错误。
- PE（Presentation Error）：格式错误。
- RE（Runtime Error）：运行时错误。
- TLE（Time Limit Exceeded）：超出时间限制。
- MLE（Memory Limit Exceeded）：超出内存限制。
- OLE（Output Limit Exceeded）：输出超过限制。
- UKE（Unknown Error）：未知错误。

:::tip

在 ICPC 赛事中，你的程序需要在一道题目的所有测试点上都取得 AC 状态，才能视为通过相应的题目。

在 OI 赛事中，在一个测试点中取得 AC 状态，即可拿到该测试点的分数。

:::

#### 洛谷 P1001 A+B Problem

<Problem id="P1001" />

### 交互题

交互题近年来没有在省选以下的比赛中出现。

#### 洛谷 P1733 猜数（IO交互版）

<Problem id="P1733" />

### 通信题

通信题是需要两个程序进行通信，合作完成某项任务的题目。第一个程序接收问题的输入，并产生某些输出；第二个程序的输入会与第一个的输出相关。

#### 洛谷 P12509 【模板】通信题

<Problem id="P12509" />

#### UOJ #178. 新年的贺电

<Problem id="UOJ178" />

### 自产生程序（Quine）

#### LibreOJ #4. Quine

<Problem id="LOJ4" />

## CSP 初赛

- [题库 - 洛谷有题](https://ti.luogu.com.cn/problemset/)
- [CSP初赛知识点梳理 - 洛谷专栏](https://www.luogu.com.cn/article/9sxilb3x)
- [CCF NOI2024笔试题库](https://www.noi.cn/xw/2024-07-01/827159.shtml)
- [CCF NOI2025笔试题库](https://www.noi.cn/xw/2025-06-16/844453.shtml)
