/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode} from 'react';

import clsx from 'clsx';

import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export interface Props {
  name: string;
  job: string;
  url: string;
  avatar: string;
  children: ReactNode;
}

export default function Quote({
  name,
  job,
  url,
  avatar,
  children,
}: Props): JSX.Element {
  return (
    <figure className={styles.Quote}>
      <blockquote>
        {children}
      </blockquote>
      <figcaption>
        <Link to={url} rel="nofollow">
          <div className="avatar">
            <img
              alt={name}
              className={clsx('avatar__photo', styles.avatarImg)}
              src={avatar}
              // loading="lazy"
            />
            <div className={clsx('avatar__intro')}>
              <strong className="avatar__name">
                {name}
              </strong>
              <small className="avatar__subtitle" itemProp="description">
                {job}
              </small>
            </div>
          </div>
        </Link>
      </figcaption>
    </figure>
  );
}
