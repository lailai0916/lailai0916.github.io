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
      className={`--tw-inline-flex --tw-items-center --tw-px-2.5 --tw-py-0.5 --tw-rounded-full --tw-text-xs --tw-font-medium ${status.color}`}
    >
      {status.text}
    </span>
  );
}
