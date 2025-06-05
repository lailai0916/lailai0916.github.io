import React from 'react';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import { COMMUNITY_LINKS } from '@site/src/data/community';

function CommunityCard({ href, label, icon }: {
  href: string;
  label: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full w-full rounded-2xl outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 no-underline hover:no-underline"
      style={{ textDecoration: 'none' }}
    >
      <article className="relative overflow-hidden p-6 cursor-pointer w-full h-full flex flex-col items-center justify-center bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800/50 rounded-2xl transition-all duration-200 ease-out shadow-sm hover:shadow-lg dark:shadow-none border border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600">
        <div className="flex flex-col items-center space-y-3">
          <div className="group-hover:scale-110 transition-transform duration-200">
            <Icon 
              icon={icon} 
              width="40" 
              height="40" 
              className="text-gray-700 dark:text-gray-300 transition-colors duration-200"
              style={{
                color: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--ifm-color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'inherit';
              }}
            />
          </div>
          <h3 className="font-medium text-sm text-gray-900 dark:text-neutral-100 text-center leading-snug">
            {label}
          </h3>
        </div>
      </article>
    </Link>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex flex-col w-full max-w-7xl">
      <div className="flex-col gap-2 flex grow w-full my-16 lg:my-24 mx-auto items-center">
        {children}
      </div>
    </div>
  );
}

export default function Community() {
  return (
    <Section>
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <div className="text-center mb-12">
          <h2 className="font-bold text-4xl text-gray-900 dark:text-neutral-100 leading-tight mb-4">
            我的社区
          </h2>
          <p className="text-lg lg:text-xl text-gray-700 dark:text-neutral-300 leading-relaxed max-w-3xl mx-auto">
            在数字世界中建立连接，分享知识与经验，共同成长与进步
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 max-w-4xl mx-auto">
          {COMMUNITY_LINKS.map((link, idx) => (
            <div key={idx} className="h-full">
              <CommunityCard {...link} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
