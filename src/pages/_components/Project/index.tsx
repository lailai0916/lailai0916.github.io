import React from 'react';
import { Icon } from '@iconify/react';
import { projects } from '../../../data/projects';
import { BaseCard, Section, SectionHeader, StatusBadge, GridLayout, GridConfigs, TEXT_COLORS } from '../common';

// 文本行数控制样式 - 保证卡片高度一致性
const TEXT_CLAMP_STYLES = {
  // 标题：1行高度，超出截断
  title: {
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.375',
    minHeight: '1.375em' // 确保始终占据一行高度
  } as React.CSSProperties,
  
  // 描述：2行高度，超出截断
  description: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.5',
    minHeight: '3em' // 确保始终占据两行高度：1.5 × 2 = 3em
  } as React.CSSProperties,
  
  // 技术栈：1行高度，超出截断
  tech: {
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.25',
    minHeight: '1.25em' // 确保始终占据一行高度
  } as React.CSSProperties
} as const;

/**
 * 项目卡片组件 - 采用统一的布局机制
 */
const ProjectCard = React.memo<{ 
  title: string; 
  description: string; 
  link: string;
  tech: string;
  status: string;
}>(({ title, description, link, tech, status }) => (
  <BaseCard href={link} className="p-6">
    <div className="flex-1 space-y-3">
      <header className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <h3 
            className={`font-semibold text-xl ${TEXT_COLORS.PRIMARY} group-hover:text-[var(--ifm-color-primary)] transition-colors duration-200`}
            style={TEXT_CLAMP_STYLES.title}
          >
            {title}
          </h3>
          <StatusBadge status={status} />
        </div>
        <p 
          className={`${TEXT_COLORS.SECONDARY}`}
          style={TEXT_CLAMP_STYLES.description}
        >
          {description}
        </p>
      </header>
      <footer>
        <div className={`flex items-center gap-2 text-sm ${TEXT_COLORS.MUTED}`}>
          <Icon icon="lucide:layers" />
          <span style={TEXT_CLAMP_STYLES.tech}>{tech}</span>
        </div>
      </footer>
    </div>
  </BaseCard>
));

ProjectCard.displayName = 'ProjectCard';

/**
 * 项目展示组件
 */
export default function Project() {
  return (
    <Section>
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <SectionHeader 
          title="我的项目"
          description="通过实践将想法转化为现实，每个项目都是技术探索与创新思维的结晶"
        />
        
        <GridLayout columns={GridConfigs.projects}>
          {projects.map((project, idx) => (
            <div key={idx}>
              <ProjectCard {...project} />
            </div>
          ))}
        </GridLayout>
      </div>
    </Section>
  );
}
