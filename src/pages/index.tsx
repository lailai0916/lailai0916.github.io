import React, { useEffect, useState, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Icon } from '@iconify/react';
import { translate } from '@docusaurus/Translate';
import clsx from 'clsx';
import Button from '@site/src/components/laikit/Button';
import styles from './styles.module.css';

import Blog from './_components/Blog';
import Countdown from './_components/Countdown';
import FourierTransform from './_components/FourierTransform';
import LorenzAttractor from './_components/LorenzAttractor';
import NeuralNetwork from './_components/NeuralNetwork';
import Bento from './_components/Bento';

const SCROLL_GUIDE_LABEL = translate({
  id: 'home.scrollGuide',
  message: 'Scroll Down',
});

const COVER_TRANSITION_DURATION_MS = 720;

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const [isCoverClosing, setIsCoverClosing] = useState(false);
  const [isCoverDismissed, setIsCoverDismissed] = useState(false);

  useEffect(() => {
    if (isCoverDismissed) return;

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isCoverDismissed]);

  useEffect(() => {
    if (!isCoverClosing) return;

    const timer = window.setTimeout(() => {
      setIsCoverDismissed(true);
      setIsCoverClosing(false);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, COVER_TRANSITION_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [isCoverClosing]);

  const handleRevealHome = () => {
    if (isCoverClosing || isCoverDismissed) return;
    setIsCoverClosing(true);
  };

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <section>
        <Countdown />
        <Blog />
        <NeuralNetwork />
        <FourierTransform />
        <LorenzAttractor />
      </section>

      {!isCoverDismissed && (
        <section
          className={clsx(
            styles.coverHome,
            isCoverClosing && styles.coverHomeClosing
          )}
        >
          <Bento />
          <Button
            variant="secondary"
            size="sm"
            rounded
            className={styles.scrollGuide}
            rightIcon={
              <Icon icon="lucide:chevrons-down" width={16} height={16} />
            }
            onClick={handleRevealHome}
          >
            {SCROLL_GUIDE_LABEL}
          </Button>
        </section>
      )}
    </Layout>
  );
}
