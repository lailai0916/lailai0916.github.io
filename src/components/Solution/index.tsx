import React from 'react';
import Link from '@docusaurus/Link';

export default function Solution({ pid, aid }: { pid: string; aid: string }) {
  const pidEscaped = pid.replace(/_/g, '__');

  return (
    <>
      <Link to={`https://www.luogu.com.cn/problem/${pid}`}>
        <img
          src={`https://img.shields.io/badge/Luogu-${pidEscaped}-blue?style=for-the-badge&logo=codeforces`}
        />
      </Link>{' '}
      <Link to={`https://www.luogu.com.cn/article/${aid}`}>
        <img
          src={`https://img.shields.io/badge/Luogu-Solution-blue?style=for-the-badge&logo=markdown`}
        />
      </Link>{' '}
      <Link to={`https://lailai.one/blog/solution/${pid}`}>
        <img
          src={`https://img.shields.io/badge/Blog-Solution-blue?style=for-the-badge&logo=markdown`}
        />
      </Link>
    </>
  );
}
