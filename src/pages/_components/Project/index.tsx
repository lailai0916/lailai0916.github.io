import React from 'react';
import { Icon } from '@iconify/react';
import BaseCard from '../common/BaseCard';
import Section from '../common/Section';
import SectionHeader from '../common/SectionHeader';
import StatusBadge from '../common/StatusBadge';

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
  return (
    <BaseCard href={link} className="p-6">
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
            <StatusBadge status={status} />
          </div>
          <p className="text-gray-600 dark:text-neutral-300 leading-relaxed">
            {description}
          </p>
        </header>
        <footer className="pt-2">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-neutral-400">
            <Icon icon="lucide:layers" />
            <span>{tech}</span>
          </div>
        </footer>
      </div>
    </BaseCard>
  );
}

export default function Project() {
  return (
    <Section background="alt">
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <SectionHeader 
          title="我的项目"
          description="通过实践将想法转化为现实，每个项目都是技术探索与创新思维的结晶"
        />
        
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
