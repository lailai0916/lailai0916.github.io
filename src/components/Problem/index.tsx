import React, { useMemo } from 'react';
import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@theme/Details';
import CodeBlock from '@theme/CodeBlock';
import Admonition from '@theme/Admonition';
import { translate } from '@docusaurus/Translate';

declare const require: any;
const ctx = require.context('!!raw-loader!@site/src/problems', true, /\.cpp$/);

function GetCode({ id }: { id: string }) {
  const formatTitle = (p: string) =>
    p
      .slice(p.lastIndexOf('/') + 1)
      .replace(/\.cpp$/, '')
      .replace(/_/g, ' ');

  const codes = useMemo(() => {
    return ctx
      .keys()
      .filter((p) => p.includes(`/${id}/`))
      .map((p) => ({
        title: formatTitle(p),
        code: ctx(p).default,
      }))
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [id]);

  if (codes.length === 0) return <></>;

  return (
    <Details
      summary={translate(
        {
          id: 'components.problem.code',
          message: 'Code ({num})',
        },
        { num: codes.length }
      )}
    >
      {codes.length === 1 ? (
        <CodeBlock language="cpp">{codes[0].code}</CodeBlock>
      ) : (
        <Tabs>
          {codes.map(({ title, code }) => (
            <TabItem key={title} value={title}>
              <CodeBlock language="cpp">{code}</CodeBlock>
            </TabItem>
          ))}
        </Tabs>
      )}
    </Details>
  );
}

function GetSolution({ id }: { id: string }) {
  let mdxModule: any;
  try {
    mdxModule = require(`@site/src/solution/${id}.md`);
  } catch {
    return <></>;
  }
  const { default: SOL } = mdxModule;

  return (
    <Details
      summary={translate({
        id: 'components.problem.solution',
        message: 'Solution',
      })}
    >
      {React.createElement(SOL)}
    </Details>
  );
}

export default function Problem({ id }: { id: string }) {
  let mdxModule: any;
  try {
    mdxModule = require(`@site/docs/problems/${id}/index.md`);
  } catch {
    return (
      <Admonition type="warning">
        {translate(
          {
            id: 'components.problem.error',
            message: 'Unable to load problem {id}.',
          },
          { id }
        )}
      </Admonition>
    );
  }
  const { default: MDX, frontMatter } = mdxModule;
  const { title = id, link } = frontMatter;

  return (
    <Admonition
      type="example"
      title={link ? <Link href={link}>{title}</Link> : title}
    >
      {React.createElement(MDX)}
      <GetSolution id={id} />
      <GetCode id={id} />
    </Admonition>
  );
}
