import type { ReactNode } from 'react';
import clsx from 'clsx';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import Icon from '@lailai0916/ui/Icon';
import IconButton from '@lailai0916/ui/IconButton';
import { trackEvent } from '@site/src/utils/analytics';
import styles from './styles.module.css';

export default function MobileSidebarToggle(): ReactNode {
  const { toggle, shown } = useNavbarMobileSidebar();

  return (
    <IconButton
      size="sm"
      onClick={(event) => {
        // Safari does not focus mouse-clicked buttons before the modal captures its return target.
        event.currentTarget.focus({ preventScroll: true });
        trackEvent('feature_use', {
          surface: 'navbar',
          feature: 'mobile_navigation',
          action: shown ? 'close' : 'open',
          value: 'button',
        });
        toggle();
      }}
      label={translate({
        id: 'theme.docs.sidebar.toggleSidebarButtonAriaLabel',
        message: 'Toggle navigation bar',
        description: 'The ARIA label for hamburger menu button of mobile navigation',
      })}
      aria-expanded={shown}
      aria-controls="mobile-navigation"
      aria-haspopup="dialog"
      className={clsx('navbar__toggle navbar-control', styles.toggle)}
      type="button"
    >
      <Icon icon="lucide:menu" width={17} height={17} aria-hidden="true" />
    </IconButton>
  );
}
