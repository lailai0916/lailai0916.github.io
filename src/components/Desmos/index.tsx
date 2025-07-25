import React from 'react';

const Desmos = ({
  url,
  type = 'calculator',
}: {
  url: string;
  type?: string;
}) => {
  return (
    <iframe
      src={`https://www.desmos.com/${type}/${url}?embed`}
      title="Desmos"
      style={{
        border: '1px solid #ccc',
        width: 'min(100%, 500px)',
        aspectRatio: '1 / 1',
      }}
    />
  );
};

export default Desmos;
