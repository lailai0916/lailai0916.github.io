import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';
import { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

type Drag = {
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
};

type SpringAvatarProps = {
  onCornerDrop?: () => void;
  onToggleMascot?: () => void;
};

// Sample a damped spring once; the browser plays only transform keyframes.
const spring = Array.from({ length: 61 }, (_, index) => {
  const t = (index / 60) * 0.9;
  return index === 60 ? 0 : Math.exp(-9 * t) * (Math.cos(14 * t) + (9 / 14) * Math.sin(14 * t));
});

export default function SpringAvatar({ onCornerDrop, onToggleMascot }: SpringAvatarProps) {
  const avatarSrc = useBaseUrl('/img/logo.svg');
  const slotRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dragRef = useRef<Drag | null>(null);
  const animationRef = useRef<Animation | null>(null);

  function stopAnimation() {
    const button = buttonRef.current!;
    const position = new DOMMatrixReadOnly(getComputedStyle(button).transform);
    animationRef.current?.cancel();
    animationRef.current = null;
    return { x: position.m41, y: position.m42 };
  }

  function returnHome(bounce = false) {
    const button = buttonRef.current!;
    const slot = slotRef.current!;
    const { x, y } = stopAnimation();
    button.style.transform = '';
    delete button.dataset.dragging;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      delete slot.dataset.moving;
      return;
    }

    slot.dataset.moving = 'true';
    const animation = button.animate(
      spring.map((value, index) => {
        const t = (index / 60) * 0.9;
        const lift = bounce && index < 60 ? 22 * Math.exp(-7 * t) * Math.sin(13 * t) : 0;
        return { transform: `translate(${x * value}px, ${y * value - lift}px)` };
      }),
      { duration: 900, easing: 'linear' }
    );
    animationRef.current = animation;
    animation.onfinish = () => {
      if (animationRef.current !== animation) return;
      animationRef.current = null;
      delete slot.dataset.moving;
    };
  }

  function startDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!event.isPrimary || event.button !== 0 || dragRef.current) return;
    const { x, y } = stopAnimation();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: event.clientX - x,
      originY: event.clientY - y,
    };
    event.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
    event.currentTarget.dataset.dragging = 'true';
    slotRef.current!.dataset.moving = 'true';
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const x = event.clientX - drag.originX;
    const y = event.clientY - drag.originY;
    event.currentTarget.style.transform = `translate(${x}px, ${y}px)`;
  }

  function endDrag(pointerId = dragRef.current?.pointerId) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== pointerId) return;
    dragRef.current = null;
    const button = buttonRef.current!;
    if (button.hasPointerCapture(drag.pointerId)) button.releasePointerCapture(drag.pointerId);
    returnHome();
  }

  function finishDrag(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const moved = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) >= 24;
    const inCorner =
      event.clientX >= 0 &&
      event.clientX <= Math.min(128, window.innerWidth) &&
      event.clientY >= Math.max(0, window.innerHeight - 128) &&
      event.clientY <= window.innerHeight;
    endDrag(event.pointerId);
    if (moved && inCorner) onCornerDrop?.();
  }

  useEffect(() => {
    const button = buttonRef.current!;
    const slot = slotRef.current!;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reset = () => {
      const drag = dragRef.current;
      dragRef.current = null;
      if (drag && button.hasPointerCapture(drag.pointerId)) {
        button.releasePointerCapture(drag.pointerId);
      }
      animationRef.current?.cancel();
      animationRef.current = null;
      button.style.transform = '';
      delete button.dataset.dragging;
      delete slot.dataset.moving;
    };
    window.addEventListener('blur', reset);
    motion.addEventListener('change', reset);
    return () => {
      window.removeEventListener('blur', reset);
      motion.removeEventListener('change', reset);
      reset();
    };
  }, []);

  return (
    <div ref={slotRef} className={styles.slot}>
      <span
        className={styles.placeholder}
        style={{ maskImage: `url("${avatarSrc}")` }}
        aria-hidden="true"
      />
      <button
        ref={buttonRef}
        type="button"
        className={styles.avatar}
        aria-label={translate({
          id: 'pages.home.avatar.ariaLabel',
          message: "Drag lailai's avatar and release to spring back, or press Enter to bounce",
        })}
        aria-description={
          onCornerDrop
            ? translate({
                id: 'pages.home.avatar.description',
                message:
                  'Drag to the bottom-left corner and release to reveal the mascot. Press Shift+Enter to show or hide it.',
              })
            : undefined
        }
        aria-keyshortcuts={onToggleMascot ? 'Shift+Enter' : undefined}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={finishDrag}
        onPointerCancel={(event) => endDrag(event.pointerId)}
        onLostPointerCapture={(event) => endDrag(event.pointerId)}
        onBlur={() => endDrag()}
        onKeyDown={(event) => {
          if (event.key === 'Escape') endDrag();
          if (
            event.key === 'Enter' &&
            event.shiftKey &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey &&
            onToggleMascot
          ) {
            event.preventDefault();
            if (event.repeat) return;
            endDrag();
            returnHome(true);
            onToggleMascot();
          }
        }}
        onClick={(event) => {
          if (event.detail === 0) returnHome(true);
        }}
      >
        <img src={avatarSrc} alt="lailai" draggable={false} />
      </button>
    </div>
  );
}
