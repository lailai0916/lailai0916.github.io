---
title: '竞赛'
---

竞赛板块涵盖信息学奥林匹克竞赛（OI）相关的基础知识、常见题型、解题思路，以及代码模板和参赛经验。

内容聚焦实际竞赛环境，强调算法技巧、编程实践和竞赛能力的综合提升。

![](https://cloud.lailai.one/f/0nviJ/header-contest-light.svg#gh-light-mode-only)![](https://cloud.lailai.one/f/XJNfN/header-contest-dark.svg#gh-dark-mode-only)

## 倒计时

export const today = new Date().toISOString().split("T")[0];
export const daysUntil = (target) => Math.ceil((new Date(target) - new Date()) / 86400000);

今天是 **{today}**，距离：

- **USACO 2025-2026 Third Contest** 还有 **{daysUntil('2026-02-20')}** 天
- **浙江省选 2026** 还有 **{daysUntil('2026-03-07')}** 天
- **USACO 2025-2026 US Open** 还有 **{daysUntil('2026-03-28')}** 天
- **APIO 2026** 还有 **~{daysUntil('2026-05-15')}** 天
- **NOI 2026** 还有 **~{daysUntil('2026-07-12')}** 天
- **IOI 2026** 还有 **{daysUntil('2026-08-09')}** 天
- **CSP-J/S 2026 第一轮** 还有 **{daysUntil('2026-09-19')}** 天
- **CSP-J/S 2026 第二轮** 还有 **{daysUntil('2026-10-31')}** 天
- **NOIP 2026** 还有 **{daysUntil('2026-11-28')}** 天
- **THUPC 2027 初赛** 还有 **~{daysUntil('2026-12-14')}** 天
- **NOIWC 2027** 还有 **~{daysUntil('2027-02-06')}** 天

## 知识点

### 算法基础

复杂度、枚举、模拟、暴力、打表、递归、分治、贪心、排序（选择排序、冒泡排序、插入排序、计数排序、基数排序、快速排序、归并排序、堆排序、桶排序、希尔排序、锦标赛排序、Tim 排序）、前缀和、差分、二分（二分查找、二分答案）、三分、倍增、构造

### 搜索

深度优先搜索（DFS）、广度优先搜索（BFS）、双向搜索（Meet in the middle）、启发式搜索、A\* 算法、迭代加深搜索（IDS）、IDA\* 算法、回溯法、舞蹈链（Dancing Links）、剪枝优化（Alpha-Beta 剪枝）

### 动态规划

记忆化搜索、线性 DP、背包 DP（0-1 背包、完全背包、多重背包、混合背包、分组背包、二进制分组优化）、区间 DP、DAG 上的 DP、树形 DP、状压 DP、数位 DP、插头 DP、计数 DP、动态 DP、概率 DP、DP 优化（斜率优化、四边形不等式优化）

### 字符串

字符串匹配、字符串哈希（Hash）、滚动哈希、字典树（Trie）、KMP、Boyer–Moore 算法、Z 函数（扩展 KMP）、AC 自动机、后缀数组（SA）、后缀自动机（SAM）、后缀平衡树、广义后缀自动机、后缀树、Manacher、回文树、回文自动机、序列自动机、最小表示法、Lyndon 分解、Main–Lorentz 算法

### 数学

位运算、快速幂、矩阵快速幂、置换和排列、复数、素数（Fermat 素性测试、Miller–Rabin 素性测试）、最大公约数（GCD）、扩展欧几里得（EXGCD）、数论分块、欧拉函数、筛法（埃拉托斯特尼筛法、线性筛法）、Meissel–Lehmer 算法、分解质因数（Pollard Rho 算法）、裴蜀定理、类欧几里德算法、欧拉定理、扩展欧拉定理、费马小定理、乘法逆元、线性同余方程、中国剩余定理（CRT）、扩展中国剩余定理（EXCRT）、升幂引理、阶乘取模、卢卡斯定理、扩展卢卡斯定理（exLucas 算法）、同余方程、二次剩余（Cipolla 算法）、原根、离散对数（BSGS 算法）、剩余、莫比乌斯反演、杜教筛、Powerful Number 筛、Min_25 筛、洲阁筛、连分数、Stern–Brocot 树、Farey 序列、二次域、Pell 方程、快速傅里叶变换（FFT）、离散傅里叶变换（DFT）、数论变换（NTT）、快速数论变换（FNTT）、快速沃尔什变换（FWT）、Chirp Z 变换、多项式运算、Lagrange 反演、形式幂级数、生成函数、排列组合、抽屉原理、容斥原理、斐波那契数列、卡特兰数、斯特林数、贝尔数、伯努利数、Entringer Number、Eulerian Number、分拆数、范德蒙德卷积、Pólya 计数、图论计数、线性代数（线性基）、线性规划、抽象代数（Schreier–Sims 算法）、概率论、博弈论（SG 函数、Nim 游戏）、拉格朗日插值、自适应辛普森法、高斯消元、牛顿迭代法、傅里叶–莫茨金消元法、序理论、杨氏矩阵、拟阵、Berlekamp–Massey 算法

### 数据结构

栈、队列、链表、哈希表、并查集、堆（二叉堆、配对堆、左偏树）、分块、块状链表、单调栈、单调队列、ST表、树状数组、线段树、李超线段树、猫树、划分树、平衡树（Treap、Splay 树、WBLT、替罪羊树、笛卡尔树、Size Balanced Tree、AVL 树、红黑树、左偏红黑树、AA 树）、跳表、可持久化数据结构（可持久化线段树（主席树）、可持久化块状数组、可持久化平衡树、可持久化字典树、可持久化可并堆）、树套树、K-D Tree、动态树（LCT）、析合树、PQ 树、手指树、霍夫曼树（霍夫曼编码）、败者树

### 图论

图的存储（邻接表、邻接矩阵）、拓扑排序、最短路（Dijkstra、Bellman–Ford、SPFA、Floyd–Warshall）、最小生成树（Prim、Kruskal）、斯坦纳树、拆点、强连通分量（Tarjan、Kosaraju）、双连通分量、圆方树、环计数问题、最小环、2-SAT、欧拉图（欧拉回路）、哈密顿图（哈密顿回路）、二分图、平面图、弦图、网络流（最大流、最小割、费用流）、二分图匹配（匈牙利算法、KM 算法）、Prüfer 序列、矩阵树定理、LGV 引理、最大团、支配树、图上随机游走、最近公共祖先（LCA）、树链剖分、树上启发式合并、虚树、树分治（点分治）、动态树分治、AHU 算法、树哈希、树上随机游走、仙人掌图、最小树形图、基环树

### 计算几何

Pick 定理、三角剖分、凸包、扫描线、旋转卡壳、半平面交、平面最近点对、反演变换、随机增量、点积、叉积

### 杂项

离散化、双指针、RMQ（Range Minimum Query）、莫队算法（普通莫队、带修改莫队、树上莫队、回滚莫队、二维莫队、莫队二次离线）、CDQ 分治、分数规划、整体二分、随机化（爬山算法、模拟退火）、悬线法、有限状态自动机、计算理论、字节顺序、约瑟夫问题、格雷码、表达式求值、主元素问题、Garsia–Wachs 算法、15-puzzle、Kahan 求和、珂朵莉树（ODT）、空间优化

## 目录

<DocCardList />
