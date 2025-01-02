import React from 'react';

export function Holiday({ text }: { text: string }): JSX.Element {
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

export function Vip({ text }: { text: string }): JSX.Element {
  const vipTextStyle: React.CSSProperties = {
    background: 'linear-gradient(to right, #7f591e, #8e651e, #b69332)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
  return (
    <span style={vipTextStyle}>
      {text}
    </span>
  );
}
