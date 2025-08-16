import React from 'react';

interface GridLayoutProps {
  children: React.ReactNode;
  columns?: string;
  gap?: string;
  className?: string;
}

export default function GridLayout({
  children,
  columns = '--tw-grid-cols-1 md:--tw-grid-cols-2 lg:--tw-grid-cols-3',
  gap = '--tw-gap-6',
  className = '',
}: GridLayoutProps) {
  return (
    <div className={`--tw-grid ${columns} ${gap} ${className}`}>{children}</div>
  );
}

// 预定义的常用网格配置
export const GridConfigs = {
  // 社区网格：2-3-4-6-8列
  community:
    '--tw-grid-cols-2 sm:--tw-grid-cols-3 md:--tw-grid-cols-4 lg:--tw-grid-cols-6 xl:--tw-grid-cols-8',

  // 技能网格：2-3-4-6列
  skills:
    '--tw-grid-cols-2 sm:--tw-grid-cols-3 md:--tw-grid-cols-4 lg:--tw-grid-cols-6',

  // 项目网格：1-2-3列
  projects: '--tw-grid-cols-1 md:--tw-grid-cols-2 lg:--tw-grid-cols-3',

  // 探索网格：1-2列
  exploration: '--tw-grid-cols-1 md:--tw-grid-cols-2',

  // 引言网格：1-2-3列
  quotes: '--tw-grid-cols-1 md:--tw-grid-cols-2 lg:--tw-grid-cols-3',
} as const;
