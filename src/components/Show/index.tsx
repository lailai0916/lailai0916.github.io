import React, {type ReactNode} from 'react';
import CodeBlock from '@theme/CodeBlock';
import BrowserWindow from '../BrowserWindow/index';

interface Props {
  lang: string;
  children: ReactNode;
}

export default function Show({ lang, children }: Props): JSX.Element {
  return (
    <div>
      <CodeBlock className={`language-${lang}`}>
        <div dangerouslySetInnerHTML={{ __html: String(children) }} />
      </CodeBlock>
      <BrowserWindow>
        {children}
      </BrowserWindow>
    </div>
  );
}

