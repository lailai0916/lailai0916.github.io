import { useId } from 'react';
import { translate } from '@docusaurus/Translate';
import Card from '@lailai0916/ui/Card';
import styles from './styles.module.css';

export interface EnglishExampleItem {
  label?: string;
  sentence: string;
  translation?: string;
  analysis?: string[];
}

export interface EnglishExamplesProps {
  title?: string;
  items: EnglishExampleItem[];
}

const DEFAULT_TITLE = translate({ id: 'components.englishExamples.title', message: 'Examples' });

export default function EnglishExamples({ title = DEFAULT_TITLE, items }: EnglishExamplesProps) {
  const titleId = useId();

  if (!items.length) return null;

  return (
    <Card padding="0" className={styles.examples}>
      <section data-english-examples={title} aria-labelledby={titleId}>
        <div className={styles.header}>
          <strong id={titleId}>{title}</strong>
        </div>
        <ol className={styles.items}>
          {items.map((item, index) => (
            <li key={index} className={styles.item} data-example-item={index + 1}>
              {item.label && (
                <span className={styles.label} data-example-label>
                  {item.label}
                </span>
              )}
              <p className={styles.sentence} lang="en" data-example-sentence>
                {item.sentence}
              </p>
              {item.translation && (
                <p className={styles.translation} data-example-translation>
                  {item.translation}
                </p>
              )}
              {!!item.analysis?.length && (
                <ul className={styles.analysis} data-example-analysis>
                  {item.analysis.map((explanation, i) => (
                    <li key={i}>{explanation}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </section>
    </Card>
  );
}
