import React, { useMemo, useState, useCallback } from 'react';

export default function Desmos({ id }: { id: string }) {
  const [nonce, setNonce] = useState(0);
  const src = useMemo(
    () => `https://www.desmos.com/calculator/${id}?embed&t=${nonce}`,
    [id, nonce]
  );
  const refresh = useCallback(() => setNonce((n) => n + 1), []);

  return (
    <>
      <div style={{ marginBottom: '0.25rem' }}>
        <button
          className="button button--sm button--secondary"
          onClick={refresh}
        >
          重制
        </button>
      </div>
      <iframe
        src={src}
        title="Desmos"
        style={{
          border: '1px solid #ccc',
          width: 'min(100%, 500px)',
          aspectRatio: '1 / 1',
        }}
      />
    </>
  );
}
