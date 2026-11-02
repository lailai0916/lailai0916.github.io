import { useEffect, useState, type ReactNode } from 'react';
import { useHistory } from '@docusaurus/router';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';

type DialogComponent = typeof import('./_Dialog').default;

export default function NavbarMobileSidebar(): ReactNode {
  const { shouldRender, shown, toggle } = useNavbarMobileSidebar();
  const history = useHistory();
  const [Dialog, setDialog] = useState<DialogComponent>();

  useEffect(() => {
    if (!shouldRender || Dialog) return;
    let active = true;
    import('./_Dialog').then(
      ({ default: Component }) => {
        if (active) setDialog(() => Component);
      },
      () => {
        // A failed preload must not replace the page; another activation can retry.
        if (active && shown) toggle();
      }
    );
    return () => {
      active = false;
    };
  }, [shouldRender, shown, toggle, Dialog]);

  useEffect(() => {
    if (!shouldRender || !shown || Dialog) return;
    let pending = true;
    const cancel = () => {
      if (!pending) return;
      pending = false;
      toggle();
    };
    const onActivate = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        !event.target.closest('[aria-controls="mobile-navigation"]')
      ) {
        cancel();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.isComposing) return;
      if (
        event.key === 'Escape' ||
        event.key === 'Tab' ||
        ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') ||
        (event.key === '/' &&
          event.target instanceof Element &&
          !event.target.closest('input, textarea, select, [contenteditable="true"]'))
      ) {
        cancel();
      }
    };
    // Navigation or search can supersede a menu click while its chunk is still loading.
    const unlisten = history.listen(cancel);
    document.addEventListener('pointerdown', onActivate, true);
    document.addEventListener('click', onActivate, true);
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      pending = false;
      unlisten();
      document.removeEventListener('pointerdown', onActivate, true);
      document.removeEventListener('click', onActivate, true);
      document.removeEventListener('keydown', onKeyDown, true);
    };
  }, [shouldRender, shown, toggle, Dialog, history]);

  return shouldRender && Dialog ? <Dialog /> : null;
}
