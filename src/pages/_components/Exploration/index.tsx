import React from 'react';
import styles from '../../styles.module.css';

const exploringItems = [
  { name: '算法竞赛', icon: '🏆', description: '参与算法竞赛，深入学习数据结构与算法，提升逻辑思维能力。' },
  { name: 'Docusaurus', icon: '📖', description: '使用 Docusaurus 构建统一、简约、现代的个人网站。' },
  { name: 'AI 模型', icon: '🤖', description: '深入探索人工智能模型的工作原理，实践机器学习技术应用。' },
  { name: '英语语法', icon: '📝', description: '系统学习英语语法规则，掌握语言结构，提升表达能力。' },
];

export default function Exploration() {
  return (
    <div className={styles.section}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>当前探索</h2>
          </div>
        </div>
        <div className="row">
          {exploringItems.map((item, idx) => (
            <div key={idx} className="col col--3" style={{ marginBottom: '1.5rem' }}>
              <div className="card shadow--md" style={{height: '100%'}}>
                <div className="card__header" style={{textAlign: 'center'}}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                  <h3>{item.name}</h3>
                </div>
                <div className="card__body">
                  <p style={{textAlign: 'center'}}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
