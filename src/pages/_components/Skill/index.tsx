import React from 'react';
import styles from '../../styles.module.css';

const techStack = [
  { name: 'C', icon: 'c' },
  { name: 'C++', icon: 'cpp' },
  { name: 'Python', icon: 'py' },
  { name: 'Java', icon: 'java' },
  { name: 'Markdown', icon: 'md' },
  { name: 'Latex', icon: 'latex' },
  { name: 'HTML', icon: 'html' },
  { name: 'CSS', icon: 'css' },
  { name: 'JavaScript', icon: 'js' },
  { name: 'TypeScript', icon: 'ts' },
  { name: 'React', icon: 'react' },
  { name: 'Tailwind CSS', icon: 'tailwind' },
];

export default function Skill() {
  return (
    <div className={styles.section}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 className={styles.centerTitle}>我的技能</h2>
          </div>
        </div>
        <div className={`row ${styles.sectionRow}`}>
          {techStack.map((tech, idx) => (
            <div key={idx} className={`col col--2 ${styles.cardContainer} ${styles.centerContent}`}>
              <div className={`card card--S shadow--md ${styles.skillCard}`}>
                <div className={styles.cardIcon}>
                  <img 
                    src={`https://skillicons.dev/icons?i=${tech.icon}&theme=light#gh-light-mode-only`} 
                    alt={tech.name} 
                    className={styles.skillIcon}
                  />
                  <img 
                    src={`https://skillicons.dev/icons?i=${tech.icon}&theme=dark#gh-dark-mode-only`} 
                    alt={tech.name} 
                    className={styles.skillIcon}
                  />
                </div>
                <h4 className={styles.noMargin}>{tech.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
