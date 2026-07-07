import type { ReactNode } from 'react';
import clsx from 'clsx';
import {
  useCurrentSidebarSiblings,
  filterDocCardListItems,
} from '@docusaurus/plugin-content-docs/client';
import DocCard from '@theme/DocCard';
import type { Props } from '@theme/DocCardList';
import styles from './styles.module.css';

function CurrentSidebarSiblings({ className }: { className?: string }): ReactNode {
  const items = useCurrentSidebarSiblings();
  return <DocCardList items={items} className={className} />;
}

export default function DocCardList(props: Props): ReactNode {
  const { items, className } = props;
  if (!items) {
    return <CurrentSidebarSiblings {...props} />;
  }
  const filteredItems = filterDocCardListItems(items);
  return (
    <section className={clsx(styles.grid, className)}>
      {filteredItems.map((item, index) => (
        <DocCard key={index} item={item} />
      ))}
    </section>
  );
}
