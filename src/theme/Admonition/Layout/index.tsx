import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import type { Props } from '@theme/Admonition/Layout';
import styles from './styles.module.css';

export default function AdmonitionLayout(props: Props): React.ReactElement {
  const { type, icon, title, children, className, id } = props;
  return (
    <div
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(type),
        styles.admonition,
        className
      )}
      id={id}
    >
      {(title || icon) && (
        <div className={styles.heading}>
          {icon && <span className={styles.icon}>{icon}</span>}
          {title && <span>{title}</span>}
        </div>
      )}
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
}
