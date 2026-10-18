import type { ReactNode } from 'react';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import { useMobileNavbarItems } from '../items';

export default function NavbarMobilePrimaryMenu(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  const { menuItems } = useMobileNavbarItems();

  return (
    <ul className="menu__list">
      {menuItems.map((item, i) => (
        <NavbarItem key={i} mobile {...item} onClick={() => mobileSidebar.toggle()} />
      ))}
    </ul>
  );
}
