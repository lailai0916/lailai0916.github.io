import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

const STORAGE_KEY = 'cookie-consent';

type ConsentValue = 'accepted' | 'rejected';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== 'accepted' && stored !== 'rejected') {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handleChoice = (value: ConsentValue) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className={styles.banner}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div className={styles.content}>
        <div className={styles.title}>
          <Translate id="cookieConsent.title">Cookie Settings</Translate>
        </div>
        <p className={styles.description}>
          <Translate
            id="cookieConsent.description"
            values={{
              learnMore: (
                <Link to="/privacy" className={styles.link}>
                  <Translate id="cookieConsent.learnMore">Learn more</Translate>
                </Link>
              ),
            }}
          >
            {
              'This site uses cookies to remember your preferences and improve your browsing experience. {learnMore}.'
            }
          </Translate>
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.button} ${styles.reject}`}
            onClick={() => handleChoice('rejected')}
          >
            <Translate id="cookieConsent.reject">Reject</Translate>
          </button>
          <button
            type="button"
            className={`${styles.button} ${styles.accept}`}
            onClick={() => handleChoice('accepted')}
          >
            <Translate id="cookieConsent.accept">Accept</Translate>
          </button>
        </div>
      </div>
    </div>
  );
}
