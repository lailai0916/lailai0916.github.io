import type { ReactNode } from 'react';
import clsx from 'clsx';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import Icon from '@lailai0916/ui/Icon';
import IconButton from '@lailai0916/ui/IconButton';
import NavbarLanguageToggle from '@site/src/components/Navbar/LanguageToggle';
import { trackEvent } from '@site/src/utils/analytics';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import NavbarLogo from '@theme/Navbar/Logo';
import { useMobileNavbarItems } from '../items';
import styles from './styles.module.css';

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <IconButton
      size="sm"
      type="button"
      label={translate({
        id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
        message: 'Close navigation bar',
        description: 'The ARIA label for close button of mobile sidebar',
      })}
      className={clsx('navbar-sidebar__close navbar-control', styles.close)}
      onClick={() => {
        if (!mobileSidebar.shown) return;
        trackEvent('feature_use', {
          surface: 'navbar',
          feature: 'mobile_navigation',
          action: 'close',
          value: 'button',
        });
        mobileSidebar.toggle();
      }}
    >
      <Icon icon="lucide:x" width={17} height={17} aria-hidden="true" />
    </IconButton>
  );
}

export default function NavbarMobileSidebarHeader(): ReactNode {
  const { localeItem } = useMobileNavbarItems();
  const mobileSidebar = useNavbarMobileSidebar();

  return (
    <div
      className={clsx('navbar-sidebar__brand', styles.brand)}
      onClick={(event) => {
        if (
          mobileSidebar.shown &&
          event.target instanceof Element &&
          event.target.closest('.navbar__brand')
        ) {
          mobileSidebar.toggle();
        }
      }}
    >
      <CloseButton />
      <NavbarLogo />
      <div className={styles.actions}>
        {localeItem && (
          <NavbarLanguageToggle
            queryString={localeItem.queryString}
            onClick={() => mobileSidebar.toggle()}
          />
        )}
        <NavbarColorModeToggle />
      </div>
    </div>
  );
}
