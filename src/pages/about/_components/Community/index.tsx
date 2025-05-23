import React from 'react';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import { SOCIAL_LINKS } from '@site/src/data/social.tsx';
import styles from './styles.module.css';

export default function Community() {
  return (
    <div className={styles.item}>
      {SOCIAL_LINKS.map((link, index) => (
        <div key={index}>
          <Icon icon={link.icon} width="1.25rem" height="1.25rem" />
          <Link to={link.href}>{link.text}</Link>
        </div>
      ))}
    </div>
  );
}
