import { useEffect, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { translate } from '@docusaurus/Translate';
import { useLocation } from '@docusaurus/router';
import { useNavbarMobileSidebar, useNavbarSecondaryMenu } from '@docusaurus/theme-common/internal';
import Dialog from '@lailai0916/ui/Dialog';
import NavbarMobileSidebarLayout from '@theme/Navbar/MobileSidebar/Layout';
import NavbarMobileSidebarHeader from '@theme/Navbar/MobileSidebar/Header';
import NavbarMobileSidebarPrimaryMenu from '@theme/Navbar/MobileSidebar/PrimaryMenu';
import NavbarMobileSidebarSecondaryMenu from '@theme/Navbar/MobileSidebar/SecondaryMenu';
import { trackEvent } from '@site/src/utils/analytics';
import styles from './styles.module.css';

function MobileSidebarDialog(): ReactNode {
  const { shown, toggle } = useNavbarMobileSidebar();
  const { shown: secondaryShown } = useNavbarSecondaryMenu();
  const { pathname } = useLocation();
  const [present, setPresent] = useState(shown);
  const contentRef = useRef<HTMLDivElement>(null);
  const pointerStartedOutside = useRef(false);
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (shown) {
      setPresent(true);
      return;
    }
    // Keep the native modal active until its exit transition finishes.
    const timeout = window.setTimeout(() => setPresent(false), 200);
    return () => window.clearTimeout(timeout);
  }, [shown]);

  useEffect(() => {
    if (previousPath.current !== pathname && shown) {
      setPresent(false);
      toggle();
    }
    previousPath.current = pathname;
  }, [pathname, shown, toggle]);

  useEffect(() => {
    const content = contentRef.current;
    const active = document.activeElement;
    if (
      shown &&
      active instanceof HTMLElement &&
      content?.contains(active) &&
      active.closest('[inert]')
    ) {
      content.querySelector<HTMLElement>('.navbar-sidebar__item:not([inert]) a[href]')?.focus();
    }
  }, [shown, secondaryShown]);

  function close(value: string) {
    if (!shown) return;
    trackEvent('feature_use', {
      surface: 'navbar',
      feature: 'mobile_navigation',
      action: 'close',
      value,
    });
    toggle();
  }

  return (
    <Dialog
      id="mobile-navigation"
      className={styles.dialog}
      open={present}
      data-state={shown ? 'open' : 'closing'}
      label={translate({ id: 'components.navbar.mobileNavigation', message: 'Navigation' })}
      onClose={() => close('escape')}
      onClickCapture={(event) => {
        if (!shown) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      onPointerDown={(event) => {
        pointerStartedOutside.current = event.target === event.currentTarget;
      }}
      onPointerUp={(event) => {
        if (pointerStartedOutside.current && event.target === event.currentTarget) close('overlay');
        pointerStartedOutside.current = false;
      }}
      onKeyDownCapture={(event) => {
        if (event.isDefaultPrevented() || event.nativeEvent.isComposing) return;
        if (event.key === 'Escape') {
          event.preventDefault();
          close('escape');
          return;
        }
        if (!shown && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        if (event.key === 'Tab') {
          const controls = Array.from(
            event.currentTarget.querySelectorAll<HTMLElement>(
              'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
            )
          ).filter(
            (element) =>
              element.tabIndex >= 0 &&
              !element.closest('[inert]') &&
              element.getClientRects().length > 0
          );
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus({ preventScroll: true });
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus({ preventScroll: true });
          }
        }
        const target = event.target as HTMLElement;
        const searchShortcut =
          ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') ||
          (event.key === '/' &&
            !target.closest('input, textarea, select, [contenteditable="true"]'));
        if (present && searchShortcut) {
          // Release the native top layer before DocSearch opens its external portal.
          flushSync(() => {
            setPresent(false);
            close('search');
          });
        }
      }}
      onTransitionEnd={(event) => {
        if (
          !shown &&
          event.propertyName === 'transform' &&
          event.target instanceof HTMLElement &&
          event.target.classList.contains('navbar-sidebar')
        ) {
          setPresent(false);
        }
      }}
    >
      <div ref={contentRef} className={styles.content}>
        <NavbarMobileSidebarLayout
          header={<NavbarMobileSidebarHeader />}
          primaryMenu={<NavbarMobileSidebarPrimaryMenu />}
          secondaryMenu={<NavbarMobileSidebarSecondaryMenu />}
        />
      </div>
    </Dialog>
  );
}

export default function NavbarMobileSidebar(): ReactNode {
  const { shouldRender } = useNavbarMobileSidebar();
  return shouldRender ? <MobileSidebarDialog /> : null;
}
