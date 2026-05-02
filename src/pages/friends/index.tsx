import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';
import {
  PageTitle,
  PageHeader,
  PageContent,
} from '@site/src/components/laikit/Page';
import DataCard from '@site/src/components/laikit/DataCard';
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

export default function Friends(): ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <PageHeader>
        <PageTitle title={MODIFICATION} description={DESCRIPTION} />
        <DataCard
          value={FRIEND_LIST.length}
          label={translate({
            id: 'pages.friends.datacard.label',
            message: 'Friends',
          })}
          icon="lucide:users"
        />
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
