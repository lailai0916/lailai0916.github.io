import React, { ReactNode } from 'react';
import styles from './styles.module.css';

interface TextStyleProps {
  children: ReactNode;
  style: string;
}

const styleMap: { [key: string]: string } = {
  holiday: styles.holidayTextStyle,
  vip: styles.vipTextStyle,
  other: styles.otherTextStyle,
};

export default function TextStyle({ children, style }: TextStyleProps): JSX.Element {
  const className = styleMap[style] || '';
  return (
    <span className={className}>
      {children}
    </span>
  );
}
