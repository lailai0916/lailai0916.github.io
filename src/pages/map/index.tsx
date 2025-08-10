import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';

import Link from '@docusaurus/Link';
import {
  PageTitle,
  PageMain,
  PageHeader,
} from '@site/src/components/laikit/page';
import DataCard from '@site/src/components/laikit/widget/DataCard';
import styles from './styles.module.css';

const TITLE = '地图';
const DESCRIPTION = "lailai's Home 网站地图";

function MapHeader() {
  return (
    <PageHeader>
      <PageTitle description={DESCRIPTION}>
        网站<b>地图</b>
      </PageTitle>
      <DataCard value={8} label="个页面" icon="lucide:list" />
    </PageHeader>
  );
}

function MapContainer() {
  return (
    <div className={styles.container}>
      <div>
        <h3>页面</h3>
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/about">关于</Link>
          </li>
          <li>
            <Link to="/travel">旅行</Link>
          </li>
          <li>
            <Link to="/friends">友链</Link>
          </li>
          <li>
            <Link to="/resources">资源</Link>
          </li>
          <li>
            <Link to="/games">游戏</Link>
          </li>
          <li>
            <Link to="/settings">设置</Link>
          </li>
          <li>
            <Link to="/map">地图</Link>
          </li>
        </ul>
      </div>
      <div>
        <h3>文档</h3>
        <ul>
          <li>
            <Link to="/docs/contest">竞赛</Link>
          </li>
          <li>
            <Link to="/docs/note">笔记</Link>
          </li>
          <li>
            <Link to="/docs/project">项目</Link>
          </li>
        </ul>
        <h3>博客</h3>
        <ul>
          <li>
            <Link to="/blog">博客</Link>
          </li>
          <li>
            <Link to="/blog/archive">归档</Link>
          </li>
          <li>
            <Link to="/blog/authors">作者</Link>
          </li>
          <li>
            <Link to="/blog/tags">标签</Link>
          </li>
        </ul>
      </div>
      <div>
        <h3>搜索</h3>
        <ul>
          <li>
            <Link to="/search">搜索</Link>
          </li>
        </ul>
        <h3>测试</h3>
        <ul>
          <li>
            <Link to="/test">测试</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function Map(): ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <PageMain>
        <MapHeader />
        <MapContainer />
      </PageMain>
    </Layout>
  );
}
