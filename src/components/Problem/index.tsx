import React, { useMemo } from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Details from '@theme/Details';
import CodeBlock from '@theme/CodeBlock';
import Admonition from '@theme/Admonition';
import { translate } from '@docusaurus/Translate';

declare const require: any;
const ctx = require.context(
  '!!raw-loader!@site/docs/_problems',
  true,
  /\.cpp$/
);

export function GetCode({ id }: { id: string }) {
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
    <>
      {codes.length > 0 && (
        <Details
          summary={translate(
            {
              id: 'components.problems.code',
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
                <TabItem key={title} value={title} label={title}>
                  <CodeBlock language="cpp">{code}</CodeBlock>
                </TabItem>
              ))}
            </Tabs>
          )}
        </Details>
      )}
    </>
  );
}

export function GetSolution({ id }: { id: string }) {
  let SOL: React.ComponentType;
  try {
    SOL = require(`@site/blog/solution/${id}.md`).default;
  } catch {
    return <></>;
  }
  return (
    <Details
      summary={translate({
        id: 'components.problems.solution',
        message: 'Solution',
      })}
    >
      {React.createElement(SOL)}
    </Details>
  );
}

export default function Problem({ id }: { id: string }) {
  let MDX: React.ComponentType;
  try {
    MDX = require(`@site/docs/_problems/${id}/index.md`).default;
  } catch {
    return (
      <Admonition type="warning">
        {translate(
          {
            id: 'components.problems.error',
            message:
              'Unable to load problem {id}: please check if the file exists.',
          },
          { id }
        )}
      </Admonition>
    );
  }

  return (
    <>
      {React.createElement(MDX)}
      <GetSolution id={id} />
      <GetCode id={id} />
    </>
  );
}
