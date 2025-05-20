import React from 'react';
import styles from '../../styles.module.css';

const techStack = [
  { name: 'React', icon: '⚛️' }, // Replace with actual icons or images if desired
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Docusaurus', icon: '🦖' },
  { name: 'Node.js', icon: '🚀' },
  { name: 'Python', icon: '🐍' },
  { name: 'Git', icon: '🌿' },
];

export default function MyTechStackSection() {
  return (
    <div className={styles.section}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>我的技能</h2>
          </div>
        </div>
        <div className="row" style={{ justifyContent: 'center' }}>
          {techStack.map((tech, idx) => (
            <div key={idx} className="col col--2" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <div className="card card--S shadow--md" style={{padding: '1rem'}}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{tech.icon}</div>
                <h4>{tech.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
