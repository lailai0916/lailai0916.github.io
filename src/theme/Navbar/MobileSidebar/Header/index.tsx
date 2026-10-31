import type { ReactNode } from 'react';
import clsx from 'clsx';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import Icon from '@lailai0916/ui/Icon';
import IconButton from '@lailai0916/ui/IconButton';
import NavbarLanguageToggle from '@site/src/components/Navbar/LanguageToggle';
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
      className="navbar-sidebar__close navbar-control"
      onClick={() => mobileSidebar.toggle()}
    >
      <Icon icon="lucide:x" width={17} height={17} aria-hidden="true" />
    </IconButton>
  );
}

export default function NavbarMobileSidebarHeader(): ReactNode {
  const { localeItem } = useMobileNavbarItems();
  const mobileSidebar = useNavbarMobileSidebar();

  return (
    <div className={clsx('navbar-sidebar__brand', styles.brand)}>
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
      <CloseButton />
    </div>
  );
}
