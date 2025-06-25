import React from 'react';
import BaseCard from '../common/BaseCard';
import Section from '../common/Section';
import SectionHeader from '../common/SectionHeader';

const techStack = [
  { name: 'C', icon: 'c' },
  { name: 'C++', icon: 'cpp' },
  { name: 'Python', icon: 'py' },
  { name: 'Java', icon: 'java' },
  { name: 'Markdown', icon: 'md' },
  { name: 'LaTeX', icon: 'latex' },
  { name: 'HTML', icon: 'html' },
  { name: 'CSS', icon: 'css' },
  { name: 'JavaScript', icon: 'js' },
  { name: 'TypeScript', icon: 'ts' },
  { name: 'React', icon: 'react' },
  { name: 'Tailwind CSS', icon: 'tailwind' },
];

function SkillCard({ name, icon }: {
  name: string;
  icon: string;
}) {
  return (
    <BaseCard isClickable={false} className="p-6">
      <div className="flex-1 flex flex-col items-center text-center space-y-4">
        <div className="flex justify-center items-center h-12 w-12">
          <div className="group-hover:scale-110 transition-transform duration-200">
            <img 
              src={`https://skillicons.dev/icons?i=${icon}&theme=light#gh-light-mode-only`} 
              alt={name} 
              className="w-12 h-12 object-contain "
            />
            <img 
              src={`https://skillicons.dev/icons?i=${icon}&theme=dark#gh-dark-mode-only`} 
              alt={name} 
              className="w-12 h-12 object-contain "
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
    <Section background="alt">
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <SectionHeader 
          title="我的技能"
          description="技术栈的积累是一个持续的过程，每一项技能都是解决问题的工具"
        />
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {techStack.map((tech, idx) => (
            <div key={idx} className="h-full">
              <SkillCard {...tech} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
