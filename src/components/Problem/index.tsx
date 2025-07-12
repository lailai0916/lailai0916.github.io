import React, { useMemo } from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@theme/Details';
import CodeBlock from '@theme/CodeBlock';
import Admonition from '@theme/Admonition';
import { translate } from '@docusaurus/Translate';

declare const require: any;

const ctx = require.context(
  '!!raw-loader!@site/docs/contest/_problems',
  true,
  /\.cpp$/
);

export default function Problem({ id }: { id: string }) {
  let MDX: React.ComponentType;
  try {
    MDX = require(`@site/docs/contest/_problems/${id}/index.md`).default;
  } catch {
    return (
      <Admonition type="warning">
        {translate(
          {
            id: 'components.problem.warn',
            message:
              'Unable to load question {id}: please check if the file exists.',
          },
          { id }
        )}
      </Admonition>
    );
  }

  const codes = useMemo(
    () =>
      ctx
        .keys()
        .filter((p) => p.includes(`/${id}/`))
        .map((p) => ({
          title: p
            .split('/')
            .pop()!
            .replace(/\.cpp$/, ''),
          code: ctx(p).default,
        }))
        .sort((a, b) => a.title.localeCompare(b.title)),
    [id]
  );

  return (
    <div>
      {React.createElement(MDX)}
      {codes.length > 0 && (
        <Details
          summary={translate({
            id: 'components.problem.summary',
            message: 'Reference Code',
          })}
        >
          {codes.length === 1 ? (
            <CodeBlock language="cpp">{codes[0].code}</CodeBlock>
          ) : (
            <Tabs>
              {codes.map(({ title, code }) => (
                <TabItem key={title} value={title} label={title}>
                  <CodeBlock language="cpp">{code}</CodeBlock>
                </TabItem>
              ))}
            </Tabs>
          )}
        </Details>
      )}
    </div>
  );
}
