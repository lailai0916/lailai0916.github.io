import React from 'react';

interface Status {
  text: string;
  color: string;
}

interface StatusBadgeProps {
  status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  if (!status || !status.text || !status.color) {
    // 静默处理无效状态
    return null;
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}
    >
      {status.text}
    </span>
  );
}
