import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react';
import Card from '@site/src/components/laikit/Card';
import styles from './styles.module.css';

const LABEL = translate({
  id: 'components.article.summaryLabel',
  message: 'Summary',
});

// Reveal one character per tick (~50 chars/s) so the text streams out like an
// AI writing on demand, not a plain expand-to-reveal.
const STEP = 1;
const TICK_MS = 20;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return reduced;
}

// The AI overview shown right after a doc's title. Clicking streams the
// pre-generated `summary` front matter out character by character; once revealed
// the chevron collapses / re-opens it without re-typing. It makes no request —
// the text is static, the streaming is purely presentational.
export default function Summary({ content }: { content: string }) {
  const [phase, setPhase] = useState<'idle' | 'typing' | 'done'>('idle');
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (phase !== 'typing') return undefined;
    if (reduced) {
      setCount(content.length);
      return undefined;
    }
    const id = setInterval(() => {
      setCount((prev) => Math.min(prev + STEP, content.length));
    }, TICK_MS);
    return () => clearInterval(id);
  }, [phase, content, reduced]);

  useEffect(() => {
    if (phase === 'typing' && count >= content.length) setPhase('done');
  }, [phase, count, content.length]);

  const toggle = () => {
    if (phase === 'idle') {
      setPhase('typing');
      setOpen(true);
    } else {
      setOpen((prev) => !prev);
    }
  };

  return (
    <Card padding="0" className={styles.summary}>
      <button type="button" className={styles.header} onClick={toggle} aria-expanded={open}>
        <Icon icon="lucide:sparkles" className={styles.icon} aria-hidden="true" />
        <span className={styles.label}>{LABEL}</span>
        <Icon
          icon="lucide:chevron-down"
          className={clsx(styles.chevron, open && styles.chevronOpen)}
          aria-hidden="true"
        />
      </button>
      {open && phase !== 'idle' && (
        <div className={styles.body}>
          {content.slice(0, count)}
          {phase === 'typing' && <span className={styles.cursor} aria-hidden="true" />}
        </div>
      )}
    </Card>
  );
}
