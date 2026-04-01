import React, { useEffect, useState, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Icon } from '@iconify/react';
import { translate } from '@docusaurus/Translate';
import clsx from 'clsx';
import styles from './styles.module.css';

import Hero from './_components/Hero';
import TopBanner from './_components/TopBanner';
import HeroBanner from './_components/HeroBanner';
import Docs from './_components/Docs';
import Blog from './_components/Blog';
import Countdown from './_components/Countdown';
import Project from './_components/Project';
import Skills from './_components/Skills';
import Exploration from './_components/Exploration';
import FourierTransform from './_components/FourierTransform';
import NeuralNetwork from './_components/NeuralNetwork';
import Community from './_components/Community';

const SCROLL_GUIDE_LABEL = translate({
  id: 'home.new.scrollGuide',
  message: 'Scroll Down to Home',
});

const COVER_TRANSITION_DURATION_MS = 720;

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const [isCoverClosing, setIsCoverClosing] = useState(false);
  const [isCoverDismissed, setIsCoverDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

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
    if (typeof window === 'undefined' || !isCoverClosing) return;

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
      <section id="classic-home" className={styles.classicHome}>
        <TopBanner />
        <HeroBanner />
        <div className={styles.section}>
          <Docs />
          <Blog />
          <Countdown />
          <Project />
          <Skills />
          <Exploration />
          <NeuralNetwork />
          <FourierTransform />
          <Community />
        </div>
      </section>

      {!isCoverDismissed && (
        <section
          className={clsx(
            styles.coverHome,
            isCoverClosing && styles.coverHomeClosing
          )}
        >
          <Hero />
          <button
            type="button"
            className={styles.scrollGuide}
            onClick={handleRevealHome}
          >
            <span>{SCROLL_GUIDE_LABEL}</span>
            <Icon icon="lucide:chevrons-down" width={16} height={16} />
          </button>
        </section>
      )}
    </Layout>
  );
}
