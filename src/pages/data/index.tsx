import React from 'react';
import Layout from '@theme/Layout';

const TITLE = 'Data';
const DESCRIPTION = 'Data Page';

type Beat = {
  time: string | number;
  status: number;
  ping?: number;
  msg?: string;
};
type RespHB = {
  heartbeatList: Record<string, Beat[]>;
  uptimeList?: Record<string, number>;
};
type RespConf = {
  publicGroupList?: { monitorList?: { id: number | string; name: string }[] }[];
};

const STATUS = ['DOWN', 'UP', 'PENDING', 'MAINTENANCE'] as const;
const dotColor = (s: number) =>
  s === 1 ? '#16a34a' : s === 0 ? '#ef4444' : s === 3 ? '#3b82f6' : '#f59e0b';
const toMs = (t: number | string) => {
  const n = typeof t === 'string' ? Date.parse(t) : t;
  return n < 1e12 ? n * 1000 : n;
};

export default function StatusPage(): JSX.Element {
  const [hb, setHb] = React.useState<RespHB>({ heartbeatList: {} });
  const [names, setNames] = React.useState<Record<string, string>>({});
  const [err, setErr] = React.useState('');

  React.useEffect(() => {
    const ac = new AbortController();
    const load = async () => {
      try {
        const [confR, hbR] = await Promise.all([
          fetch('https://status.lailai.one/api/status-page/monitor', {
            signal: ac.signal,
          }),
          fetch('https://status.lailai.one/api/status-page/heartbeat/monitor', {
            signal: ac.signal,
          }),
        ]);
        if (!confR.ok || !hbR.ok)
          throw new Error(`HTTP ${confR.status}/${hbR.status}`);
        const conf = (await confR.json()) as RespConf;
        const hbj = (await hbR.json()) as RespHB;

        const map: Record<string, string> = {};
        conf.publicGroupList?.forEach((g) =>
          g.monitorList?.forEach((m) => {
            map[String(m.id)] = m.name;
          })
        );

        setNames(map);
        setHb(hbj);
        setErr('');
      } catch (e: any) {
        if (e.name !== 'AbortError')
          setErr('加载失败（可能是 CORS 未配置好）：' + e.message);
      }
    };

    load();
    const timer = setInterval(load, 5 * 60 * 1000); // 遵守5分钟缓存
    return () => {
      ac.abort();
      clearInterval(timer);
    };
  }, []);

  const latest = Object.entries(hb.heartbeatList)
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
                  background: dotColor(Number(last.status)),
                }}
              />
              <strong>{names[id] ?? `Monitor #${id}`}</strong>
              <span style={{ opacity: 0.7 }}>
                {typeof last.ping === 'number'
                  ? `${last.ping} ms`
                  : (last.msg ?? '')}
              </span>
              <span style={{ marginLeft: 'auto', opacity: 0.7, fontSize: 12 }}>
                {STATUS[Number(last.status)] ?? 'UNKNOWN'}
              </span>
              <span style={{ marginLeft: 12, opacity: 0.6, fontSize: 12 }}>
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
