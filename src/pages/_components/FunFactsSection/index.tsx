import React from 'react';
import styles from '../../styles.module.css';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

const funFacts = [
  {
    id: 1,
    text: '我曾经为了调试一个 Bug 连续编码 24 小时没睡觉！',
    emoji: '😴'
  },
  {
    id: 2,
    text: '我最喜欢的代码编辑器主题是月夜 (Moonlight)。',
    emoji: '🌙'
  },
  {
    id: 3,
    text: '除了编程，我还喜欢在 LeetCode 上刷算法题。',
    emoji: '🎮'
  },
  {
    id: 4,
    text: '我的 GitHub Contributions 图表曾经全绿过一个月！',
    emoji: '🟩'
  },
];

export default function FunFactsSection() {
  return (
    <div className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>一些趣事</h2>
          </div>
        </div>
        <div className="row">
          {funFacts.map((fact) => (
            <div key={fact.id} className="col col--6" style={{ marginBottom: '1.5rem' }}>
              <div className="card shadow--md">
                <div className="card__body" style={{display: 'flex', alignItems: 'center'}}>
                  <span style={{fontSize: '2rem', marginRight: '1rem'}}>{fact.emoji}</span>
                  <p style={{margin: 0}}>{fact.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col col--12" style={{textAlign: 'center', marginTop: '1rem'}}>
            <Link className="button button--info" to="/about">
              了解更多关于我
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
