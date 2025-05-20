import React from 'react';
import styles from '../../styles.module.css';

const tools = [
  { name: 'VS Code', icon: '💻', category: 'Development' },
  { name: 'iTerm2', icon: '⌨️', category: 'Terminal' },
  { name: 'Figma', icon: '🎨', category: 'Design' },
  { name: 'Notion', icon: '📝', category: 'Productivity' },
  { name: 'GitHub', icon: '🐙', category: 'Collaboration' },
  { name: 'Docusaurus', icon: '🦖', category: 'Website' },
];

export default function ToolsIUseSection() {
  return (
    <div className={styles.section}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>我使用的工具</h2>
          </div>
        </div>
        <div className="row" style={{ justifyContent: 'center' }}>
          {tools.map((tool, idx) => (
            <div key={idx} className="col col--2" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <div className="card card--S shadow--md" style={{padding: '1rem', height: '100%'}}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{tool.icon}</div>
                <h4>{tool.name}</h4>
                <small>{tool.category}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
