/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {ReactNode} from 'react';
import clsx from 'clsx';
import {sortedUsers, type User} from '@site/src/data/sites';
import Heading from '@theme/Heading';
import FavoriteIcon from '../FavoriteIcon';
import SiteCard from '../SiteCard';
import {useFilteredUsers} from '../../_utils';

import styles from './styles.module.css';

const favoriteUsers = sortedUsers.filter((user) =>
  user.tags.includes('favorite'),
);

const otherUsers = sortedUsers.filter(
  (user) => !user.tags.includes('favorite'),
);

function HeadingNoResult() {
  return (
    <Heading as="h2">
      无结果
    </Heading>
  );
}

function HeadingFavorites() {
  return (
    <Heading as="h2" className={styles.headingFavorites}>
      我的最爱
    <FavoriteIcon size="large" style={{marginLeft: '1rem'}} />
    </Heading>
  );
}

function HeadingAllSites() {
  return (
    <Heading as="h2">
      所有网站
    </Heading>
  );
}

function CardList({heading, items}: {heading?: ReactNode; items: User[]}) {
  return (
    <div className="container">
      {heading}
      <ul className={clsx('clean-list', styles.cardList)}>
        {items.map((item) => (
          <SiteCard key={item.title} user={item} />
        ))}
      </ul>
    </div>
  );
}

function NoResultSection() {
  return (
    <section className="margin-top--lg margin-bottom--xl">
      <div className="container padding-vert--md text--center">
        <HeadingNoResult />
      </div>
    </section>
  );
}

export default function SiteCards() {
  const filteredUsers = useFilteredUsers();

  if (filteredUsers.length === 0) {
    return <NoResultSection />;
  }

  return (
    <section className="margin-top--lg margin-bottom--xl">
      {filteredUsers.length === sortedUsers.length ? (
        <>
          <div className={styles.siteFavorite}>
            <CardList heading={<HeadingFavorites />} items={favoriteUsers} />
          </div>
          <div className="margin-top--lg">
            <CardList heading={<HeadingAllSites />} items={otherUsers} />
          </div>
        </>
      ) : (
        <CardList items={filteredUsers} />
      )}
    </section>
  );
}
