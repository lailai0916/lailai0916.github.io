import React from 'react';
import { techStack } from '../../../data/skills';
import { BaseCard, Section, SectionHeader, GridLayout, GridConfigs } from '../common';

function SkillCard({ name, icon }: { name: string; icon: string }) {
  return (
    <BaseCard isClickable={false} className="p-6 items-center justify-center">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="flex justify-center items-center h-12 w-12">
          <div className="group-hover:scale-110 transition-transform duration-200">
            <img 
              src={`https://skillicons.dev/icons?i=${icon}&theme=light#gh-light-mode-only`} 
              alt={name} 
              className="w-12 h-12 object-contain"
            />
            <img 
              src={`https://skillicons.dev/icons?i=${icon}&theme=dark#gh-dark-mode-only`} 
              alt={name} 
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>
        <h3 className="font-semibold text-lg text-gray-900 dark:text-neutral-100 leading-snug">
          {name}
        </h3>
      </div>
    </BaseCard>
  );
}

export default function Skill() {
  return (
    <Section background={null}>
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <SectionHeader 
          title="我的技能"
          description="技术栈的积累是一个持续的过程，每一项技能都是解决问题的工具"
        />
        
        <GridLayout columns={GridConfigs.skills} gap="gap-4">
          {techStack.map((tech, idx) => (
            <div key={idx} className="h-full">
              <SkillCard {...tech} />
            </div>
          ))}
        </GridLayout>
      </div>
    </Section>
  );
}
