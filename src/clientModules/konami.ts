// Konami code easter egg: the classic ↑↑↓↓←→←→ B A fires the site's one
// confetti burst (which already opts out under prefers-reduced-motion).
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { fireConfetti } from '../utils/confetti';

if (ExecutionEnvironment.canUseDOM) {
  const SEQUENCE = [
    'arrowup',
    'arrowup',
    'arrowdown',
    'arrowdown',
    'arrowleft',
    'arrowright',
    'arrowleft',
    'arrowright',
    'b',
    'a',
  ];
  let progress = 0;

  window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (key === SEQUENCE[progress]) {
      progress += 1;
    } else {
      // A wrong key restarts, but still counts if it happens to be the opener.
      progress = key === SEQUENCE[0] ? 1 : 0;
    }

    if (progress === SEQUENCE.length) {
      progress = 0;
      fireConfetti();
    }
  });
}
