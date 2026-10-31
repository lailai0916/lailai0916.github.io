import { useEffect } from 'react';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

const SELECTOR = '.markdown img:not([data-link-icon]), img[data-zoomable]';
const OPEN_LABEL = translate({ id: 'components.imageZoom.open', message: 'Enlarge image' });
const CLOSE_LABEL = translate({ id: 'components.imageZoom.close', message: 'Close image preview' });
const PREVIEW_LABEL = translate({ id: 'components.imageZoom.title', message: 'Image Preview' });
const DURATION = 300;
const EASING = 'cubic-bezier(0.2, 0, 0.2, 1)';

type ImageEntry = { trigger: HTMLElement; attributes: Map<string, string | null> };
type Geometry = { left: number; top: number; width: number; height: number; clip: string };
type Preview = {
  source: HTMLImageElement;
  trigger: HTMLElement;
  dialog: HTMLDialogElement;
  backdrop: HTMLDivElement;
  image: HTMLImageElement;
  closeButton: HTMLButtonElement;
  origin: Geometry;
  goal: string;
  animations: Animation[];
  animationVersion: number;
  phase: 'opening' | 'open' | 'closing';
  highResolution: HTMLImageElement | null;
  overflow: string;
  gutter: string;
};

function offset(space: number, position: string) {
  if (position.endsWith('%')) return (space * parseFloat(position)) / 100;
  if (position.endsWith('px')) return parseFloat(position);
  if (position === 'left' || position === 'top') return 0;
  if (position === 'right' || position === 'bottom') return space;
  return space / 2;
}

function originGeometry(image: HTMLImageElement): Geometry {
  const rect = image.getBoundingClientRect();
  const computed = getComputedStyle(image);
  const fit = computed.objectFit;
  let width = rect.width;
  let height = rect.height;
  if (fit === 'cover' || fit === 'contain' || fit === 'scale-down' || fit === 'none') {
    const ratios = [rect.width / image.naturalWidth, rect.height / image.naturalHeight];
    const scale = fit === 'none' ? 1 : fit === 'cover' ? Math.max(...ratios) : Math.min(...ratios);
    const boundedScale = fit === 'scale-down' ? Math.min(1, scale) : scale;
    width = image.naturalWidth * boundedScale;
    height = image.naturalHeight * boundedScale;
  }
  const [horizontal = '50%', vertical = '50%'] = computed.objectPosition.split(' ');
  const left = rect.left + offset(rect.width - width, horizontal);
  const top = rect.top + offset(rect.height - height, vertical);
  const radius =
    computed.borderRadius === '0px'
      ? getComputedStyle(image.parentElement ?? image).borderRadius
      : computed.borderRadius;
  const clip = [
    Math.max(0, rect.top - top),
    Math.max(0, left + width - rect.right),
    Math.max(0, top + height - rect.bottom),
    Math.max(0, rect.left - left),
  ]
    .map((value) => `${value}px`)
    .join(' ');
  return { left, top, width, height, clip: `inset(${clip} round ${radius})` };
}

function targetTransform(origin: Geometry, width: number, height: number, vector: boolean) {
  const availableWidth = Math.max(1, window.innerWidth - 48);
  const availableHeight = Math.max(1, window.innerHeight - 48);
  const ratio = width / height;
  const targetWidth = Math.min(
    vector ? availableWidth : Math.max(width, origin.width),
    availableWidth,
    availableHeight * ratio
  );
  const targetHeight = targetWidth / ratio;
  const x = (window.innerWidth - targetWidth) / 2 - origin.left;
  const y = (window.innerHeight - targetHeight) / 2 - origin.top;
  return `translate3d(${x}px, ${y}px, 0) scale(${targetWidth / origin.width}, ${targetHeight / origin.height})`;
}

export default function ImageZoom() {
  useEffect(() => {
    const images = new Map<HTMLImageElement, ImageEntry>();
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let active: Preview | null = null;
    let disposed = false;

    function finish(preview: Preview, restoreFocus = true) {
      if (active !== preview) return;
      active = null;
      preview.animationVersion++;
      preview.animations.forEach((animation) => animation.cancel());
      if (preview.highResolution) {
        preview.highResolution.onload = null;
        preview.highResolution.onerror = null;
        preview.highResolution.removeAttribute('src');
        preview.highResolution.removeAttribute('srcset');
      }
      preview.source.classList.remove(styles.sourceHidden);
      document.documentElement.style.overflow = preview.overflow;
      document.documentElement.style.scrollbarGutter = preview.gutter;
      if (preview.dialog.open) preview.dialog.close();
      preview.dialog.remove();
      if (
        !disposed &&
        restoreFocus &&
        preview.trigger.isConnected &&
        !preview.trigger.matches(':disabled')
      ) {
        preview.trigger.focus({ preventScroll: true });
      }
    }

    function animate(preview: Preview, closing: boolean) {
      const imageStyle = getComputedStyle(preview.image);
      const fromTransform = imageStyle.transform;
      const fromClip = imageStyle.clipPath;
      const fromOpacity = getComputedStyle(preview.backdrop).opacity;
      const version = ++preview.animationVersion;
      const progress = Number(fromOpacity);
      const duration = motion.matches ? 0 : DURATION * (closing ? progress : 1);
      preview.image.style.transform = closing ? 'none' : preview.goal;
      preview.image.style.clipPath = closing ? preview.origin.clip : 'inset(0px round 0px)';
      preview.backdrop.style.opacity = closing ? '0' : '1';
      preview.animations.forEach((animation) => animation.cancel());
      preview.animations = [];
      preview.phase = closing ? 'closing' : 'opening';
      if (duration < 1 || !preview.image.animate) {
        if (closing) finish(preview);
        else preview.phase = 'open';
        return;
      }
      preview.animations = [
        preview.image.animate(
          [
            { transform: fromTransform, clipPath: fromClip },
            { transform: preview.image.style.transform, clipPath: preview.image.style.clipPath },
          ],
          { duration, easing: EASING }
        ),
        preview.backdrop.animate([{ opacity: fromOpacity }, { opacity: closing ? 0 : 1 }], {
          duration,
          easing: 'ease',
        }),
      ];
      Promise.all(preview.animations.map((animation) => animation.finished))
        .then(() => {
          if (active !== preview || version !== preview.animationVersion) return;
          if (closing) finish(preview);
          else preview.phase = 'open';
        })
        .catch(() => {});
    }

    function close() {
      if (active && active.phase !== 'closing') animate(active, true);
    }

    function open(source: HTMLImageElement) {
      const entry = images.get(source);
      if (active || !entry || source.getBoundingClientRect().width <= 0) return;
      const origin = originGeometry(source);
      if (!origin.width || !origin.height) return;
      const dialog = document.createElement('dialog');
      dialog.className = styles.dialog;
      dialog.setAttribute('aria-label', PREVIEW_LABEL);
      const backdrop = document.createElement('div');
      backdrop.className = styles.backdrop;
      backdrop.setAttribute('aria-hidden', 'true');
      const image = document.createElement('img');
      image.className = styles.preview;
      image.src = source.currentSrc || source.src;
      image.alt = source.alt || PREVIEW_LABEL;
      image.draggable = false;
      Object.assign(image.style, {
        left: `${origin.left}px`,
        top: `${origin.top}px`,
        width: `${origin.width}px`,
        height: `${origin.height}px`,
        clipPath: origin.clip,
      });
      const closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.className = styles.close;
      closeButton.setAttribute('aria-label', CLOSE_LABEL);
      closeButton.autofocus = true;
      closeButton.textContent = '×';
      dialog.append(backdrop, image, closeButton);
      const root = document.documentElement;
      const preview: Preview = {
        source,
        trigger: entry.trigger,
        dialog,
        backdrop,
        image,
        closeButton,
        origin,
        goal: targetTransform(
          origin,
          source.naturalWidth,
          source.naturalHeight,
          /\.svg(?:[?#]|$)/i.test(image.src)
        ),
        animations: [],
        animationVersion: 0,
        phase: 'opening',
        highResolution: null,
        overflow: root.style.overflow,
        gutter: root.style.scrollbarGutter,
      };
      active = preview;
      dialog.addEventListener('click', close);
      dialog.addEventListener('cancel', (event) => {
        event.preventDefault();
        close();
      });
      dialog.addEventListener('close', () => finish(preview));
      document.body.append(dialog);
      if (window.innerWidth > root.clientWidth) root.style.scrollbarGutter = 'stable';
      root.style.overflow = 'hidden';
      source.classList.add(styles.sourceHidden);
      dialog.showModal();
      closeButton.focus({ preventScroll: true });
      animate(preview, false);

      const highResolutionSource = source.getAttribute('data-zoom-src');
      if (highResolutionSource || source.srcset) {
        const highResolution = new Image();
        preview.highResolution = highResolution;
        highResolution.onload = () => {
          if (active !== preview || preview.phase === 'closing' || !highResolution.naturalWidth)
            return;
          image.src = highResolution.currentSrc || highResolution.src;
          preview.goal = targetTransform(
            origin,
            highResolution.naturalWidth,
            highResolution.naturalHeight,
            /\.svg(?:[?#]|$)/i.test(image.src)
          );
          animate(preview, false);
        };
        if (highResolutionSource) highResolution.src = highResolutionSource;
        else {
          highResolution.sizes = '100vw';
          highResolution.srcset = source.srcset;
          highResolution.src = source.currentSrc || source.src;
        }
      }
    }

    function attach(image: HTMLImageElement) {
      if (images.has(image) || image.closest('a, dialog')) return;
      const button = image.closest<HTMLButtonElement>('button');
      const trigger = button ?? image;
      const attributes = new Map<string, string | null>();
      if (!button) {
        for (const [name, value] of [
          ['role', 'button'],
          ['tabindex', '0'],
          ['aria-label', image.alt ? `${OPEN_LABEL}: ${image.alt}` : OPEN_LABEL],
        ]) {
          attributes.set(name, image.getAttribute(name));
          image.setAttribute(name, value);
        }
      }
      image.classList.add(styles.trigger);
      images.set(image, { trigger, attributes });
    }

    function detach(image: HTMLImageElement) {
      const entry = images.get(image);
      if (!entry) return;
      if (active?.source === image) finish(active, false);
      entry.attributes.forEach((value, name) =>
        value === null ? image.removeAttribute(name) : image.setAttribute(name, value)
      );
      image.classList.remove(styles.trigger);
      images.delete(image);
    }

    function scan(node: Element) {
      if (node instanceof HTMLImageElement && node.matches(SELECTOR)) attach(node);
      node.querySelectorAll<HTMLImageElement>(SELECTOR).forEach(attach);
    }

    function findImage(target: EventTarget | null) {
      if (!(target instanceof Element)) return;
      const image =
        target instanceof HTMLImageElement
          ? target
          : target.closest('button')?.querySelector('img');
      if (!image || !images.has(image) || !image.naturalWidth || !image.naturalHeight) return;
      const trigger = images.get(image)!.trigger;
      if (trigger.matches(':disabled') || trigger.closest('[inert], [aria-disabled="true"]'))
        return;
      return image;
    }

    function onClick(event: MouseEvent) {
      if (active || event.defaultPrevented) return;
      const image = findImage(event.target);
      if (!image) return;
      event.preventDefault();
      event.stopPropagation();
      open(image);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (active) {
        if (event.key === 'Escape') {
          event.preventDefault();
          event.stopPropagation();
          close();
        } else if (event.key === 'Tab') {
          event.preventDefault();
          active.closeButton.focus({ preventScroll: true });
        }
        return;
      }
      if (event.repeat || event.isComposing || (event.key !== 'Enter' && event.key !== ' ')) return;
      const image = findImage(event.target);
      if (!image) return;
      event.preventDefault();
      event.stopPropagation();
      open(image);
    }

    function onResize() {
      if (active) finish(active);
    }
    function onMotionChange() {
      if (!active || !motion.matches) return;
      if (active.phase === 'closing') finish(active);
      else animate(active, false);
    }
    function onVisibilityChange() {
      if (document.hidden && active) finish(active);
    }

    scan(document.body);
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === 'attributes' && record.target instanceof HTMLImageElement) {
          if (active?.source === record.target) finish(active, false);
          if (record.target.matches(SELECTOR)) attach(record.target);
          else detach(record.target);
        }
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) scan(node);
        });
      }
      for (const image of images.keys()) if (!image.isConnected) detach(image);
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'srcset', 'data-zoom-src', 'data-zoomable'],
    });
    document.addEventListener('click', onClick, true);
    document.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('resize', onResize);
    motion.addEventListener('change', onMotionChange);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('keydown', onKeyDown, true);
      window.removeEventListener('resize', onResize);
      motion.removeEventListener('change', onMotionChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (active) finish(active, false);
      for (const image of images.keys()) detach(image);
    };
  }, []);

  return null;
}
