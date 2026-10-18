import { Fragment, type ReactNode } from 'react';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import { useMobileNavbarItems } from '../items';
import styles from './styles.module.css';

export default function NavbarMobilePrimaryMenu(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  const { menuItems } = useMobileNavbarItems();

  return (
    <ul className="menu__list">
      {menuItems.map((item, i) =>
        'items' in item ? (
          <Fragment key={i}>
            {i > 0 && <li role="separator" className={styles.separator} />}
            {item.items.map((child, j) => (
              <NavbarItem key={j} mobile {...child} onClick={() => mobileSidebar.toggle()} />
            ))}
          </Fragment>
        ) : (
          <NavbarItem key={i} mobile {...item} onClick={() => mobileSidebar.toggle()} />
        )
      )}
    </ul>
  );
}
