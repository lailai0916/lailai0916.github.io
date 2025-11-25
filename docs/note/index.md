---
sidebar_position: 0
---

# 笔记

笔记板块整理了数学、编程、技术、外语等多个学科的学习笔记、知识梳理与个人的思考总结。

内容涵盖不同学科的核心知识点与实用技巧，系统反映个人学习与理解过程。

![](/img/docs/note-light.svg#gh-light-mode-only)![](/img/docs/note-dark.svg#gh-dark-mode-only)

## 倒计时

export const today = new Date().toISOString().split("T")[0];
export const daysUntil = (target) => Math.ceil((new Date(target) - new Date()) / 86400000);

今天是 **{today}**，距离：

- **2026 年高考** 还有 **{daysUntil('2026-06-07')}** 天
- **2027 年高考** 还有 **~{daysUntil('2027-06-07')}** 天
- **2028 年高考** 还有 **~{daysUntil('2028-06-07')}** 天

## 教材

GitHub 上的开源仓库 **TapXWorld/ChinaTextbook** 收录了几乎所有小学、初中、高中和大学的 **PDF 教材**。

如果你 **无法访问 GitHub** 或 **不会下载资源**，也可以到 [人民教育出版社](https://jc.pep.com.cn) 或 [国家中小学智慧教育平台](https://basic.smartedu.cn/tchMaterial) 在线预览 **电子课本**。

<GitHub repo="TapXWorld/ChinaTextbook" />

## 目录

<DocCardList />
