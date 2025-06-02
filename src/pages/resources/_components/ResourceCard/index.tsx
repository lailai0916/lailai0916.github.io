import Link from '@docusaurus/Link'
import clsx from 'clsx'
import React, { memo } from 'react'

import type { Resource } from '@site/src/data/resources'
import styles from './styles.module.css'

const ResourceCard = memo(({ resource }: { resource: Resource }) => (
  <li key={resource.name} className={clsx(styles.resourceCard, 'padding-vert--sm padding-horiz--md')}>
    <img
      src={typeof resource.logo === 'string' ? resource.logo : (resource.logo as { src: { src: string } })?.src?.src}
      alt={resource.name}
      className={styles.resourceCardImage}
    />
    <div className={styles.resourceCardBody}>
      <div className={styles.resourceCardHeader}>
        <h4 className={styles.resourceCardTitle}>
          <Link href={resource.href}>
            {resource.name}
          </Link>
        </h4>
      </div>
      <p className={styles.resourceCardDesc}>{resource.desc}</p>
    </div>
  </li>
))

export default ResourceCard
