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
import styles from './styles.module.css';

const TITLE = '友链';
const DESCRIPTION = '真正的友谊是世上最稀有的东西';
const FOOTER = '感谢每位朋友的陪伴和支持，也欢迎大家联系我添加友链。';

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
    <section className={styles.friendsSection}>
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
      <PageTitle title="我的<b>友链</b>" description={DESCRIPTION} />
      <DataCard value={totalFriends} label="位朋友" icon="lucide:users" />
    </PageHeader>
  );
}

export default function Friends(): ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <PageMain>
        <FriendsHeader />
        <div className={styles.container}>
          <FriendGrid />
        </div>
        <FriendsFooter />
      </PageMain>
    </Layout>
  );
}
