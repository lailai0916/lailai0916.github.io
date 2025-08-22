import React from 'react';

export default function Desmos({ url }: { url: string }) {
  return (
    <iframe
      src={`https://www.desmos.com/calculator/${url}?embed`}
      title="Desmos"
      style={{
        border: '1px solid #ccc',
        width: 'min(100%, 500px)',
        aspectRatio: '1 / 1',
      }}
    />
  );
}
