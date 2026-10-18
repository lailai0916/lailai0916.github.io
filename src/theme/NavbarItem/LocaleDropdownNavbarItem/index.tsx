import type { ReactNode } from 'react';
import clsx from 'clsx';
import NavbarLanguageToggle from '@site/src/components/Navbar/LanguageToggle';
import type { Props } from '@theme/NavbarItem/LocaleDropdownNavbarItem';
import styles from './styles.module.css';

export default function LocaleDropdownNavbarItem({
  mobile,
  className,
  queryString,
}: Props): ReactNode {
  return (
    <div className={clsx(!mobile && 'navbar__item', styles.item, className)}>
      <NavbarLanguageToggle queryString={queryString} />
    </div>
  );
}
