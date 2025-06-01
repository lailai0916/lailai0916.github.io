import React from 'react';
import styles from '../../styles.module.css';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

const favoriteQuotes = [
  {
    quote: 'Stay hungry. Stay foolish.',
    author: 'Steve Jobs',
  },
  {
    quote: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
  },
  {
    quote: 'Talk is cheap. Show me the code.',
    author: 'Linus Torvalds',
  },
];

export default function Quote() {
  return (
    <div className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>一些语录</h2>
          </div>
        </div>
        <div className="row">
          {favoriteQuotes.map((item, idx) => (
            <div key={idx} className="col col--4" style={{ marginBottom: '1.5rem' }}>
              <div className="card shadow--md" style={{height: '100%'}}>
                <div className="card__body" style={{ fontStyle: 'italic', fontSize: '1.1rem'}}>
                  <p>“{item.quote}”</p>
                </div>
                <div className="card__footer" style={{textAlign: 'right'}}>
                  <small>- {item.author}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
