import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import clsx from 'clsx';
import { resourceData } from '@site/src/data/resources';
import ResourceCard from './_components/ResourceCard';
import styles from './styles.module.css';

const TITLE = '网站';
const DESCRIPTION = '有趣与实用的优质网站导航';

function PageHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">{TITLE}</Heading>
      <p>{DESCRIPTION}</p>
    </section>
  )
}

// Generate URL-friendly category IDs
function getCategoryId(categoryName: string): string {
  // Mapping of category names to simplified English IDs
  const categoryMapping: Record<string, string> = {
    '🏠 个人与学习': 'personal-learning',
    '☁️ 云计算与认证': 'cloud-computing',
    '🐳 容器与编排': 'containers',
    '🏗️ 基础设施即代码': 'infrastructure-as-code',
    '🔒 安全与策略': 'security',
    '⚙️ CI/CD 与自动化': 'cicd',
    '☸️ Kubernetes 生态': 'kubernetes',
    '🐍 Python 生态': 'python',
    '💻 编程语言与脚本': 'programming-languages',
    '📋 数据格式与配置': 'data-formats',
    '📚 在线学习与教育': 'education',
    '🎓 MOOC 平台': 'mooc',
    '🚀 代码托管与部署': 'code-hosting',
    '📊 GitHub 生态工具': 'github-tools',
    '☁️ 云端开发环境': 'cloud-development',
    '💻 在线开发工具': 'online-development',
    '📖 静态站点生成': 'static-sites',
    '📝 文档与内容管理': 'documentation',
    '🛠️ 效率与实用工具': 'utilities',
    '🔄 自动化与集成': 'automation',
    '🎯 在线测试与工具': 'testing-tools',
    '📚 学术研究': 'academic-research',
    '🤖 人工智能平台': 'ai-platforms',
    '🔬 AI 研究与开发': 'ai-research',
    '🛠️ AI 开发工具': 'ai-tools',
    '🔍 搜索引擎': 'search-engines',
    '📖 百科与参考': 'encyclopedia',
    '📐 数学与计算工具': 'math-tools',
    '🏆 编程竞赛平台': 'programming-contests',
    '🛠️ 开发辅助工具': 'dev-tools',
    '📱 数码设备资源': 'device-resources',
    '🎬 视频与媒体': 'video-media',
    '🎨 设计与创意资源': 'design-resources',
    '📱 社交网络': 'social-networks',
    '🎮 在线游戏': 'online-games',
    '🔓 网络工具': 'network-tools',
  };
  
  return categoryMapping[categoryName] || categoryName
    .replace(/[^\w\s\u4e00-\u9fa5]/g, '') // Remove emoji and special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .toLowerCase();
}

function CategorySidebar() {
  const sidebar = {
    title: '',
    items: resourceData.map(w => ({ title: w.name, permalink: `#${getCategoryId(w.name)}` })),
  }

  return (
    <nav className={clsx(styles.sidebar, 'thin-scrollbar')}>
      <div className={clsx(styles.sidebarItemTitle, 'margin-bottom--md')}>{sidebar.title}</div>
      <ul className={clsx(styles.sidebarItemList, 'clean-list')}>
        {sidebar.items.map(item => (
          <li key={item.permalink} className={styles.sidebarItem}>
            <Link
              isNavLink
              to={item.permalink}
              className={styles.sidebarItemLink}
              activeClassName={styles.sidebarItemLinkActive}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function CategoryList() {
  return (
    <div className={styles.category}>
      {resourceData.map(cate => (
        <div key={cate.name}>
          <div className={styles.cateHeader}>
            <h2 id={getCategoryId(cate.name)} className="anchor">
              {cate.name}
            </h2>
          </div>
          <section>
            <ul className={styles.resourceList}>
              {cate.resources.map(resource => (
                <ResourceCard key={resource.name} resource={resource} />
              ))}
            </ul>
          </section>
        </div>
      ))}
    </div>
  )
}

export default function resourcesPage() {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <PageHeader />
        <div className="container">
          <div className="row">
            <aside className="col col--2">
              <CategorySidebar />
            </aside>
            <main className="col col--10">
              <CategoryList />
            </main>
          </div>
        </div>
      </main>
    </Layout>
  )
}
