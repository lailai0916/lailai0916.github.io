import React from 'react';
import Layout from '@theme/Layout';

const TITLE = 'Data';
const DESCRIPTION = 'Data Page';

// 配置：你的 Kuma 域名（末尾不带 /）
const KUMA = 'https://status.lailai.one';

type Beat = {
  time: string | number;
  status: number; // 0 DOWN, 1 UP, 2 PENDING, 3 MAINTENANCE
  ping?: number;
  msg?: string;
};
type RespHB = {
  heartbeatList: Record<string, Beat[]>;
  uptimeList?: Record<string, number>; // 0~1
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
  const [loading, setLoading] = React.useState(true);
  const [updatedAt, setUpdatedAt] = React.useState<number | null>(null);

  const load = React.useCallback(async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      const [confR, hbR] = await Promise.all([
        fetch(`${KUMA}/api/status-page/monitor`, { signal }),
        fetch(`${KUMA}/api/status-page/heartbeat/monitor`, { signal }),
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
      setUpdatedAt(Date.now());
    } catch (e: any) {
      if (e?.name !== 'AbortError') {
        setErr(
          '加载失败（可能是未登录公开页或 CORS 未配置）：' + (e?.message ?? '')
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    const ac = new AbortController();
    load(ac.signal);

    const timer = setInterval(() => load(ac.signal), 5 * 60 * 1000); // 5 分钟刷新
    return () => {
      ac.abort();
      clearInterval(timer);
    };
  }, [load]);

  // 取每个监控的“最新一次心跳”（按 time 最大值而非数组第 0 项，避免顺序不稳）
  const latest = React.useMemo(() => {
    const list: { id: string; last: Beat }[] = [];
    for (const [id, arr] of Object.entries(hb.heartbeatList)) {
      if (!arr?.length) continue;
      const last = arr.reduce(
        (best, cur) => (toMs(cur.time) > toMs(best.time) ? cur : best),
        arr[0]
      );
      list.push({ id, last });
    }
    list.sort((a, b) => toMs(b.last.time) - toMs(a.last.time));
    return list;
  }, [hb]);

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          网站状态
          <button
            onClick={() => load()}
            disabled={loading}
            style={{
              padding: '4px 10px',
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              background: '#fff',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 12,
            }}
            aria-label="手动刷新"
            title="手动刷新"
          >
            {loading ? '加载中…' : '刷新'}
          </button>
          {updatedAt && (
            <span style={{ marginLeft: 'auto', opacity: 0.6, fontSize: 12 }}>
              上次更新：{new Date(updatedAt).toLocaleString()}
            </span>
          )}
        </h1>

        {err && <div style={{ color: '#ef4444', marginBottom: 12 }}>{err}</div>}

        {loading && !latest.length ? (
          <div style={{ opacity: 0.6 }}>加载中…</div>
        ) : latest.length ? (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {latest.map(({ id, last }) => {
              const status = STATUS[Number(last.status)] ?? 'UNKNOWN';
              const upPct = hb.uptimeList?.[id];
              return (
                <li
                  key={id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto auto',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 0',
                    borderBottom: '1px solid #f3f4f6',
                  }}
                >
                  <span
                    aria-label={status}
                    title={status}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: dotColor(Number(last.status)),
                    }}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <strong>{names[id] ?? `Monitor #${id}`}</strong>
                    <span style={{ opacity: 0.7, fontSize: 12 }}>
                      {typeof last.ping === 'number'
                        ? `${last.ping} ms`
                        : (last.msg ?? '')}
                    </span>
                  </div>
                  <span style={{ opacity: 0.7, fontSize: 12 }}>
                    {status}
                    {typeof upPct === 'number' && (
                      <span style={{ marginLeft: 8 }}>
                        · Uptime {(upPct * 100).toFixed(2)}%
                      </span>
                    )}
                  </span>
                  <span style={{ opacity: 0.6, fontSize: 12 }}>
                    {new Date(toMs(last.time)).toLocaleString()}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <div style={{ opacity: 0.6 }}>暂无数据</div>
        )}

        <div style={{ marginTop: 16, opacity: 0.6, fontSize: 12 }}>
          注：每 5 分钟自动刷新一次（遵守缓存）。如需展示私有监控，请在 Kuma
          端开启公开状态页或处理 CORS。
        </div>
      </main>
    </Layout>
  );
}
