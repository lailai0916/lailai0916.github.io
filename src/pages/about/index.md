---
title: 关于
hide_table_of_contents: true
---

import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import { Icon } from '@iconify/react';
import styles from './styles.module.css';

import Comment from "./_components/Comment";
import SocialLinks from './_components/SocialLinks';
import DeviceList from './_components/DeviceList';

<div style={{maxWidth: '70ch', margin: 'auto'}}>

<section className="margin-top--lg margin-bottom--lg text--center">
  <Heading as="h1">
    {'🎉\xa0'}
    <span className={styles.titleText}>
      <Link to="..">{'Hello,\xa0I\'m\xa0lailai'}</Link>
    </span>
    {'\xa0🥳'}
  </Heading>
</section>

## 个人简介

🧑🏻‍🎓 我是一名来自浙江杭州的中学生。

🧑🏻‍💻 热爱数学与编程，对技术充满热情与探索精神。

💡 具备较强的自学能力与问题解决能力，善于独立思考与实践。

🫧 注重代码的规范与整洁，追求结构清晰、风格一致。

✍️ 喜欢整理学习过程，记录思考，便于交流与共享。

## 网站简介

这是我的个人网站，分享技术笔记、项目经验和学习心得。✨

本项目基于 [Docusaurus](https://docusaurus.io) 构建，源代码托管于 [GitHub](https://github.com/lailai0916/lailai0916.github.io)。

## 我的昵称

我的昵称是 **lailai**，由于重名较多，注册账户时经常遇到困难。

所以我通常会在其后添加生日数字 **0916**，组成 **lailai0916**。

如果这个昵称也被占用，我会将数字转换为十六进制 **0x394**，组成 **lailai0x394**。

:::warning

- **lailai** 始终应排印为小写，即使它出现在句首、段落开头或标题中。
- **lailai** 为不翻译内容，始终以英语排印，即使它出现在非英语的语言文本中也是如此。

:::

## 我的技能

![](https://skillicons.dev/icons?i=aws,azure,cloudflare,npm,git,github,c,cpp,qt,html,js,ts,css,py,md,latex,docker,linux,vscode,nodejs,react&theme=light#gh-light-mode-only)
![](https://skillicons.dev/icons?i=aws,azure,cloudflare,npm,git,github,c,cpp,qt,html,js,ts,css,py,md,latex,docker,linux,vscode,nodejs,react&theme=dark#gh-dark-mode-only)

## 我的设备

<DeviceList className={styles.item} layout="list" showIcons={true} />

## 我的社区

<SocialLinks className={styles.item} iconSize={20} showLabels={true} />

------

<Comment />

</div>
