import React from 'react';
import { Icon } from '@iconify/react';
import { BaseCard, Section, SectionHeader, StatusBadge, IconWrapper, GridLayout, GridConfigs, TEXT_COLORS } from '../common';

const exploringItems = [
  { 
    name: '算法竞赛', 
    icon: 'lucide:trophy', 
    description: '参与算法竞赛，深入学习数据结构与算法，提升逻辑思维能力与问题解决技巧。',
    progress: '进行中',
    skills: ['数据结构', '算法优化', '竞赛策略']
  },
  { 
    name: 'Docusaurus', 
    icon: 'lucide:book-open', 
    description: '使用 Docusaurus 构建统一、简约、现代的个人网站，探索文档工程化的最佳实践。',
    progress: '深化中',
    skills: ['React', 'TypeScript', 'MDX']
  },
  { 
    name: 'AI 模型', 
    icon: 'lucide:bot', 
    description: '深入探索人工智能模型的工作原理，实践机器学习技术在实际场景中的应用。',
    progress: '探索中',
    skills: ['机器学习', '深度学习', '模型部署']
  },
  { 
    name: '英语语法', 
    icon: 'lucide:pencil', 
    description: '系统学习英语语法规则，掌握语言结构逻辑，提升技术文档阅读与写作能力。',
    progress: '学习中',
    skills: ['语法结构', '技术写作', '学术阅读']
  },
];

function ExplorationCard({ name, icon, description, progress, skills }: {
  name: string;
  icon: string;
  description: string;
  progress: string;
  skills: string[];
}) {
  return (
    <BaseCard isClickable={false} className="p-6">
      <div className="flex-1 space-y-4">
        <header className="space-y-3">
                      <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <IconWrapper>
                  <Icon icon={icon} width={32} height={32} className="text-gray-700 dark:text-neutral-300" />
                </IconWrapper>
              <div>
                <h3 className={`font-semibold text-xl ${TEXT_COLORS.PRIMARY} leading-snug`}>
                  {name}
                </h3>
              </div>
            </div>
            <StatusBadge status={progress} />
          </div>
          <p className={`${TEXT_COLORS.SECONDARY} leading-relaxed`}>
            {description}
          </p>
        </header>
        <footer className="pt-2">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </BaseCard>
  );
}

export default function Exploration() {
  return (
    <Section background="alt">
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <SectionHeader 
          title="当前探索"
          description="保持好奇心，不断探索新领域。每一次学习都是对未知世界的勇敢探索"
        />
        
        <GridLayout columns={GridConfigs.exploration}>
          {exploringItems.map((item, idx) => (
            <div key={idx} className="h-full">
              <ExplorationCard {...item} />
            </div>
          ))}
        </GridLayout>
      </div>
    </Section>
  );
}
