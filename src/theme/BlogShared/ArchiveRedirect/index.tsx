import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import { Redirect } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

const ARCHIVE_LINK = translate({
  id: 'blog.archive.redirect.link',
  message: 'Browse the Archive',
});

export default function ArchiveRedirect({ title }: { title: string }) {
  const archiveUrl = useBaseUrl('/blog/archive');
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={title}>
      <Head>
        <meta httpEquiv="refresh" content={`0;url=${archiveUrl}`} />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={new URL(archiveUrl, siteConfig.url).href} />
      </Head>
      <main className="container margin-vert--lg">
        <h1>{title}</h1>
        <Link to={archiveUrl}>{ARCHIVE_LINK}</Link>
      </main>
      <Redirect to={archiveUrl} />
    </Layout>
  );
}
