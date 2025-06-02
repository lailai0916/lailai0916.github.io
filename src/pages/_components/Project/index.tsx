import React from 'react';
import styles from '../../styles.module.css';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

const projects = [
  {
    title: 'lailai\'s Home',
    description: '基于 Docusaurus 构建的个人网站。',
    link: '/docs/project/GitHub/lailais-Home/README',
  },
  {
    title: 'iGame',
    description: '基于 C++ 的终端游戏。',
    link: '/docs/project/终端/iGame',
  },
  {
    title: 'iClock',
    description: '基于 Desmos 的数学艺术作品。',
    link: '/docs/project/Desmos/艺术博览会/iClock',
  },
];

export default function Project() {
  return (
    <div className={styles.section}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>我的项目</h2>
          </div>
        </div>
        <div className="row">
          {projects.map((project, idx) => (
            <div key={idx} className="col col--4" style={{marginBottom: '1.5rem'}}>
              <div className="card shadow--md">
                <div className="card__header">
                  <h3>{project.title}</h3>
                </div>
                <div className="card__body">
                  <p>{project.description}</p>
                </div>
                <div className="card__footer">
                  <Link
                    className="button button--primary button--block"
                    to={project.link}>
                    查看详情
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
