import React, { useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import ColorGenerator from './_components/ColorGenerator';
import Confetti from './_components/Confetti';

const TITLE = '设置';
const DESCRIPTION = '🎉 恭喜你发现了一个彩蛋页面 🥳';

function PageHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">{TITLE}</Heading>
      <p>{DESCRIPTION}</p>
    </section>
  );
}

export default function setPage(): JSX.Element {
  useEffect(() => {
    Confetti();
  }, []);

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <PageHeader />
        <ColorGenerator />
      </main>
    </Layout>
  );
}
