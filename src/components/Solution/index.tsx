import React from 'react';
import Link from '@docusaurus/Link';

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
          src={`https://img.shields.io/badge/Luogu-${pidEscaped}-${color}?style=for-the-badge&logo=luogu`}
        />
      </Link>{' '}
      <Link href={`https://www.luogu.com.cn/article/${aid}`}>
        <img
          src={`https://img.shields.io/badge/Luogu-Solution-${color}?style=for-the-badge&logo=luogu`}
        />
      </Link>{' '}
      <Link href={`https://lailai.one/blog/solution/${pid}`}>
        <img
          src={`https://img.shields.io/badge/Blog-Solution-${color}?style=for-the-badge&logo=markdown`}
        />
      </Link>
    </>
  );
}
