import React, { type ReactNode, useState } from 'react';
import Layout from '@theme/Layout';

import {
  PageTitle,
  PageMain,
  PageHeader,
  PageFooter,
} from '@site/src/components/laikit/page';
import DataCard from '@site/src/components/laikit/widget/DataCard';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import { FriendItem, FRIEND_LIST } from '@site/src/data/friends';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

const TITLE = translate({
  id: 'pages.friends.title',
  message: 'Friends',
});
const DESCRIPTION = translate({
  id: 'pages.friends.description',
  message: 'True friendship is the rarest thing in the world',
});
const MODIFICATION = translate({
  id: 'pages.friends.modification',
  message: 'My <b>Friends</b>',
});
const FOOTER = translate({
  id: 'pages.friends.footer',
  message:
    'Thank you for the companionship and support of each friend, and welcome everyone to contact me to add a friend link.',
});

// 友链卡片组件
function FriendCard({ friend }: { friend: FriendItem }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link to={friend.href} className={styles.friendCard}>
      <div className={styles.friendCardContent}>
        <div className={styles.friendCardHeader}>
          <div className={styles.friendCardAvatar}>
            {!imageError && friend.avatar ? (
              <img
                src={friend.avatar}
                alt={friend.title}
                className={styles.friendCardImage}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className={styles.friendCardFallback}>
                <Icon icon="lucide:user" width={24} height={24} />
              </div>
            )}
          </div>
          <div className={styles.friendCardInfo}>
            <h3 className={styles.friendCardTitle}>{friend.title}</h3>
            <p className={styles.friendCardDescription}>{friend.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

// 友链网格组件
function FriendGrid() {
  return (
    <section className={styles.container}>
      <div className={styles.friendsGrid}>
        {FRIEND_LIST.map((friend, index) => (
          <FriendCard key={`${friend.title}-${index}`} friend={friend} />
        ))}
      </div>
    </section>
  );
}

function FriendsFooter() {
  return <PageFooter>{FOOTER}</PageFooter>;
}

function FriendsHeader() {
  const totalFriends = FRIEND_LIST.length;
  return (
    <PageHeader>
      <PageTitle title={MODIFICATION} description={DESCRIPTION} />
      <DataCard
        value={totalFriends}
        label={translate({
          id: 'pages.friends.datacard.label',
          message: 'Friends',
        })}
        icon="lucide:users"
      />
    </PageHeader>
  );
}

export default function Friends(): ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <PageMain>
        <FriendsHeader />
        <FriendGrid />
        <FriendsFooter />
      </PageMain>
    </Layout>
  );
}
