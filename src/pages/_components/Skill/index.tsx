import React from 'react';

const techStack = [
  { name: 'C', icon: 'c', category: '系统编程', level: '熟练' },
  { name: 'C++', icon: 'cpp', category: '系统编程', level: '熟练' },
  { name: 'Python', icon: 'py', category: '脚本语言', level: '熟练' },
  { name: 'Java', icon: 'java', category: '企业开发', level: '了解' },
  { name: 'Markdown', icon: 'md', category: '文档编写', level: '精通' },
  { name: 'LaTeX', icon: 'latex', category: '学术排版', level: '熟练' },
  { name: 'HTML', icon: 'html', category: 'Web基础', level: '熟练' },
  { name: 'CSS', icon: 'css', category: 'Web基础', level: '熟练' },
  { name: 'JavaScript', icon: 'js', category: '前端开发', level: '熟练' },
  { name: 'TypeScript', icon: 'ts', category: '前端开发', level: '熟练' },
  { name: 'React', icon: 'react', category: 'Frontend框架', level: '熟练' },
  { name: 'Tailwind CSS', icon: 'tailwind', category: 'CSS框架', level: '熟练' },
];

function SkillCard({ name, icon, category, level }: {
  name: string;
  icon: string;
  category: string;
  level: string;
}) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case '精通': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case '熟练': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case '了解': return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <article className="group relative overflow-hidden p-6 w-full h-full flex flex-col bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800/50 rounded-2xl transition-all duration-200 ease-out shadow-sm hover:shadow-lg dark:shadow-none border border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600">
      <div className="flex-1 flex flex-col items-center text-center space-y-4">
        <header className="space-y-3">
          <div className="flex justify-center">
            <div className="group-hover:scale-110 transition-transform duration-200">
              <img 
                src={`https://skillicons.dev/icons?i=${icon}&theme=light#gh-light-mode-only`} 
                alt={name} 
                className="w-12 h-12 dark:hidden"
              />
              <img 
                src={`https://skillicons.dev/icons?i=${icon}&theme=dark#gh-dark-mode-only`} 
                alt={name} 
                className="w-12 h-12 hidden dark:block"
              />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-neutral-100 leading-snug">
              {name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-neutral-400 mt-1">
              {category}
            </p>
          </div>
        </header>
        <footer>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getLevelColor(level)}`}>
            {level}
          </span>
        </footer>
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
