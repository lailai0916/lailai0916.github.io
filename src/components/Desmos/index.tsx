import React from 'react';

export default function Desmos({url}: {url: string}): JSX.Element {
  return (
    <div>
      <iframe
        src={url}
        title={url}
        style={{
          border: '1px solid #ccc',
          width: '100%',
          maxWidth: '400px',
          height: 'auto',
          aspectRatio: '1 / 1',
          maxHeight: '400px',
        }}
      />
    </div>
  );
}
