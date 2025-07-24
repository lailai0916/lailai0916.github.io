import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';

const TITLE = '防空塔';
const DESCRIPTION = '防空塔小游戏';

export default function Games(): ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 60px)',
          overflow: 'hidden',
        }}
      >
        <iframe
          src="/games/power/index.html"
          title={TITLE}
          style={{ border: 'none', width: '100%', height: '100%' }}
        />
      </div>
    </Layout>
  );
}
