import { type ReactNode } from 'react';
import Layout from '@theme/Layout';
import { Icon } from '@iconify/react';
import { PageTitle, PageHeader, PageContent } from '@site/src/components/laikit/Page';
import Button from '@site/src/components/laikit/Button';
import LinkCard from '@site/src/components/laikit/LinkCard';
import { FRIEND_LIST } from '@site/src/data/friends';
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
avatar: 'https://lailai.one/img/logo.png',`;
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
            window.location.href = REQUEST_LINK_EMAIL;
          }}
        >
          {REQUEST_LINK}
        </Button>
      </PageHeader>
      <PageContent className={styles.layout}>
        {FRIEND_LIST.map((friend, index) => (
          <LinkCard
            key={`${friend.title}-${index}`}
            href={friend.href}
            title={friend.title}
            description={friend.description ?? friend.href}
            image={friend.avatar}
            imageVariant="avatar"
            fallbackIcon="lucide:user"
          />
        ))}
      </PageContent>
    </Layout>
  );
}
