import React from 'react';
import Layout from '@theme/Layout';

const TITLE = 'Data';
const DESCRIPTION = 'Data Page';

type Beat = {
  time: number | string;
  status: number;
  ping?: number;
  msg?: string;
};
type Resp = {
  heartbeatList: Record<string, Beat[]>;
  uptimeList?: Record<string, number>;
};

const dotColor = (s: number) =>
  s === 1 ? '#16a34a' : s === 0 ? '#ef4444' : '#f59e0b';
const toMs = (t: number | string) => {
  const n = typeof t === 'string' ? Date.parse(t) : t;
  return n < 1e12 ? n * 1000 : n;
};

export default function StatusPage() {
  const [data, setData] = React.useState<Resp>({ heartbeatList: {} });
  const [err, setErr] = React.useState('');

  React.useEffect(() => {
    const ac = new AbortController();
    fetch('https://status.lailai.one/api/status-page/heartbeat/monitor', {
      signal: ac.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((d: Resp) => setData(d))
      .catch(
        (e) =>
          e.name !== 'AbortError' &&
          setErr('加载失败（可能是 CORS 未配置好）：' + e.message)
      );
    return () => ac.abort();
  }, []);

  const latest = Object.entries(data.heartbeatList)
    .map(([id, arr]) => (arr?.[0] ? { id, last: arr[0] } : null))
    .filter((x): x is { id: string; last: Beat } => !!x)
    .sort((a, b) => toMs(b.last.time) - toMs(a.last.time));

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
                  background: dotColor(last.status),
                }}
              />
              <strong>Monitor #{id}</strong>
              <span style={{ opacity: 0.7 }}>
                {typeof last.ping === 'number'
                  ? `${last.ping} ms`
                  : (last.msg ?? '')}
              </span>
              <span style={{ marginLeft: 'auto', opacity: 0.6, fontSize: 12 }}>
                {new Date(toMs(last.time)).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
        {!latest.length && <div style={{ opacity: 0.6 }}>暂无数据</div>}
      </main>
    </Layout>
  );
}
