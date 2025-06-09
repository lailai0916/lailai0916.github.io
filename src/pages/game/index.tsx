import React from 'react';
import Layout from '@theme/Layout';

export default function GamePage() {
  return (
    <Layout title="防空塔" description="防空塔">
      <div style={{ width: '100%', height: 'calc(100vh - 60px)', overflow: 'hidden' }}>
        <iframe
          src="/power/index1.html"
          title="防空塔"
          style={{ border: 'none', width: '100%', height: '100%' }}
        />
      </div>
    </Layout>
  );
} 
