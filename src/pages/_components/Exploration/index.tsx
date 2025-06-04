import React from 'react';
import styles from '../../styles.module.css';
import { CardGrid, CardItem } from '../common/CardGrid';

const exploringItems = [
  { name: '算法竞赛', icon: '🏆', description: '参与算法竞赛，深入学习数据结构与算法，提升逻辑思维能力。' },
  { name: 'Docusaurus', icon: '📖', description: '使用 Docusaurus 构建统一、简约、现代的个人网站。' },
  { name: 'AI 模型', icon: '🤖', description: '深入探索人工智能模型的工作原理，实践机器学习技术应用。' },
  { name: '英语语法', icon: '📝', description: '系统学习英语语法规则，掌握语言结构，提升表达能力。' },
];

export default function Exploration() {
  return (
    <CardGrid title="当前探索">
      {exploringItems.map((item, idx) => (
        <CardItem key={idx} colSize="col--3">
          <div className={`card shadow--md ${styles.fullHeightCard}`}>
            <div className={`card__header ${styles.centerContent}`}>
              <div className={styles.cardIcon}>{item.icon}</div>
              <h3>{item.name}</h3>
            </div>
            <div className="card__body">
              <p className={styles.centerContent}>{item.description}</p>
            </div>
          </div>
        </CardItem>
      ))}
    </CardGrid>
  );
}
