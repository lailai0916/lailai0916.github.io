import React from 'react';
import styles from '../BlogShared/styles.module.css';
import TagChipList from './TagChipList';

type Item = {
  to: string;
  label: React.ReactNode;
  count?: React.ReactNode;
};

export default function ChipListCard({
  title,
  items,
}: {
  title: React.ReactNode;
  items: Item[];
}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>{title}</div>
      <TagChipList items={items} />
    </div>
  );
}
