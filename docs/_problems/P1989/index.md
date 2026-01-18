---
title: '洛谷 P1989 【模版】无向图三元环计数'
link: 'https://www.luogu.com.cn/problem/P1989'
---

无向图 $G$ 的三元环指的是一个 $G$ 的一个子图 $G_0$，满足 $G_0$ 有且仅有三个点 $u, v, w$，有且仅有三条边 $\langle u, v \rangle, \langle v, w \rangle, \langle w, u \rangle$。两个三元环 $G_1, G_2$ 不同当且仅当存在一个点 $u$，满足 $u \in G_1$ 且 $u \notin G_2$。
