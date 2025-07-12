import React from 'react';

interface GridLayoutProps {
  children: React.ReactNode;
  columns?: string;
  gap?: string;
  className?: string;
}

export default function GridLayout({
  children,
  columns = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  gap = 'gap-6',
  className = '',
}: GridLayoutProps) {
  return (
    <div className={`grid ${columns} ${gap} ${className}`}>{children}</div>
  );
}

// 预定义的常用网格配置
export const GridConfigs = {
  // 设备网格：2-3-3列
  devices:
    'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3',

  // 社区网格：2-3-4-6-8列
  community:
    'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8',

  // 技能网格：2-3-4-6列
  skills: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',

  // 项目网格：1-2-3列
  projects: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',

  // 探索网格：1-2列
  exploration: 'grid-cols-1 md:grid-cols-2',

  // 引言网格：1-2-3列
  quotes: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',

  // 统计网格：1-3列
  stats: 'grid-cols-1 sm:grid-cols-3',
} as const;
