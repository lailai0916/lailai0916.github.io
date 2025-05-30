import React from 'react';
import styles from '../../styles.module.css';

const techStack = [
  { name: 'C++', icon: 'cpp' },
  { name: 'Python', icon: 'py' },
  { name: 'React', icon: 'react' },
  { name: 'TypeScript', icon: 'ts' },
  { name: 'Latex', icon: 'latex' },
  { name: 'Git', icon: 'git' },
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
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  <img 
                    src={`https://skillicons.dev/icons?i=${tech.icon}&theme=light#gh-light-mode-only`} 
                    alt={tech.name} 
                    style={{ width: '48px', height: '48px' }}
                  />
                  <img 
                    src={`https://skillicons.dev/icons?i=${tech.icon}&theme=dark#gh-dark-mode-only`} 
                    alt={tech.name} 
                    style={{ width: '48px', height: '48px' }}
                  />
                </div>
                <h4>{tech.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
