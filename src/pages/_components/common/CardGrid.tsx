import React from 'react';
import clsx from 'clsx';
import styles from '../../styles.module.css';

interface CardGridProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  hasAltBackground?: boolean;
}

interface CardItemProps {
  children: React.ReactNode;
  colSize?: string;
  className?: string;
}

export function CardGrid({ title, children, className, hasAltBackground = false }: CardGridProps) {
  return (
    <div className={clsx(styles.section, hasAltBackground && styles.sectionAlt, className)}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 className={styles.centerTitle}>{title}</h2>
          </div>
        </div>
        <div className="row">
          {children}
        </div>
      </div>
    </div>
  );
}

export function CardItem({ children, colSize = 'col--4', className }: CardItemProps) {
  return (
    <div className={clsx('col', colSize, styles.cardContainer, className)}>
      {children}
    </div>
  );
} 
