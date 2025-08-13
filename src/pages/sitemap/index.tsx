import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';

import Link from '@docusaurus/Link';
import {
  PageTitle,
  PageMain,
  PageHeader,
} from '@site/src/components/laikit/page';
import DataCard from '@site/src/components/laikit/widget/DataCard';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

const TITLE = translate({ id: 'pages.sitemap.title', message: 'Map' });
const MODIFICATION = translate({
  id: 'pages.sitemap.modification',
  message: 'Site<b>map</b>',
});
const DESCRIPTION = translate({
  id: 'pages.sitemap.description',
  message: "Sitemap of lailai's Home",
});

function MapHeader() {
  return (
    <PageHeader>
      <PageTitle title={MODIFICATION} description={DESCRIPTION} />
      <DataCard
        value={8}
        label={translate({
          id: 'pages.sitemap.datacard.label',
          message: 'Pages',
        })}
        icon="lucide:list"
      />
    </PageHeader>
  );
}

function MapContainer() {
  return (
    <div className={styles.container}>
      <div>
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
          </ul>
        </div>
        <div>
          <h3>地图</h3>
          <ul>
            <li>
              <Link to="/sitemap">地图</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
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
        </div>
        <div>
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
      </div>
      <div>
        <div>
          <h3>搜索</h3>
          <ul>
            <li>
              <Link to="/search">搜索</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>测试</h3>
          <ul>
            <li>
              <Link to="/test">测试</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>设置</h3>
          <ul>
            <li>
              <Link to="/settings">设置</Link>
            </li>
          </ul>
        </div>
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
