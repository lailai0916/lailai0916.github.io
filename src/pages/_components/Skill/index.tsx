import React from 'react';

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
    <article className="group relative overflow-hidden p-6 w-full h-full flex flex-col bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800/50 rounded-2xl transition-all duration-200 ease-out shadow-sm hover:shadow-lg dark:shadow-none border border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600">
      <div className="flex-1 flex flex-col items-center text-center space-y-4">
        <div className="flex justify-center items-center h-12">
          <div className="group-hover:scale-110 transition-transform duration-200">
            <img 
              src={`https://skillicons.dev/icons?i=${icon}&theme=light`} 
              alt={name} 
              className="w-12 h-12 object-contain transition-all duration-200 dark:invert dark:brightness-0 dark:contrast-100"
            />
          </div>
        </div>
        <h3 className="font-semibold text-lg text-gray-900 dark:text-neutral-100 leading-snug">
          {name}
        </h3>
      </div>
    </article>
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

export default function Skill() {
  return (
    <Section background="alt">
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <div className="text-center mb-12">
          <h2 className="font-bold text-4xl text-gray-900 dark:text-neutral-100 leading-tight mb-4">
            我的技能
          </h2>
          <p className="text-lg lg:text-xl text-gray-700 dark:text-neutral-300 leading-relaxed max-w-3xl mx-auto">
            技术栈的积累是一个持续的过程，每一项技能都是解决问题的工具
          </p>
        </div>
        
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
