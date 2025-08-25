import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

const TITLE = 'Data';
const DESCRIPTION = 'Data Page';

// Kuma 域名
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
        fetch(`${KUMA}/api/status-page/monitor`, { signal, cache: 'no-store' }),
        fetch(`${KUMA}/api/status-page/heartbeat/monitor`, {
          signal,
          cache: 'no-store',
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
    const timer = setInterval(() => load(ac.signal), 5 * 60 * 1000);
    return () => {
      ac.abort();
      clearInterval(timer);
    };
  }, [load]);

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
      <main className={styles.container}>
        <h1 className={styles.header}>
          <span>网站状态</span>
          <button
            onClick={() => load()}
            disabled={loading}
            className={styles.refreshBtn}
            aria-label="手动刷新"
            title="手动刷新"
          >
            {loading ? '加载中…' : '刷新'}
          </button>
          {updatedAt && (
            <span className={styles.updatedAt}>
              上次更新：{new Date(updatedAt).toLocaleString()}
            </span>
          )}
        </h1>

        {err && <div className={styles.error}>{err}</div>}

        {loading && !latest.length ? (
          <div className={styles.dim}>加载中…</div>
        ) : latest.length ? (
          <ul className={styles.list}>
            {latest.map(({ id, last }) => {
              const status = STATUS[Number(last.status)] ?? 'UNKNOWN';
              const upPct = hb.uptimeList?.[id];
              return (
                <li key={id} className={styles.item}>
                  <span
                    aria-label={status}
                    title={status}
                    className={styles.dot}
                    style={{ background: dotColor(Number(last.status)) }}
                  />
                  <div className={styles.nameWrap}>
                    <strong>{names[id] ?? `Monitor #${id}`}</strong>
                    <span className={styles.metaSmall}>
                      {typeof last.ping === 'number'
                        ? `${last.ping} ms`
                        : (last.msg ?? '')}
                    </span>
                  </div>
                  <span className={styles.statusText}>
                    {status}
                    {typeof upPct === 'number' && (
                      <span className={styles.uptime}>
                        · Uptime {(upPct * 100).toFixed(2)}%
                      </span>
                    )}
                  </span>
                  <span className={styles.time}>
                    {new Date(toMs(last.time)).toLocaleString()}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={styles.dim}>暂无数据</div>
        )}

        <div className={styles.note}>
          注：每 5 分钟自动刷新一次（遵守缓存）。如需展示私有监控，请在 Kuma
          端开启公开状态页或处理 CORS。
        </div>
      </main>
    </Layout>
  );
}
