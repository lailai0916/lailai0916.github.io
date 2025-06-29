import React from 'react';
import Admonition from '@theme/Admonition';
import { translate } from '@docusaurus/Translate';

const componentCache = new Map<string, React.ComponentType>();

const Problem = ({ id }: { id: string }) => {
  // 检查缓存
  const cachedComponent = componentCache.get(id);
  if (cachedComponent) {
    return React.createElement(cachedComponent);
  }

  try {
    const module = require(`../../../docs/contest/_problems/${id}.md`);
    const MDXComponent = module.default;
    
    if (!MDXComponent) {
      throw new Error('Module has no default export');
    }

    componentCache.set(id, MDXComponent);
    return React.createElement(MDXComponent);
  } catch {
    return (
      <Admonition type="danger" title={translate({ id: 'components.problem.error.title',message: 'Error: Unable to load question {id}' }, { id })}>
        {translate({ id: 'components.problem.error.content', message: 'Please check if the file "docs/contest/_problems/{id}.md" exists.' }, { id })}
      </Admonition>
    );
  }
};

export default Problem;
