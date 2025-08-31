import React from 'react';

export default function Desmos({ id }: { id: string }) {
  const url = `https://www.desmos.com/calculator/${id}?embed`;

  return (
    <iframe
      src={url}
      title="Desmos"
      style={{
        border: '1px solid #ccc',
        width: 'min(100%, 500px)',
        aspectRatio: '1 / 1',
      }}
    />
  );
}
