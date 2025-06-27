import React from 'react';
import { STATUS_COLORS } from './constants';

interface StatusBadgeProps {
  status: string;
}

// 状态映射配置
const STATUS_MAP = {
  'completed': { color: STATUS_COLORS.GREEN, text: '已完成' },
  'in-progress': { color: STATUS_COLORS.ORANGE, text: '进行中' },
  'planning': { color: STATUS_COLORS.BLUE, text: '规划中' },
  'experimental': { color: STATUS_COLORS.PURPLE, text: '实验性' },
  'archived': { color: STATUS_COLORS.GRAY, text: '已归档' }
} as const;

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = STATUS_MAP[status as keyof typeof STATUS_MAP];
  
  if (!statusConfig) {
    console.warn(`Unknown status: ${status}`);
    return null;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
      {statusConfig.text}
    </span>
  );
} 
