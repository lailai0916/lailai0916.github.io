import { useState, useEffect, useRef, useCallback } from 'react';
import { translate } from '@docusaurus/Translate';
import clsx from 'clsx';
import Button from '@site/src/components/laikit/Button';
import Card from '@site/src/components/laikit/Card';
import styles from './styles.module.css';

const ROWS = 6;
const COLS = 8;
const AI_DELAY_MS = 550;
const COL_GAP_RATIO = 0.36;
const ROW_GAP_RATIO = 0.72;
const MAX_CELL = 36;

const YOUR_TURN_LABEL = translate({
  id: 'components.playground.nim.yourTurn',
  message: 'Your turn',
});
const AI_THINKING_LABEL = translate({
  id: 'components.playground.nim.aiThinking',
  message: 'AI is thinking…',
});
const YOU_WIN_LABEL = translate({
  id: 'components.playground.nim.youWin',
  message: 'You win!',
});
const AI_WINS_LABEL = translate({
  id: 'components.playground.nim.aiWins',
  message: 'AI wins',
});
const RESET_LABEL = translate({
  id: 'components.playground.nim.reset',
  message: 'Reset',
});
const TIP_LABEL = translate({
  id: 'components.playground.nim.tip',
  message: 'Tip',
});

type Turn = 'you' | 'ai' | 'over';

// Deterministic initial board keeps server and client markup identical
// (no hydration mismatch); randomisation only happens on user actions.
function staircase(): number[] {
  return Array.from({ length: ROWS }, (_, i) => ((i * 5 + 3) % COLS) + 1);
}

function randomHeaps(): number[] {
  return Array.from(
    { length: ROWS },
    () => 1 + Math.floor(Math.random() * COLS)
  );
}

// Optimal play: drive the Nim-sum (XOR of heap sizes) to zero when possible.
function aiMove(heaps: number[]): number[] {
  const next = [...heaps];
  const nimSum = heaps.reduce((a, b) => a ^ b, 0);
  if (nimSum !== 0) {
    for (let i = 0; i < next.length; i++) {
      const target = next[i] ^ nimSum;
      if (target < next[i]) {
        next[i] = target;
        break;
      }
    }
  } else {
    // Losing position — take one from the largest heap and hope for a slip.
    let mi = -1;
    let mv = 0;
    for (let i = 0; i < next.length; i++) {
      if (next[i] > mv) {
        mv = next[i];
        mi = i;
      }
    }
    if (mi >= 0) next[mi] -= 1;
  }
  return next;
}

export default function NimGame() {
  const [heaps, setHeaps] = useState<number[]>(staircase);
  const [turn, setTurn] = useState<Turn>('you');
  const [winner, setWinner] = useState<Turn | null>(null);
  const [hover, setHover] = useState<{ heap: number; index: number } | null>(
    null
  );
  const [showTip, setShowTip] = useState(false);

  const boardRef = useRef<HTMLDivElement>(null);
  const [area, setArea] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const measure = () => setArea({ w: el.clientWidth, h: el.clientHeight });
    measure();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const restart = useCallback(() => {
    setHeaps(randomHeaps());
    setTurn('you');
    setWinner(null);
    setHover(null);
  }, []);

  const takeFrom = (heapIdx: number, leave: number) => {
    if (turn !== 'you' || leave >= heaps[heapIdx]) return;
    const next = heaps.map((v, i) => (i === heapIdx ? leave : v));
    setHover(null);
    setHeaps(next);
    if (next.every((h) => h === 0)) {
      setWinner('you');
      setTurn('over');
    } else {
      setTurn('ai');
    }
  };

  useEffect(() => {
    if (turn !== 'ai') return;
    const id = setTimeout(() => {
      setHeaps((prev) => {
        const next = aiMove(prev);
        if (next.every((h) => h === 0)) {
          setWinner('ai');
          setTurn('over');
        } else {
          setTurn('you');
        }
        return next;
      });
    }, AI_DELAY_MS);
    return () => clearTimeout(id);
  }, [turn]);

  const status =
    turn === 'over'
      ? winner === 'you'
        ? YOU_WIN_LABEL
        : AI_WINS_LABEL
      : turn === 'ai'
        ? AI_THINKING_LABEL
        : YOUR_TURN_LABEL;

  const usableW = area.w || 440;
  const usableH = area.h || 360;
  const cell = Math.max(
    10,
    Math.min(
      MAX_CELL,
      Math.floor(usableW / (COLS + COL_GAP_RATIO * (COLS - 1))),
      Math.floor(usableH / (ROWS + ROW_GAP_RATIO * (ROWS - 1)))
    )
  );
  const colGap = cell * COL_GAP_RATIO;
  const rowGap = cell * ROW_GAP_RATIO;

  // Tip highlights the optimal move: the stones the Nim-sum strategy would take.
  const advice =
    showTip && turn === 'you'
      ? (() => {
          const rec = aiMove(heaps);
          const s = new Set<string>();
          for (let i = 0; i < heaps.length; i++) {
            for (let si = rec[i]; si < heaps[i]; si++) s.add(`${i}-${si}`);
          }
          return s;
        })()
      : null;

  return (
    <div className={styles.container}>
      <Card padding="0" className={styles.cardSurface}>
        <div
          className={clsx(
            styles.status,
            turn === 'over' && winner === 'you' && styles.win
          )}
        >
          {status}
        </div>
        <div ref={boardRef} className={styles.board}>
          <div
            className={styles.grid}
            style={{
              gridTemplateColumns: `repeat(${COLS}, ${cell}px)`,
              gridAutoRows: `${cell}px`,
              columnGap: `${colGap}px`,
              rowGap: `${rowGap}px`,
            }}
          >
            {Array.from({ length: ROWS * COLS }, (_, idx) => {
              const hi = Math.floor(idx / COLS);
              const si = idx % COLS;
              // Fixed slot per (row, column): removed stones just leave an empty
              // cell, so the surviving stones never shift position.
              if (si >= heaps[hi]) return <span key={idx} aria-hidden="true" />;
              const willRemove =
                turn === 'you' &&
                hover != null &&
                hover.heap === hi &&
                si >= hover.index;
              const recommend = advice != null && advice.has(`${hi}-${si}`);
              return (
                <button
                  key={idx}
                  type="button"
                  className={clsx(
                    styles.token,
                    willRemove && styles.faded,
                    recommend && styles.recommend
                  )}
                  style={{ fontSize: `${Math.round(cell * 0.46)}px` }}
                  disabled={turn !== 'you'}
                  onPointerEnter={() => setHover({ heap: hi, index: si })}
                  onPointerLeave={() => setHover(null)}
                  onClick={() => takeFrom(hi, si)}
                  aria-label={`row ${hi + 1}, take ${heaps[hi] - si}`}
                >
                  {si + 1}
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      <div className={styles.controls}>
        <Button variant="secondary" onClick={restart} aria-label={RESET_LABEL}>
          {RESET_LABEL}
        </Button>
        <Button
          variant="secondary"
          active={showTip}
          onClick={() => setShowTip((v) => !v)}
          aria-label={TIP_LABEL}
        >
          {TIP_LABEL}
        </Button>
      </div>
    </div>
  );
}
