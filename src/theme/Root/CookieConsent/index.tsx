import { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import Button from '@site/src/components/laikit/Button';
import styles from './styles.module.css';

const STORAGE_KEY = 'cookie-consent';

type ConsentValue = 'accepted' | 'rejected';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

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
      // Ignore storage errors (private mode, etc.)
    }
    // Play the exit along the same path it entered, then unmount on animationend.
    setExiting(true);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div
        className={exiting ? `${styles.backdrop} ${styles.backdropExiting}` : styles.backdrop}
        aria-hidden="true"
      />
      <div
        className={exiting ? `${styles.sheet} ${styles.sheetExiting}` : styles.sheet}
        role="dialog"
        aria-modal="false"
        aria-labelledby="cookie-consent-title"
        onAnimationEnd={() => {
          if (exiting) setVisible(false);
        }}
      >
        <h2 id="cookie-consent-title" className={styles.title}>
          <Translate id="components.cookieConsent.title">Cookie Settings</Translate>
        </h2>
        <p className={styles.description}>
          <Translate
            id="components.cookieConsent.description"
            values={{
              privacyPolicy: (
                <Link to="/privacy" className={styles.link}>
                  <Translate id="components.cookieConsent.privacyPolicy">Privacy Policy</Translate>
                </Link>
              ),
            }}
          >
            {
              'This site uses cookies to remember your preferences and improve your browsing experience. See the {privacyPolicy} for more information.'
            }
          </Translate>
        </p>
        <div className={styles.actions}>
          <Button variant="secondary" rounded fullWidth onClick={() => handleChoice('rejected')}>
            <Translate id="components.cookieConsent.reject">Reject</Translate>
          </Button>
          <Button variant="primary" rounded fullWidth onClick={() => handleChoice('accepted')}>
            <Translate id="components.cookieConsent.accept">Accept</Translate>
          </Button>
        </div>
      </div>
    </div>
  );
}
