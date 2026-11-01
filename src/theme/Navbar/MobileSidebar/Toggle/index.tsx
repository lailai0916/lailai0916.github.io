import { useEffect, useRef, type ReactNode } from 'react';
import clsx from 'clsx';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import Icon from '@lailai0916/ui/Icon';
import IconButton from '@lailai0916/ui/IconButton';
import styles from './styles.module.css';

export default function MobileSidebarToggle(): ReactNode {
  const { toggle, shown } = useNavbarMobileSidebar();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);

  useEffect(() => {
    if (!shown) {
      if (restoreFocus.current) toggleRef.current?.focus({ preventScroll: true });
      restoreFocus.current = false;
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key !== 'Escape' ||
        event.defaultPrevented ||
        event.isComposing ||
        document.body.classList.contains('DocSearch--active') ||
        document.querySelector('dialog[open]')
      ) {
        return;
      }
      event.preventDefault();
      restoreFocus.current = true;
      toggle();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [shown, toggle]);

  return (
    <IconButton
      ref={toggleRef}
      size="sm"
      onClick={toggle}
      label={translate({
        id: 'theme.docs.sidebar.toggleSidebarButtonAriaLabel',
        message: 'Toggle navigation bar',
        description: 'The ARIA label for hamburger menu button of mobile navigation',
      })}
      aria-expanded={shown}
      className={clsx('navbar__toggle navbar-control', styles.toggle)}
      type="button"
    >
      <Icon icon="lucide:menu" width={17} height={17} aria-hidden="true" />
    </IconButton>
  );
}
