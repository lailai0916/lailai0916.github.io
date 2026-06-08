import type { ReactNode } from 'react';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import { useDocCardDescriptionCategoryItemsPlural } from '@docusaurus/theme-common/internal';
import isInternalUrl from '@docusaurus/isInternalUrl';
import type { Props } from '@theme/DocCard';
import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import LinkCard from '@site/src/components/laikit/LinkCard';

// Swizzled over the framework's emoji-and-Infima-card DocCard so the category
// index pages use the laikit LinkCard instead. Type-based lucide icons keep the
// grid visually consistent with the rest of the site.
type CategoryItem = Extract<PropSidebarItem, { type: 'category' }>;
type LinkItem = Extract<PropSidebarItem, { type: 'link' }>;

function CardCategory({ item }: { item: CategoryItem }): ReactNode {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useDocCardDescriptionCategoryItemsPlural();
  // Categories without a reachable link are filtered upstream, but guard anyway.
  if (!href) {
    return null;
  }
  return (
    <LinkCard
      href={href}
      fallbackIcon="lucide:folder"
      title={item.label}
      description={item.description ?? categoryItemsPlural(item.items.length)}
    />
  );
}

function CardLink({ item }: { item: LinkItem }): ReactNode {
  const doc = useDocById(item.docId ?? undefined);
  const icon = isInternalUrl(item.href)
    ? 'lucide:file-text'
    : 'lucide:external-link';
  return (
    <LinkCard
      href={item.href}
      fallbackIcon={icon}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  );
}

export default function DocCard({ item }: Props): ReactNode {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      return null;
  }
}
