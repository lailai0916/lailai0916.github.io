import React from 'react';
import styles from '../../styles.module.css';

const exploringItems = [
  { name: 'WebAssembly', icon: '🚀', description: '探索 WebAssembly 在高性能 Web 应用中的潜力。' },
  { name: 'Rust 编程语言', icon: '🦀', description: '学习 Rust 以构建更安全、并发的系统软件。' },
  { name: '《设计模式》', icon: '📚', description: '重温经典，提升代码设计能力。' },
  { name: 'AI 绘画', icon: '🎨', description: '尝试使用 AI 工具进行艺术创作。' },
];

export default function CurrentlyExploringSection() {
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
