import { useRef, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import Card from '@site/src/components/laikit/Card';
import WindowBar from '@site/src/components/laikit/WindowBar';
import { useMeasuredHeight } from '@site/src/hooks/useMeasuredHeight';
import styles from './styles.module.css';

export interface WindowPanelTab {
  label: string;
  /** Panel body for this tab. */
  content: ReactNode;
  /** Skip the default padded body wrapper — for a full-bleed child (e.g. a bare CodeBlock). */
  bare?: boolean;
}

interface WindowPanelProps {
  tabs: WindowPanelTab[];
  /** aria-labels for the collapse toggle (passed in so the component stays i18n-free). */
  collapseLabel: string;
  expandLabel: string;
  /** Extra title-bar content between the tabs and the collapse toggle, e.g. code size. */
  toolbar?: (activeIndex: number, open: boolean) => ReactNode;
  /** Which tab the collapse toggle re-opens: the first, or the last one viewed. */
  expandTo?: 'first' | 'last';
}

// The mac-style tabbed window panel shared by Problem and the playground
// Showcase: a WindowBar tab strip over a collapsible viewport whose height
// animates to the measured content. Clicking the active tab collapses it.
export default function WindowPanel({
  tabs,
  collapseLabel,
  expandLabel,
  toolbar,
  expandTo = 'first',
}: WindowPanelProps) {
  const [active, setActive] = useState<number | null>(0);
  // Hold the last opened tab so its content stays visible mid-collapse.
  const lastIdx = useRef(0);
  if (active !== null) lastIdx.current = active;
  const open = active !== null;
  const shownIdx = active ?? lastIdx.current;
  const shown = tabs[shownIdx];
  const [contentRef, contentHeight] = useMeasuredHeight<HTMLDivElement>(active);

  return (
    <Card padding={0} className={clsx(styles.panel, open && styles.panelOpen)}>
      <WindowBar className={styles.header}>
        <div className={styles.tabs} role="tablist">
          {tabs.map((t, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={clsx(styles.tab, i === active && styles.tabActive)}
              onClick={() => setActive((cur) => (cur === i ? null : i))}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className={styles.right}>
          {toolbar?.(shownIdx, open)}
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-label={open ? collapseLabel : expandLabel}
            onClick={() =>
              setActive((cur) =>
                cur === null ? (expandTo === 'last' ? lastIdx.current : 0) : null
              )
            }
          >
            <svg className={styles.chevron} viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M5 8l5 5 5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </WindowBar>
      <div
        className={styles.viewport}
        style={{ height: open ? contentHeight : 0 }}
        aria-hidden={!open}
      >
        <div className={styles.body} ref={contentRef} role="tabpanel">
          {shown.bare ? shown.content : <div className={styles.bodyInner}>{shown.content}</div>}
        </div>
      </div>
    </Card>
  );
}
