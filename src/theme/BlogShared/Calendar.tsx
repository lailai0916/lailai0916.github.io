import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Card from '@site/src/components/laikit/Card';
import { getAllBlogItems } from '@site/src/utils/blogData';
import styles from './styles.module.css';

type CalPost = {
  title: string;
  permalink: string;
  date: string;
  dateKey: string;
};

type Cell = {
  y: number;
  m: number;
  d: number;
  dateKey: string;
  inMonth: boolean;
};

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function toDateKey(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

function daysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate();
}

function shiftMonth(y: number, m: number, delta: number) {
  const date = new Date(y, m + delta, 1);
  return { y: date.getFullYear(), m: date.getMonth() };
}

export default function CalendarCard() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;

  const posts = useMemo<CalPost[]>(() => {
    return getAllBlogItems()
      .map((it): CalPost | null => {
        const title = it.title ?? it.metadata?.title;
        const date = it.date ?? it.metadata?.date;
        const permalink = it.permalink ?? it.metadata?.permalink;
        if (!title || !date || !permalink) return null;
        return { title, date, permalink, dateKey: date.slice(0, 10) };
      })
      .filter((x): x is CalPost => x !== null)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, []);

  const postsByDate = useMemo(() => {
    const map = new Map<string, CalPost[]>();
    posts.forEach((p) => {
      const arr = map.get(p.dateKey);
      if (arr) arr.push(p);
      else map.set(p.dateKey, [p]);
    });
    return map;
  }, [posts]);

  const todayKey = useMemo(() => {
    const now = new Date();
    return toDateKey(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const initial = useMemo(() => {
    const now = new Date();
    return { y: now.getFullYear(), m: now.getMonth() };
  }, []);
  const [view, setView] = useState(initial);
  const [selected, setSelected] = useState<string | null>(null);

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
      }).format(new Date(view.y, view.m, 1)),
    [locale, view]
  );

  const weekdayLabels = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });
    // 2024-01-07 is a Sunday — use it as anchor for Sunday-first ordering.
    return Array.from({ length: 7 }, (_, i) =>
      fmt.format(new Date(2024, 0, 7 + i))
    );
  }, [locale]);

  const cells = useMemo<Cell[]>(() => {
    const firstDow = new Date(view.y, view.m, 1).getDay();
    const dim = daysInMonth(view.y, view.m);
    const prev = shiftMonth(view.y, view.m, -1);
    const next = shiftMonth(view.y, view.m, 1);
    const prevDim = daysInMonth(prev.y, prev.m);

    const arr: Cell[] = [];
    for (let i = firstDow - 1; i >= 0; i--) {
      const d = prevDim - i;
      arr.push({
        y: prev.y,
        m: prev.m,
        d,
        dateKey: toDateKey(prev.y, prev.m, d),
        inMonth: false,
      });
    }
    for (let d = 1; d <= dim; d++) {
      arr.push({
        y: view.y,
        m: view.m,
        d,
        dateKey: toDateKey(view.y, view.m, d),
        inMonth: true,
      });
    }
    let nd = 1;
    while (arr.length < 42) {
      arr.push({
        y: next.y,
        m: next.m,
        d: nd,
        dateKey: toDateKey(next.y, next.m, nd),
        inMonth: false,
      });
      nd += 1;
    }
    return arr;
  }, [view]);

  const visiblePosts = useMemo(() => {
    if (selected) return postsByDate.get(selected) ?? [];
    const prefix = `${view.y}-${pad(view.m + 1)}`;
    return posts.filter((p) => p.dateKey.startsWith(prefix));
  }, [posts, postsByDate, selected, view]);

  const goPrev = () => {
    setView((v) => shiftMonth(v.y, v.m, -1));
    setSelected(null);
  };
  const goNext = () => {
    setView((v) => shiftMonth(v.y, v.m, 1));
    setSelected(null);
  };

  const handlePick = (cell: Cell) => {
    const has = postsByDate.has(cell.dateKey);
    if (!has) return;
    if (!cell.inMonth) {
      setView({ y: cell.y, m: cell.m });
    }
    setSelected((s) => (s === cell.dateKey ? null : cell.dateKey));
  };

  const formatDayLabel = (key: string) => key.slice(5).replace('-', '/');

  return (
    <Card>
      <div className={styles.calendarHeader}>
        <span className={styles.calendarTitleAccent} />
        <span className={styles.calendarTitle}>{monthLabel}</span>
        <div className={styles.calendarNav}>
          <button
            type="button"
            className={styles.calendarNavBtn}
            onClick={goPrev}
            aria-label={translate({
              id: 'blog.sidebar.calendar.prev',
              message: 'Previous month',
            })}
          >
            <Icon icon="lucide:chevron-left" width="1em" height="1em" />
          </button>
          <button
            type="button"
            className={styles.calendarNavBtn}
            onClick={goNext}
            aria-label={translate({
              id: 'blog.sidebar.calendar.next',
              message: 'Next month',
            })}
          >
            <Icon icon="lucide:chevron-right" width="1em" height="1em" />
          </button>
        </div>
      </div>

      <div className={styles.calendarWeekdays}>
        {weekdayLabels.map((label, i) => (
          <span key={i} className={styles.calendarWeekday}>
            {label}
          </span>
        ))}
      </div>

      <div className={styles.calendarGrid}>
        {cells.map((cell) => {
          const has = postsByDate.has(cell.dateKey);
          const isSelected = selected === cell.dateKey;
          const isToday = cell.dateKey === todayKey;
          return (
            <button
              key={`${cell.y}-${cell.m}-${cell.d}`}
              type="button"
              onClick={() => handlePick(cell)}
              disabled={!has}
              className={clsx(styles.calendarCell, {
                [styles.calendarCellMuted]: !cell.inMonth,
                [styles.calendarCellHasPost]: has,
                [styles.calendarCellSelected]: isSelected,
                [styles.calendarCellToday]: isToday,
              })}
            >
              <span className={styles.calendarCellNum}>{cell.d}</span>
              {has && <span className={styles.calendarCellDot} />}
            </button>
          );
        })}
      </div>

      <div className={styles.calendarDivider} />

      {visiblePosts.length === 0 ? (
        <div className={styles.calendarEmpty}>
          {translate({
            id: 'blog.sidebar.calendar.empty',
            message: 'No posts',
          })}
        </div>
      ) : (
        <ul className={styles.calendarPostList}>
          {visiblePosts.map((post) => (
            <li key={post.permalink} className={styles.calendarPostItem}>
              <Link to={post.permalink} className={styles.calendarPostLink}>
                <span className={styles.calendarPostTitle}>{post.title}</span>
                <span className={styles.calendarPostDate}>
                  {formatDayLabel(post.dateKey)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
