import React from 'react';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

const TITLE = 'Data';
const DESCRIPTION = 'Data Page';

// Kuma 域名（方法1：前端直连公开 API）
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
  publicGroupList?: {
    name?: string;
    monitorList?: { id: number | string; name: string }[];
  }[];
};

const STATUS = ['DOWN', 'UP', 'PENDING', 'MAINTENANCE'] as const;
const dotColor = (s: number) =>
  s === 1 ? '#16a34a' : s === 0 ? '#ef4444' : s === 3 ? '#3b82f6' : '#f59e0b';

const toMs = (t: number | string) => {
  const n = typeof t === 'string' ? Date.parse(t) : t;
  return n < 1e12 ? n * 1000 : n;
};

// 解析 msg 中的证书到期天数（如 "Cert Exp.: 50 days"）
const parseCertDays = (msg?: string) => {
  if (!msg) return null;
  const m = msg.match(/cert\s*exp\.?\s*:\s*(\d+)\s*days?/i);
  return m ? parseInt(m[1], 10) : null;
};

function lastChangeInfo(arr: Beat[]) {
  if (!arr?.length) return null;
  const srt = [...arr].sort((a, b) => toMs(b.time) - toMs(a.time));
  const cur = srt[0];
  const curS = Number(cur.status);
  let pivot = 0;
  while (pivot < srt.length && Number(srt[pivot].status) === curS) pivot++;
  const since = toMs(srt[Math.max(0, pivot - 1)].time);
  const durMs = Date.now() - since;
  return { since, durMs };
}

function pingStats(arr: Beat[]) {
  const v = arr
    .filter((b) => Number(b.status) === 1 && typeof b.ping === 'number')
    .map((b) => b.ping as number)
    .sort((a, b) => a - b);
  if (!v.length) return null;
  const avg = Math.round(v.reduce((a, b) => a + b, 0) / v.length);
  const p90 =
    v[Math.min(v.length - 1, Math.max(0, Math.floor(v.length * 0.9) - 1))];
  return { avg, p90 };
}

function Spark({ arr }: { arr: Beat[] }) {
  if (!arr?.length) return null;
  const last20 = [...arr]
    .sort((a, b) => toMs(a.time) - toMs(b.time))
    .slice(-20);
  const h = 14,
    w = 70,
    n = last20.length;
  const step = n > 1 ? w / (n - 1) : w;
  const pts = last20
    .map((b, i) => `${i * step},${Number(b.status) === 1 ? 2 : h - 2}`)
    .join(' ');
  return (
    <svg width={w} height={h} className={styles.spark} aria-hidden="true">
      <polyline
        points={pts}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function StatusPage(): JSX.Element {
  const [hb, setHb] = React.useState<RespHB>({ heartbeatList: {} });
  const [conf, setConf] = React.useState<RespConf>({});
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

      const confJ = (await confR.json()) as RespConf;
      const hbJ = (await hbR.json()) as RespHB;

      const map: Record<string, string> = {};
      confJ.publicGroupList?.forEach((g) =>
        g.monitorList?.forEach((m) => {
          map[String(m.id)] = m.name;
        })
      );

      setConf(confJ);
      setNames(map);
      setHb(hbJ);
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

  // 最新心跳（每个 id 取 time 最大）
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

  // 汇总
  const summary = React.useMemo(() => {
    const s = { total: latest.length, up: 0, down: 0, pending: 0, maint: 0 };
    latest.forEach(({ last }) => {
      const v = Number(last.status);
      if (v === 1) s.up++;
      else if (v === 0) s.down++;
      else if (v === 2) s.pending++;
      else if (v === 3) s.maint++;
    });
    return s;
  }, [latest]);

  // 分组
  const grouped = React.useMemo(() => {
    const groups: { name: string; items: string[] }[] = [];
    const rest: string[] = [];
    const idSet = new Set(Object.keys(hb.heartbeatList));

    (conf.publicGroupList ?? []).forEach((g, idx) => {
      const gname = g.name || `分组 ${idx + 1}`;
      const ids = (g.monitorList ?? [])
        .map((m) => String(m.id))
        .filter((id) => idSet.has(id));
      if (ids.length) groups.push({ name: gname, items: ids });
      ids.forEach((id) => idSet.delete(id));
    });

    idSet.forEach((id) => rest.push(id));
    if (rest.length) groups.push({ name: '其他', items: rest });

    groups.forEach((g) =>
      g.items.sort((a, b) => (names[a] ?? a).localeCompare(names[b] ?? b))
    );
    return groups;
  }, [conf, hb, names]);

  const renderItem = (id: string) => {
    const last = latest.find((x) => x.id === id)?.last;
    if (!last) return null;
    const hist = hb.heartbeatList[id] ?? [];
    const status = STATUS[Number(last.status)] ?? 'UNKNOWN';
    const upPct = hb.uptimeList?.[id];
    const change = lastChangeInfo(hist);
    const stats = pingStats(hist);
    const certDays = parseCertDays(last.msg);

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
            {stats && (
              <>
                {' '}
                · {stats.avg}ms avg / {stats.p90}ms p90
              </>
            )}
            {typeof certDays === 'number' && <> · Cert Exp.: {certDays} days</>}
            {change && (
              <>
                {' '}
                · 已持续 {Math.max(1, Math.round(change.durMs / 60000))} 分钟
              </>
            )}
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
        <Spark arr={hist} />
      </li>
    );
  };

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

        <div className={styles.summary}>
          <span>总数 {summary.total}</span>
          <span className={styles.ok}>UP {summary.up}</span>
          <span className={styles.bad}>DOWN {summary.down}</span>
          <span>PENDING {summary.pending}</span>
          <span>MAINT {summary.maint}</span>
        </div>

        {err && <div className={styles.error}>{err}</div>}

        {loading && !latest.length ? (
          <div className={styles.dim}>加载中…</div>
        ) : latest.length ? (
          <div className={styles.groupWrap}>
            {grouped.map((g) => (
              <section key={g.name} className={styles.group}>
                <h2 className={styles.groupTitle}>
                  {g.name}
                  <span className={styles.groupMeta}>（{g.items.length}）</span>
                </h2>
                <ul className={styles.list}>
                  {g.items.map((id) => renderItem(id))}
                </ul>
              </section>
            ))}
          </div>
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
