---
title: 关于
hide_table_of_contents: true
---

import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

import { Icon } from '@iconify/react';
import { DEVICES } from '@site/src/data/device';
import { COMMUNITY_LINKS } from '@site/src/data/community';

import BrowserOnly from '@docusaurus/BrowserOnly';
import Giscus from "@giscus/react";
import { useColorMode } from "@docusaurus/theme-common";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const Comment = () => {
  const { colorMode } = useColorMode();
  const { i18n } = useDocusaurusContext();

  return (
    <BrowserOnly fallback={<div>Loading comments...</div>}>
      {() => (
        <Giscus
          repo="lailai0916/giscus"
          repoId="R_kgDONHUoXA"
          category="Announcements"
          categoryId="DIC_kwDONHUoXM4Cjx_9"
          mapping="specific"
          term="website-comments"
          inputPosition="top"
          theme={colorMode}
          lang={i18n.currentLocale}
        />
      )}
    </BrowserOnly>
  );
};

<div style={{maxWidth: '70ch', margin: 'auto'}}>

<section className="margin-top--lg margin-bottom--lg text--center">
  <Heading as="h1">
    {'🎉\xa0'}
    <span className={styles.titleText}>
      <Link to="/">{'Hello,\xa0I\'m\xa0lailai'}</Link>
    </span>
    {'\xa0🥳'}
  </Heading>
</section>

## 个人简介

🎓 我是一名来自浙江杭州的中学生。

💻 热爱数学与编程，对技术充满热情，喜欢探索新事物。

💡 拥有较强的自学能力和解决问题的能力，善于独立思考和动手实践。

🛠️ 注重代码的规范与整洁，追求结构清晰、风格一致。

✍️ 喜欢整理学习过程，记录思考，方便交流和分享。

## 网站简介

这是我的个人网站，分享技术笔记、项目经验与学习心得。✨

本网站使用 [Docusaurus](https://docusaurus.io) 构建，源代码托管于 [GitHub](https://github.com/lailai0916/lailai0916.github.io)。

## 我的昵称

我的昵称是 **lailai**，由于重名较多，注册账户时经常遇到困难。

所以我通常会在其后添加生日数字 **0916**，组成 **lailai0916**。

如果这个昵称也被占用，我会将数字转换为十六进制 **0x394**，组成 **lailai0x394**。

:::warning

- **lailai** 始终应排印为小写，即使它出现在句首、段落开头或标题中。
- **lailai** 为不翻译内容，始终以英语排印，即使它出现在非英语的语言文本中也是如此。

:::

## 我的技能

![](https://skillicons.dev/icons?i=c,cpp,py,java,md,latex,html,css,js,ts,react,tailwind,qt,cmake,npm,git,github,vscode,visualstudio,linux,windows,docker,cloudflare,wordpress&perline=12&theme=light#gh-light-mode-only)
![](https://skillicons.dev/icons?i=c,cpp,py,java,md,latex,html,css,js,ts,react,tailwind,qt,cmake,npm,git,github,vscode,visualstudio,linux,windows,docker,cloudflare,wordpress&perline=12&theme=dark#gh-dark-mode-only)

## 我的设备

<div className={styles.listContainer}>
  {DEVICES.map((device) => (
    <div key={device.name} className={styles.listItem}>
      <img src={device.icon} alt={device.name} className={styles.deviceIcon} />
      <span>{device.name}</span>
    </div>
  ))}
</div>

## 我的社区

<div className={styles.listContainer}>
  {COMMUNITY_LINKS.map((link) => (
    <div key={link.text} className={styles.listItem}>
      <Icon icon={link.icon} width="1.25rem" height="1.25rem" />
      <Link to={link.href}>{link.text}</Link>
    </div>
  ))}
</div>

------

<Comment />

</div>
