import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Card from '@site/src/components/laikit/widget/Card';
import styles from './styles.module.css';

const WEBSITE_ID = '69d3b7de-90e4-4be4-a355-633620ecefdb';
const ANALYTICS_BASE_URL = `https://analytics.lailai.one/api/websites/${WEBSITE_ID}/stats`;
const Authorization =
  'Bearer mXASurmA0JxF4bm+aeWM458Rk3hKZJUoYm4aSFdVUp1LzlZ96vwe2RcV6b19yqwgwmPIo3q2jvqLlBqLhNrkW+AlPZ/CgTIfAkeMrg+NWpcYD9waQRngwntf5maKEt/oBwKm9C3wd3dCm7m0BSXddT8q8vDMYSRYeJ+tcwkcbEOCtsgAHs28V+qT30mGz6yCh02gctP3RrPDeIvq3A4az1n87MlUZDiLxI8YwX8aVhSOml6WKnKtFOWgqTCXt9si79sLuw8vWT+FySCkes47gl0JlgOz/gFGZPwCGa2LKP1N0evzma5tvUtKLJsQfcBp/JZVoxDRmMUp2B1PaKoUyAn4ELxQzLpaFkVyMdA/p1AO72N2vhlNHILC4/kI';

export function BlogCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      {title && <div className={styles.cardTitle}>{title}</div>}
      {children}
    </Card>
  );
}

export type ChipItem = {
  to: string;
  label: string;
  count?: number;
  active?: boolean;
};

export function TagChip({ item }: { item: ChipItem }) {
  return (
    <Link
      to={item.to}
      className={clsx(styles.tagChip, {
        [styles.tagChipActive]: item.active,
      })}
    >
      <span className={styles.tagDot} />
      {item.label}
      {item.count !== undefined && <span>{item.count}</span>}
    </Link>
  );
}

export function TagChipList({ items }: { items: ChipItem[] }) {
  return (
    <div className={styles.tagList}>
      {items.map((item) => (
        <TagChip key={item.to} item={item} />
      ))}
    </div>
  );
}

export function formatLongNumber(value) {
  const { i18n } = useDocusaurusContext();
  const n = Number(value);
  if (Number.isNaN(n)) return value;
  return new Intl.NumberFormat(i18n.currentLocale, {
    notation: 'compact',
    compactDisplay: 'short',
    maximumSignificantDigits: 3,
  }).format(n);
}

export function useAnalytics(rawPath: string = '') {
  const [analytics, setAnalytics] = React.useState<{
    visitors?: number;
    pageviews?: number;
  }>({});
  const [status, setStatus] = React.useState<'loading' | 'success' | 'error'>(
    'loading'
  );

  React.useEffect(() => {
    const controller = new AbortController();
    const query = rawPath ? `&path=eq.${encodeURIComponent(rawPath)}` : '';

    (async () => {
      setStatus('loading');
      try {
        const res = await fetch(
          `${ANALYTICS_BASE_URL}?startAt=0&endAt=${Date.now()}${query}`,
          {
            signal: controller.signal,
            headers: { Authorization },
          }
        );

        if (!res.ok) throw new Error(`Stats request failed: ${res.status}`);

        setAnalytics(await res.json());
        setStatus('success');
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error(error);
        setStatus('error');
      }
    })();

    return () => controller.abort();
  }, [rawPath]);

  return { analytics, status };
}
