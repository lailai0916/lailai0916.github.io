import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'compact';
}

export default function StatusBadge({ status, variant = 'default' }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case '维护中':
      case '进行中':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case '已完成':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case '展示中':
      case '探索中':
        return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20';
      case '深化中':
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case '学习中':
        return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const sizeClass = variant === 'compact' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-0.5 text-xs';

  return (
    <span className={`inline-flex items-center ${sizeClass} rounded-full font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
} 
