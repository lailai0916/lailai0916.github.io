import React from 'react';

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
    const module = require(`../../problem/${id}.md`);
    const MDXComponent = module.default;
    
    if (MDXComponent) {
      componentCache[id] = MDXComponent;
      return <MDXComponent />;
    } else {
      throw new Error('Module has no default export');
    }
  } catch (error) {
    console.error(`Error loading problem ${id}:`, error);
    return (
      <div style={{ 
        padding: '20px', 
        color: 'red', 
        border: '1px solid #ff6b6b',
        borderRadius: '4px',
        backgroundColor: '#ffe0e0',
        margin: '10px 0'
      }}>
        <strong>错误：</strong> 无法加载题目 {id}
        <br />
        <small>请检查文件 src/problem/{id}.md 是否存在</small>
      </div>
    );
  }
};

export default Problem;
