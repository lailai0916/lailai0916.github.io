import React, { type ReactNode, useState } from 'react';
import Layout from '@theme/Layout';
import { PageTitle, PageHeader } from '@site/src/components/laikit/Page';
import DataCard from '@site/src/components/laikit/DataCard';
import Card from '@site/src/components/laikit/Card';
import IconBlock from '@site/src/components/laikit/IconBlock';
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

function FriendCard({ friend }: { friend: FriendItem }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card
      href={friend.href}
      wrapperClassName={styles.friendCard}
      className={styles.friendCardContent}
      padding="1.5rem"
    >
      <div className={styles.friendCardHeader}>
        {!imageError && friend.avatar ? (
          <IconBlock variant="muted" size={60}>
            <img
              src={friend.avatar}
              alt={friend.title}
              className={styles.friendCardImage}
              onError={() => setImageError(true)}
            />
          </IconBlock>
        ) : (
          <IconBlock
            icon="lucide:user"
            variant="muted"
            size={60}
            iconSize={24}
          />
        )}
        <div className={styles.friendCardInfo}>
          <h3 className={styles.friendCardTitle}>{friend.title}</h3>
          <p className={styles.friendCardDescription}>
            {friend.description ?? friend.href}
          </p>
        </div>
      </div>
    </Card>
  );
}

function FriendsMain() {
  return (
    <div className={styles.container}>
      {FRIEND_LIST.map((friend, index) => (
        <FriendCard key={`${friend.title}-${index}`} friend={friend} />
      ))}
    </div>
  );
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
      <FriendsHeader />
      <FriendsMain />
    </Layout>
  );
}
