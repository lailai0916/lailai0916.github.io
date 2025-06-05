import React from 'react';

const exploringItems = [
  { 
    name: '算法竞赛', 
    icon: '🏆', 
    description: '参与算法竞赛，深入学习数据结构与算法，提升逻辑思维能力与问题解决技巧。',
    progress: '进行中',
    skills: ['数据结构', '算法优化', '竞赛策略']
  },
  { 
    name: 'Docusaurus', 
    icon: '📖', 
    description: '使用 Docusaurus 构建统一、简约、现代的个人网站，探索文档工程化的最佳实践。',
    progress: '深化中',
    skills: ['React', 'TypeScript', 'MDX']
  },
  { 
    name: 'AI 模型', 
    icon: '🤖', 
    description: '深入探索人工智能模型的工作原理，实践机器学习技术在实际场景中的应用。',
    progress: '探索中',
    skills: ['机器学习', '深度学习', '模型部署']
  },
  { 
    name: '英语语法', 
    icon: '📝', 
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
  const getProgressColor = (progress: string) => {
    switch (progress) {
      case '进行中': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case '深化中': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case '探索中': return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20';
      case '学习中': return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <article className="group relative overflow-hidden p-6 w-full h-full flex flex-col bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800/50 rounded-2xl transition-all duration-200 ease-out shadow-sm hover:shadow-lg dark:shadow-none border border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600">
      <div className="flex-1 space-y-4">
        <header className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl group-hover:scale-110 transition-transform duration-200">
                {icon}
              </div>
              <div>
                <h3 className="font-semibold text-xl text-gray-900 dark:text-neutral-100 leading-snug">
                  {name}
                </h3>
              </div>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getProgressColor(progress)}`}>
              {progress}
            </span>
          </div>
          <p className="text-gray-600 dark:text-neutral-300 leading-relaxed">
            {description}
          </p>
        </header>
        <footer className="pt-2">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300"
              >
                {skill}
              </span>
            ))}
          </div>
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

export default function Exploration() {
  return (
    <Section background={null}>
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <div className="text-center mb-12">
          <h2 className="font-bold text-4xl text-gray-900 dark:text-neutral-100 leading-tight mb-4">
            当前探索
          </h2>
          <p className="text-lg lg:text-xl text-gray-700 dark:text-neutral-300 leading-relaxed max-w-3xl mx-auto">
            保持好奇心，不断探索新领域。每一次学习都是对未知世界的勇敢探索
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exploringItems.map((item, idx) => (
            <div key={idx} className="h-full">
              <ExplorationCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
