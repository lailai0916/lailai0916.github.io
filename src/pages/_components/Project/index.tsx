import React from 'react';
import Link from '@docusaurus/Link';

const projects = [
  {
    title: 'lailai\'s Home',
    description: '基于 Docusaurus 构建的个人网站，采用现代化设计理念，展示个人技术栈与项目经验。',
    link: '/docs/project/GitHub/lailais-Home/README',
    tech: 'TypeScript • Docusaurus',
    status: '维护中',
  },
  {
    title: 'iGame',
    description: '基于 C++ 开发的终端游戏集合，包含多种经典游戏玩法，体验纯粹的编程乐趣。',
    link: '/docs/project/终端/iGame',
    tech: 'C++ • Terminal',
    status: '已完成',
  },
  {
    title: 'iClock',
    description: '利用 Desmos 平台创作的数学艺术作品，通过函数图形展现时间的美学表达。',
    link: '/docs/project/Desmos/艺术博览会/iClock',
    tech: 'Mathematics • Desmos',
    status: '展示中',
  },
];

function ProjectCard({ title, description, link, tech, status }: { 
  title: string; 
  description: string; 
  link: string;
  tech: string;
  status: string;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case '维护中': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case '已完成': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case '展示中': return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <Link
      to={link}
      className="group block h-full w-full rounded-2xl outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 no-underline hover:no-underline"
      style={{ textDecoration: 'none' }}
    >
      <article className="relative overflow-hidden p-6 cursor-pointer w-full h-full flex flex-col bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800/50 rounded-2xl transition-all duration-200 ease-out shadow-sm hover:shadow-lg dark:shadow-none border border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600">
        <div className="flex-1 space-y-4">
          <header className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-xl text-gray-900 dark:text-neutral-100 leading-snug">
                <span 
                  className="group-hover:transition-colors group-hover:duration-200"
                  style={{ color: 'inherit' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--ifm-color-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'inherit';
                  }}
                >
                  {title}
                </span>
              </h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                {status}
              </span>
            </div>
            <p className="text-gray-600 dark:text-neutral-300 leading-relaxed">
              {description}
            </p>
          </header>
          <footer className="pt-2">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-neutral-400">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17M2 12L12 17L22 12" />
              </svg>
              <span>{tech}</span>
            </div>
          </footer>
        </div>
      </article>
    </Link>
  );
}

function Section({ children, background = null }: { children: React.ReactNode; background?: string | null }) {
  return (
    <div
      className={`mx-auto flex flex-col w-full ${
        background === null ? 'max-w-7xl' : ''
      } ${
        background === 'alt'
          ? 'border-t border-gray-200/30 dark:border-neutral-700/30'
          : ''
      }`}
      style={{ 
        contain: 'content',
        backgroundColor: background === 'alt' ? 'var(--ifm-color-emphasis-100)' : undefined
      }}
    >
      <div className="flex-col gap-2 flex grow w-full my-16 lg:my-24 mx-auto items-center">
        {children}
      </div>
    </div>
  );
}

export default function Project() {
  return (
    <Section background="alt">
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <div className="text-center mb-12">
          <h2 className="font-bold text-4xl text-gray-900 dark:text-neutral-100 leading-tight mb-4">
            我的项目
          </h2>
          <p className="text-lg lg:text-xl text-gray-700 dark:text-neutral-300 leading-relaxed max-w-3xl mx-auto">
            通过实践将想法转化为现实，每个项目都是技术探索与创新思维的结晶
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div key={idx} className="h-full">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
