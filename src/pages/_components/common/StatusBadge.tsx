import React from 'react';
import { STATUS_COLORS } from './constants';

interface StatusBadgeProps {
  status: string;
}

// 状态映射配置
const STATUS_MAP = {
  '维护中': { color: STATUS_COLORS.ORANGE, text: '维护中' },
  '已完成': { color: STATUS_COLORS.GREEN, text: '已完成' },
  '展示中': { color: STATUS_COLORS.BLUE, text: '展示中' },
  '敬请期待': { color: STATUS_COLORS.BLUE, text: '敬请期待' },
  '进行中': { color: STATUS_COLORS.ORANGE, text: '进行中' },
  '深化中': { color: STATUS_COLORS.PURPLE, text: '深化中' },
  '探索中': { color: STATUS_COLORS.BLUE, text: '探索中' },
  '学习中': { color: STATUS_COLORS.GREEN, text: '学习中' },
  '创新思维': { color: STATUS_COLORS.PURPLE, text: '创新思维' },
  '职业理念': { color: STATUS_COLORS.GREEN, text: '职业理念' },
  '技术态度': { color: STATUS_COLORS.BLUE, text: '技术态度' }
} as const;

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = STATUS_MAP[status as keyof typeof STATUS_MAP];
  
  if (!statusConfig) {
    // 静默处理未知状态
    return null;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
      {statusConfig.text}
    </span>
  );
} 
