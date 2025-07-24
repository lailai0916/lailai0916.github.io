import React, { type ReactNode, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { Icon } from '@iconify/react';
import PageHeader from '@site/src/components/laiKit/page/PageHeader';
import PageTitle from '@site/src/components/laiKit/page/PageTitle';
import DataCard from '@site/src/components/laiKit/widget/DataCard';
import IconText from '@site/src/components/laiKit/widget/IconText';
import { FriendItem, FRIEND_LIST } from '@site/src/data/friends';
import styles from './styles.module.css';

const TITLE = '友链';
const DESCRIPTION = '真正的友谊是世上最稀有的东西。';

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
            <IconText icon="lucide:external-link">访问网站</IconText>
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
  return (
    <div className={styles.pageFooter}>
      <div className={styles.footerContent}>
        <p className={styles.footerText}>
          <IconText icon="lucide:heart">感谢每一位朋友的陪伴与支持</IconText>
        </p>
      </div>
    </div>
  );
}

function FriendsHeader() {
  const totalFriends = FRIEND_LIST.length;
  return (
    <PageHeader>
      <PageTitle
        title={
          <>
            我的<b>友链</b>
          </>
        }
        description={DESCRIPTION}
      />
      <DataCard value={totalFriends} label="位朋友" icon="lucide:users" />
    </PageHeader>
  );
}

export default function Friends(): ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className={styles.main}>
        <FriendsHeader />
        <div className={styles.container}>
          <FriendGrid />
          <FriendsFooter />
        </div>
      </main>
    </Layout>
  );
}
