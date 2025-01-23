import React from 'react';

export default function Desmos({url}: {url: string}): JSX.Element {
  return (
    <div>
      <iframe
        src={`https://www.desmos.com/calculator/${url}?embed`}
        title="Desmos"
        style={{
          border: '1px solid #ccc',
          width: '100%',
          maxWidth: '400px',
          height: 'auto',
          aspectRatio: '1 / 1',
        }}
      />
    </div>
  );
}
