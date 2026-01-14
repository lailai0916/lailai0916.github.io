---
title: '个人头像'
date: 2023-09-27T15:00
authors: lailai
tags: [personal]
---

我的个人头像代码。

<!-- truncate -->

## 说明

1. 头像整体为 $1000\times 1000$ 像素，划分为 $5\times 5$ 个 $200\times 200$ 色块。
2. 颜色分别为：

- 绿色（$G\to\textcolor{37A93C}{37A93C}$）
- 黄色（$Y\to\textcolor{FFC107}{FFC107}$）
- 红色（$R\to\textcolor{F44336}{F44336}$）
- 蓝色（$B\to\textcolor{2196F3}{2196F3}$）
- 白色（$W\to\textcolor{FFFFFF}{FFFFFF}$）
- 黑色（$K\to\textcolor{000000}{000000}$）

3. 色块顺序为：

```text
GYGYR
RBYYR
BGWRB
RGRYG
GGYBR
```

4. 第 $3$ 行第 $3$ 列的中心白块为白底黑字的 L 形图案：留白上下各 $20$ 像素、左右各 $40$ 像素，中间为 $120\times 160$ 的黑色区域，其中右上角 $80\times120$ 为白色。

## 代码

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000">
  <style>.R{fill:#F44336;}.Y{fill:#FFC107;}.B{fill:#2196F3;}.G{fill:#37A93C;}.W{fill:#FFFFFF;}.K{fill:#000000;}</style>
  <rect class="G" x="0" y="0" width="200" height="200" />
  <rect class="Y" x="200" y="0" width="200" height="200" />
  <rect class="G" x="400" y="0" width="200" height="200" />
  <rect class="Y" x="600" y="0" width="200" height="200" />
  <rect class="R" x="800" y="0" width="200" height="200" />
  <rect class="R" x="0" y="200" width="200" height="200" />
  <rect class="B" x="200" y="200" width="200" height="200" />
  <rect class="Y" x="400" y="200" width="200" height="200" />
  <rect class="Y" x="600" y="200" width="200" height="200" />
  <rect class="R" x="800" y="200" width="200" height="200" />
  <rect class="B" x="0" y="400" width="200" height="200" />
  <rect class="G" x="200" y="400" width="200" height="200" />
  <rect class="W" x="400" y="400" width="200" height="200" />
  <rect class="R" x="600" y="400" width="200" height="200" />
  <rect class="B" x="800" y="400" width="200" height="200" />
  <rect class="R" x="0" y="600" width="200" height="200" />
  <rect class="G" x="200" y="600" width="200" height="200" />
  <rect class="R" x="400" y="600" width="200" height="200" />
  <rect class="Y" x="600" y="600" width="200" height="200" />
  <rect class="G" x="800" y="600" width="200" height="200" />
  <rect class="G" x="0" y="800" width="200" height="200" />
  <rect class="G" x="200" y="800" width="200" height="200" />
  <rect class="Y" x="400" y="800" width="200" height="200" />
  <rect class="B" x="600" y="800" width="200" height="200" />
  <rect class="R" x="800" y="800" width="200" height="200" />
  <rect class="K" x="440" y="420" width="40" height="120" />
  <rect class="K" x="440" y="540" width="120" height="40" />
</svg>
```
