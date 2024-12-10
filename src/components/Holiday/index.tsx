import React from 'react';

export default function Holiday({ text }: { text: string }): JSX.Element {
  const holidayTextStyle: React.CSSProperties = {
    background: 'linear-gradient(to right, #0090f7, #ba62fc, #f2416b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
  return (
    <span style={holidayTextStyle}>
      {text}
    </span>
  );
}
