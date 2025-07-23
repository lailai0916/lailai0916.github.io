import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

import { FriendItem, FRIEND_LIST } from '@site/src/data/friends';
import IconText from '@site/src/components/IconText';
import styles from './styles.module.css';

const TITLE = '友链';
const DESCRIPTION = '真正的友谊是世上最稀有的东西。';

function MainContent() {
  const totalFriends = FRIEND_LIST.length;

  return (
    <div className={styles.quickStats}>
      <div className={styles.quickStatsInner}>
        <div className={styles.leftContent}>
          <Heading as="h1" className={styles.mainTitle}>
            我的<span className={styles.highlight}>友链</span>
          </Heading>
          <p className={styles.mainDescription}>{DESCRIPTION}</p>
        </div>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Icon icon="lucide:users" width={20} height={20} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{totalFriends}</div>
              <div className={styles.statLabel}>位朋友</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
        <div className={styles.friendCardFooter}>
          <div className={styles.friendCardLink}>
            <IconText icon="lucide:external-link" colorMode="monochrome">
              访问网站
            </IconText>
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

// 页面底部说明
function PageFooter() {
  return (
    <div className={styles.pageFooter}>
      <div className={styles.footerContent}>
        <p className={styles.footerText}>
          <IconText icon="lucide:heart" colorMode="monochrome">
            感谢每一位朋友的陪伴与支持
          </IconText>
        </p>
      </div>
    </div>
  );
}

export default function FriendsPage() {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className={styles.main}>
        <MainContent />
        <div className={styles.container}>
          <FriendGrid />
          <PageFooter />
        </div>
      </main>
    </Layout>
  );
}
