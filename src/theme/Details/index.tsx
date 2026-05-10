import React from 'react';
import clsx from 'clsx';
import { Details as DetailsGeneric } from '@docusaurus/theme-common/Details';
import type { Props } from '@theme/Details';
import styles from './styles.module.css';

export default function Details(props: Props): React.ReactElement {
  return (
    <DetailsGeneric
      {...props}
      className={clsx(styles.details, props.className)}
    />
  );
}
