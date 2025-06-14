import React from 'react';

const favoriteQuotes = [
  {
    quote: 'Stay hungry. Stay foolish.',
    author: 'Steve Jobs',
    context: '斯坦福大学毕业典礼演讲',
    category: '创新思维'
  },
  {
    quote: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    context: '关于工作与热情',
    category: '职业理念'
  },
  {
    quote: 'Talk is cheap. Show me the code.',
    author: 'Linus Torvalds',
    context: 'Linux 之父的编程哲学',
    category: '技术态度'
  },
];

function QuoteCard({ quote, author, context, category }: {
  quote: string;
  author: string;
  context: string;
  category: string;
}) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case '创新思维': return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20';
      case '职业理念': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case '技术态度': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <article className="group relative overflow-hidden p-6 w-full h-full flex flex-col bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800/50 rounded-2xl transition-all duration-200 ease-out shadow-sm hover:shadow-lg dark:shadow-none border border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600">
      <div className="flex-1 flex flex-col justify-between space-y-4">
        <header className="space-y-4">
          <div className="flex justify-start">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
              {category}
            </span>
          </div>
          <blockquote className="relative border-l-0" style={{ borderLeft: 'none' }}>
            <svg
              className="absolute -top-2 -left-2 w-8 h-8 text-gray-200 dark:text-neutral-700"
              fill="currentColor"
              viewBox="0 0 32 32"
            >
              <path d="M10 8C6.691 8 4 10.691 4 14v10c0 3.309 2.691 6 6 6h6v-8h-6v-6h6V8h-6zM26 8c-3.309 0-6 2.691-6 6v10c0 3.309 2.691 6 6 6h6v-8h-6v-6h6V8h-6z"/>
            </svg>
            <p className="relative text-lg lg:text-xl font-medium text-gray-900 dark:text-neutral-100 leading-relaxed pl-6">
              {quote}
            </p>
          </blockquote>
        </header>
        <footer className="space-y-2 pt-4 border-t border-gray-100 dark:border-neutral-800">
          <div className="text-right">
            <p className="font-semibold text-gray-900 dark:text-neutral-100">
              — {author}
            </p>
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              {context}
            </p>
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

export default function Quote() {
  return (
    <Section background="alt">
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <div className="text-center mb-12">
          <h2 className="font-bold text-4xl text-gray-900 dark:text-neutral-100 leading-tight mb-4">
            思想启迪
          </h2>
          <p className="text-lg lg:text-xl text-gray-700 dark:text-neutral-300 leading-relaxed max-w-3xl mx-auto">
            智者的话语如明灯，照亮前行的道路。这些箴言见证着思想的力量
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteQuotes.map((item, idx) => (
            <div key={idx} className="h-full">
              <QuoteCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
