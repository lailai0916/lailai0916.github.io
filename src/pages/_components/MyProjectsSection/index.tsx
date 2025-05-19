import React from 'react';
import styles from '../../styles.module.css';
import Link from '@docusaurus/Link';

const projects = [
  {
    title: '项目一',
    description: 'This is a test.',
    link: '/docs/project/test',
  },
  {
    title: '项目二',
    description: 'This is a test.',
    link: '/docs/project/test',
  },
  {
    title: '项目三',
    description: 'This is a test.',
    link: '/docs/project/test',
  },
];

export default function MyProjectsSection() {
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
