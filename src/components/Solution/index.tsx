import React from 'react';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';

const luogu = translate({ id: 'components.solution.luogu', message: 'Luogu' });
const blog = translate({ id: 'components.solution.blog', message: 'Blog' });
const solution = translate({
  id: 'components.solution.solution',
  message: 'Solution',
});

export default function Solution({ pid, aid }: { pid: string; aid: string }) {
  const [color, setColor] = React.useState('');
  React.useEffect(() => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue('--ifm-color-primary')
      .trim();
    setColor(value.slice(1));
  }, []);
  const pidEscaped = pid.replace(/_/g, '__');

  return (
    <>
      <Link href={`https://www.luogu.com.cn/problem/${pid}`}>
        <img
          src={`https://img.shields.io/badge/${luogu}-${pidEscaped}-${color}?style=for-the-badge&logo=luogu`}
        />
      </Link>{' '}
      <Link href={`https://www.luogu.com.cn/article/${aid}`}>
        <img
          src={`https://img.shields.io/badge/${luogu}-${solution}-${color}?style=for-the-badge&logo=luogu`}
        />
      </Link>{' '}
      <Link href={`https://lailai.one/blog/solution/${pid}`}>
        <img
          src={`https://img.shields.io/badge/${blog}-${solution}-${color}?style=for-the-badge&logo=markdown`}
        />
      </Link>
    </>
  );
}
