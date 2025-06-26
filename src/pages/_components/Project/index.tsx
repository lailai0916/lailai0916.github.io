import React from 'react';
import { Icon } from '@iconify/react';
import { projects } from '../../../data/projects';
import { BaseCard, Section, SectionHeader, StatusBadge, GridLayout, GridConfigs } from '../common';

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
            <h3 className="font-semibold text-xl text-gray-900 dark:text-neutral-100 leading-snug group-hover:text-[var(--ifm-color-primary)] transition-colors duration-200">
              {title}
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
        
        <GridLayout columns={GridConfigs.projects}>
          {projects.map((project, idx) => (
            <div key={idx} className="h-full">
              <ProjectCard {...project} />
            </div>
          ))}
        </GridLayout>
      </div>
    </Section>
  );
}
