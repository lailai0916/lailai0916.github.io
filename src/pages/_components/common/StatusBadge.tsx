import React from 'react';
import { COLORS } from './constants';

interface StatusBadgeProps {
  status: string;
  variant?: 'default' | 'compact';
}

export default function StatusBadge({ status, variant = 'default' }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case '维护中':
      case '进行中':
      case '已完成':
        return COLORS.SUCCESS;
      case '展示中':
      case '探索中':
      case '创新思维':
        return COLORS.PURPLE;
      case '深化中':
      case '职业理念':
        return COLORS.INFO;
      case '学习中':
      case '技术态度':
        return COLORS.WARNING;
      default:
        return COLORS.DEFAULT;
    }
  };

  const sizeClass = variant === 'compact' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-0.5 text-xs';

  return (
    <span className={`inline-flex items-center ${sizeClass} rounded-full font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
} 
