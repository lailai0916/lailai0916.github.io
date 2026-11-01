import { type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Icon from '@lailai0916/ui/Icon';
import { PageTitle, PageHeader, PageContent } from '@lailai0916/ui/Page';
import Button from '@lailai0916/ui/Button';
import Card from '@lailai0916/ui/Card';
import { FRIEND_LIST } from '@site/src/data/friends';
import { translate } from '@docusaurus/Translate';
import { trackEvent } from '@site/src/utils/analytics';
import { FriendAvatar, FriendFeed } from './_components';
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
const REQUEST_LINK = translate({
  id: 'pages.friends.requestLink',
  message: 'Request a Link',
});
const REQUEST_SUBJECT = translate({
  id: 'pages.friends.requestSubject',
  message: 'Friend Link Request',
});

const REQUEST_TEMPLATE = `title: "lailai's Home",
description: 'Student & Developer',
href: 'https://lailai.one',
avatar: 'https://lailai.one/img/logo.png',
rss: 'https://lailai.one/blog/rss.xml',`;
const REQUEST_LINK_EMAIL = `mailto:lailai0x394@gmail.com?subject=${encodeURIComponent(
  REQUEST_SUBJECT
)}&body=${encodeURIComponent(REQUEST_TEMPLATE)}`;

export default function Friends(): ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <PageHeader>
        <PageTitle title={MODIFICATION} description={DESCRIPTION} />
        <Button
          variant="secondary"
          leftIcon={<Icon icon="lucide:link-2" width={16} height={16} />}
          onClick={() => {
            trackEvent('contact_click', {
              surface: 'friends',
              contact: 'email',
              item_id: 'friend_link_request',
            });
            window.location.href = REQUEST_LINK_EMAIL;
          }}
        >
          {REQUEST_LINK}
        </Button>
      </PageHeader>
      <PageContent className="site-page-content">
        <div className={styles.layout}>
          {FRIEND_LIST.map((friend) => (
            <Card
              key={friend.id}
              href={friend.href}
              data-analytics-surface="friends"
              data-analytics-id={friend.id}
              padding="1.25rem"
              className={styles.friendCard}
              wrapperClassName={styles.friendLink}
            >
              <FriendAvatar src={friend.avatar} className={styles.avatar} loading="lazy" />
              <div className={styles.cardBody}>
                <h2 className={styles.friendName}>{friend.title}</h2>
                <p className={styles.friendDescription}>{friend.description ?? friend.href}</p>
              </div>
              <span className={styles.arrow} aria-hidden>
                <Icon icon="lucide:arrow-up-right" />
              </span>
            </Card>
          ))}
        </div>
        <FriendFeed />
      </PageContent>
    </Layout>
  );
}
