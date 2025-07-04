import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import { memo, useRef } from 'react';
import { FriendItem, FRIEND_LIST } from '@site/src/data/friends';

const TITLE = '友链';
const DESCRIPTION = '财富易得，知己难求';
const SUBMIT_URL = 'https://github.com';

function PageHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">{TITLE}</Heading>
      <p>{DESCRIPTION}</p>
      {/* <Link className="button button--primary" to={SUBMIT_URL}>
        🙏 请添加你的网站
      </Link> */}
    </section>
  );
}

const FriendCard = memo(({ friend }: { friend: FriendItem }) => (
  <li className="relative flex min-h-24 cursor-pointer flex-row items-center overflow-hidden rounded-card bg-card px-4 py-1 transition-all duration-300 hover:translate-y-[-5px] hover:scale-[1.01] hover:bg-[rgba(229,231,235,0.3)] hover:shadow-[0_3px_10px_0_rgba(164,190,217,0.3)]">
    <img
      // @ts-ignore
      src={friend.avatar}
      alt={friend.title}
      className="size-16 min-w-16 rounded-full object-contain"
    />
    <div className="pl-4">
      <div className="mb-1 flex items-center">
        <h4 className="mb-0 flex-1">
          <Link to={friend.href} className="bg-[0%_100%] bg-[length:0%_1px] bg-gradient-to-b from-ifm-color-primary to-ifm-color-primary bg-no-repeat no-underline transition-[background-size] duration-200 ease-out hover:bg-[length:100%_1px] focus:bg-[length:100%_1px]">
            {friend.title}
          </Link>
        </h4>
      </div>
      <p className="m-0 line-clamp-2 w-full overflow-hidden text-sm leading-[1.66]">{friend.description}</p>
    </div>
  </li>
));

function FriendCards() {
  return (
    <section className="mt-8 mb-8">
      <div className="mx-auto max-w-6xl px-4 py-2">
        <ul className="grid grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3 ">
          {FRIEND_LIST.map((friend) => (
            <FriendCard key={friend.avatar} friend={friend} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function friendPage() {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <PageHeader />
        <FriendCards />
      </main>
    </Layout>
  );
}
