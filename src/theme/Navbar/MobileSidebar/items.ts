import { useThemeConfig } from '@docusaurus/theme-common';
import type { Props as NavbarItemConfig } from '@theme/NavbarItem';

export function useMobileNavbarItems() {
  const items = useThemeConfig().navbar.items as NavbarItemConfig[];
  const localeItem = items.find((item) => item.type === 'localeDropdown');
  const githubItem = items.find((item) => item.className?.split(/\s+/).includes('header-github-link'));

  return {
    localeItem,
    githubItem,
    menuItems: items.filter((item) => item !== localeItem && item !== githubItem),
  };
}
