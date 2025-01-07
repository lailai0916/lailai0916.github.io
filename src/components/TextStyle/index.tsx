import React from 'react';
import styles from './styles.module.css';

interface TextStyleProps {
  text: string;
  style: string;
}

const styleMap: { [key: string]: string } = {
  holiday: styles.holidayTextStyle,
  vip: styles.vipTextStyle,
  other: styles.otherTextStyle,
};

export default function TextStyle({ text, style }: TextStyleProps): JSX.Element {
  const className = styleMap[style] || '';
  return (
    <span className={className}>
      {text}
    </span>
  );
}
