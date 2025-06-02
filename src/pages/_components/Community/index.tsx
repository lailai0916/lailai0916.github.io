import React from 'react';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import { COMMUNITY_LINKS } from '@site/src/data/community';

export default function Community() {
  return (
    <div className="py-16 w-full flex flex-col items-center bg-gray-50/50 dark:bg-gray-800/30">
      <div className="max-w-7xl mx-auto px-5 w-full">
        <div className="w-full">
          <div className="w-full">
            <h2 className="text-center mb-8 text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
              我的社区
            </h2>
          </div>
        </div>
        
        {/* 社区图标网格容器 */}
        <div className="flex gap-8 justify-center w-fit mx-auto max-md:grid max-md:grid-cols-4 max-[400px]:grid-cols-2">
          {COMMUNITY_LINKS.map((link, idx) => (
            <div key={idx} className="flex justify-center items-center w-full h-full">
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                title={link.label}
                className="p-3 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:scale-110 active:scale-95 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                <Icon 
                  icon={link.icon} 
                  width="32" 
                  height="32" 
                  className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors duration-200"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
