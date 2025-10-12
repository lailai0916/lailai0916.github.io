import React from 'react';
import styles from '../BlogShared/styles.module.css';
import { Card } from '../BlogShared/components';
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
    <Card title={title}>
      <TagChipList items={items} />
    </Card>
  );
}
