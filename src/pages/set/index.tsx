import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import ColorGenerator from '@site/src/components/ColorGenerator';

const TITLE = '设置';
const DESCRIPTION = '🎉 恭喜你发现了一个彩蛋页面 🥳';

function SetHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">{TITLE}</Heading>
      <p>{DESCRIPTION}</p>
    </section>
  )
}

export default function FriendLink(): JSX.Element {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <SetHeader />
        <ColorGenerator />
      </main>
    </Layout>
  );
}
