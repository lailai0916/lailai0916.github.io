import React from 'react';
import { Icon } from '@iconify/react';
import { BaseCard, Section, SectionHeader, StatusBadge, IconWrapper, GridLayout, GridConfigs, TEXT_COLORS } from '../common';
import { exploringItems } from '@site/src/data/explorations';

function ExplorationCard({ name, icon, description, progress, skills }: { name: string; icon: string; description: string; progress: { text: string; color: string }; skills: string[] }) {
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
                <h3 className={`font-semibold text-xl ${TEXT_COLORS.PRIMARY} leading-snug`}>{name}</h3>
              </div>
            </div>
            <StatusBadge status={progress} />
          </div>
          <p className={`${TEXT_COLORS.SECONDARY} leading-relaxed`}>{description}</p>
        </header>
        <footer className="pt-2">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300">
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
    <Section>
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <SectionHeader title="当前探索" description="保持好奇心，不断探索新领域。每一次学习都是对未知世界的勇敢探索" />

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
