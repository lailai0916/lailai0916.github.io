import React from 'react';
import Admonition from '@theme/Admonition';

interface ProblemProps {
  id: string;
}

const componentCache: { [key: string]: React.ComponentType } = {};

const Problem: React.FC<ProblemProps> = ({ id }) => {
  if (componentCache[id]) {
    const CachedComponent = componentCache[id];
    return <CachedComponent />;
  }

  try {
    const module = require(`../../../docs/contest/_problems/${id}.md`);
    const MDXComponent = module.default;
    
    if (MDXComponent) {
      componentCache[id] = MDXComponent;
      return <MDXComponent />;
    } else {
      throw new Error('Module has no default export');
    }
  } catch (error) {
    // 静默处理题目加载错误，只显示错误信息给用户
    return (
      <Admonition type="danger" title={`Error: Unable to load question ${id}`}>
        请检查文件 docs/contest/_problems/{id}.md 是否存在。
      </Admonition>
    );
  }
};

export default Problem;
