import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';

const TITLE = 'Data';
const DESCRIPTION = 'Data';

type Beat = { time: number; status: number; ping?: number; msg?: string };
type Resp = Record<string, Beat[]>; // key: monitorId, val: 心跳数组（新到旧）

function dotColor(s: number) {
  // 1=Up, 0=Down，其它=未知/限流
  return s === 1 ? '#16a34a' : s === 0 ? '#ef4444' : '#f59e0b';
}

export default function StatusPage(): ReactNode {
  const [beats, setBeats] = React.useState<Resp>({});
  const [err, setErr] = React.useState<string>('');

  React.useEffect(() => {
    fetch('https://status.lailai.one/api/status-page/heartbeat/monitor')
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then(setBeats)
      .catch((e) => setErr('加载失败（可能是 CORS 未配置好）：' + e.message));
  }, []);

  // 取每个监控的最近一次心跳
  const latest = Object.entries(beats)
    .map(([id, arr]) => ({ id, last: arr?.[0] }))
    .filter((x) => x.last);

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
        <h1>网站状态</h1>
        {err && <div style={{ color: '#ef4444', marginBottom: 12 }}>{err}</div>}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {latest.map(({ id, last }) => (
            <li
              key={id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                margin: '10px 0',
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: dotColor(last!.status),
                }}
              />
              <strong>Monitor #{id}</strong>
              <span style={{ opacity: 0.7 }}>
                {typeof last!.ping === 'number'
                  ? `${last!.ping} ms`
                  : last!.msg || ''}
              </span>
              <span style={{ marginLeft: 'auto', opacity: 0.6, fontSize: 12 }}>
                {new Date(last!.time).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
        {!latest.length && <div style={{ opacity: 0.6 }}>暂无数据</div>}
      </main>
    </Layout>
  );
}
