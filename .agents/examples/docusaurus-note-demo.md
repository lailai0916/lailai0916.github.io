# Example: site solution MDX

This example covers only the website-owned wrapper. The algorithm, proof, verification, and
Luogu account workflow come through the external Skill chain described in `AGENTS.md`.

```mdx
---
title: 题解：P0001 区间求和
description: 本文为洛谷 P0001 的题解，使用等差数列求和公式直接计算答案。
summary: 将区间和视为首项与末项配对，直接得到闭式；实现只需注意乘法在除法前可能溢出，因此使用 long long 保存中间结果。
date: 2026-08-30T12:00:00+08:00
tags: [oi, solution, luogu]
lid: abcdefgh
---

{/* truncate */}

## 题意简述

给定 $n$，求 $\sum_{i=1}^{n}i$。

## 解题思路

首尾两项之和均为 $n+1$，直接使用等差数列求和公式 $\frac{n(n+1)}{2}$。乘积可能超过 `int`，用 `long long` 保存。

## 参考代码

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

using ll=long long;
int main()
{
ios::sync_with_stdio(false);
cin.tie(nullptr);
ll n;
cin>>n;
cout<<n\*(n+1)/2<<'\n';
return 0;
}
\`\`\`
```

There is no body `<Solution>` component: `lid` in frontmatter drives the Luogu link in the site's
meta bar. The body itself is shown only as an integration example and remains owned by the
external workflow.
