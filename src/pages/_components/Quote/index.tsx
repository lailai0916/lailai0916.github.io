import React from 'react';
import styles from '../../styles.module.css';
import { CardGrid, CardItem } from '../common/CardGrid';

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
    <CardGrid title="一些语录" hasAltBackground>
      {favoriteQuotes.map((item, idx) => (
        <CardItem key={idx}>
          <div className={`card shadow--md ${styles.fullHeightCard}`}>
            <div className={`card__body ${styles.quoteBody}`}>
              <p>"{item.quote}"</p>
            </div>
            <div className={`card__footer ${styles.quoteFooter}`}>
              <small>- {item.author}</small>
            </div>
          </div>
        </CardItem>
      ))}
    </CardGrid>
  );
}
