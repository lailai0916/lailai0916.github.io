import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import Button from '@lailai0916/ui/Button';
import Card from '@lailai0916/ui/Card';
import Icon from '@lailai0916/ui/Icon';
import Segmented from '@lailai0916/ui/Segmented';
import useEnglishSpeech from './useEnglishSpeech';
import styles from './styles.module.css';

export interface EnglishExampleSegment {
  text: string;
  role?: string;
  note?: string;
}

export interface EnglishExampleItem {
  label?: string;
  sentence: string;
  translation?: string;
  analysis?: string[];
  /** Segment text must concatenate to the exact sentence, including whitespace. */
  segments?: EnglishExampleSegment[];
}

export interface EnglishExamplesProps {
  title?: string;
  items: EnglishExampleItem[];
  speechLang?: string;
}

const LABELS = {
  title: translate({ id: 'components.englishExamples.title', message: 'Examples' }),
  view: translate({ id: 'components.englishExamples.view', message: 'Example view' }),
  focus: translate({ id: 'components.englishExamples.focus', message: 'Read' }),
  compare: translate({ id: 'components.englishExamples.compare', message: 'Compare' }),
  translation: translate({
    id: 'components.englishExamples.translation',
    message: 'Translation',
  }),
  analysis: translate({ id: 'components.englishExamples.analysis', message: 'Analysis' }),
  navigation: translate({
    id: 'components.englishExamples.navigation',
    message: 'Choose an example',
  }),
  prev: translate({ id: 'components.englishExamples.prev', message: 'Previous example' }),
  next: translate({ id: 'components.englishExamples.next', message: 'Next example' }),
  copy: translate({ id: 'components.englishExamples.copy', message: 'Copy text' }),
  copied: translate({ id: 'components.englishExamples.copied', message: 'Text copied' }),
  copyFailed: translate({
    id: 'components.englishExamples.copyFailed',
    message: 'Copy failed. Select the text to copy it.',
  }),
  play: translate({ id: 'components.englishExamples.play', message: 'Read aloud' }),
  stop: translate({ id: 'components.englishExamples.stop', message: 'Stop reading' }),
  speechPending: translate({
    id: 'components.englishExamples.speechPending',
    message: 'Checking read-aloud support',
  }),
  speechUnavailable: translate({
    id: 'components.englishExamples.speechUnavailable',
    message: 'Read aloud is unavailable in this browser.',
  }),
  speechFailed: translate({
    id: 'components.englishExamples.speechFailed',
    message: 'Read aloud could not start. Try again or check your device voices.',
  }),
  speechBusy: translate({
    id: 'components.englishExamples.speechBusy',
    message: 'Another read-aloud session is active. Stop it before reading this example.',
  }),
  voiceFallback: translate({
    id: 'components.englishExamples.voiceFallback',
    message: 'No matching voice is available on this device; the accent may differ.',
  }),
  roles: translate({ id: 'components.englishExamples.roles', message: 'Structure' }),
  selectSegment: translate({
    id: 'components.englishExamples.selectSegment',
    message: 'Select a highlighted part to inspect its annotation.',
  }),
  steps: translate({ id: 'components.englishExamples.steps', message: 'Explanation' }),
};

function exampleLabel(number: number) {
  return translate(
    { id: 'components.englishExamples.example', message: 'Example {number}' },
    { number }
  );
}

function positionLabel(current: number, total: number) {
  return translate(
    { id: 'components.englishExamples.position', message: '{current} of {total}' },
    { current, total }
  );
}

function segmentLabel(text: string, role: string) {
  return translate(
    { id: 'components.englishExamples.segment', message: '{text} — {role}' },
    { text, role }
  );
}

interface ExamplePanelProps {
  item: EnglishExampleItem;
  index: number;
  id: string;
  hidden: boolean;
  compare: boolean;
  showTranslation: boolean;
  showAnalysis: boolean;
  speech: ReturnType<typeof useEnglishSpeech>;
  copy: (sentence: string, index: number) => void;
  copied: boolean;
}

function ExamplePanel({
  item,
  index,
  id,
  hidden,
  compare,
  showTranslation,
  showAnalysis,
  speech,
  copy,
  copied,
}: ExamplePanelProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const segmentRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const segments =
    item.segments?.map((segment) => segment.text).join('') === item.sentence
      ? item.segments
      : undefined;
  const interactive = segments?.flatMap((segment, i) => (segment.role || segment.note ? [i] : []));
  const active = selected ?? interactive?.[0];
  const selectedSegment = selected === null ? undefined : segments?.[selected];
  const roles = [...new Set(segments?.flatMap((segment) => (segment.role ? [segment.role] : [])))];
  const label = item.label ?? exampleLabel(index + 1);

  const moveSegment = (event: KeyboardEvent<HTMLButtonElement>, current: number) => {
    if (!interactive?.length) return;
    const at = interactive.indexOf(current);
    let target: number;
    switch (event.key) {
      case 'ArrowRight':
        target = interactive[(at + 1) % interactive.length];
        break;
      case 'ArrowLeft':
        target = interactive[(at - 1 + interactive.length) % interactive.length];
        break;
      case 'Home':
        target = interactive[0];
        break;
      case 'End':
        target = interactive[interactive.length - 1];
        break;
      default:
        return;
    }
    event.preventDefault();
    setSelected(target);
    segmentRefs.current[target]?.focus();
  };

  return (
    <section
      id={`${id}-panel-${index}`}
      data-example-item={index + 1}
      className={styles.panel}
      role={compare ? undefined : 'tabpanel'}
      aria-labelledby={compare ? `${id}-label-${index}` : `${id}-tab-${index}`}
      hidden={hidden}
      tabIndex={compare ? undefined : 0}
    >
      <div className={styles.exampleHeader}>
        <span id={`${id}-label-${index}`} className={styles.exampleLabel}>
          <span className={styles.number}>{index + 1}</span>
          {label}
        </span>
        <div className={styles.sentenceActions}>
          <Button
            variant="ghost"
            size="sm"
            title={copied ? LABELS.copied : LABELS.copy}
            aria-label={copied ? LABELS.copied : LABELS.copy}
            onClick={() => copy(item.sentence, index)}
            leftIcon={<Icon icon={copied ? 'lucide:check' : 'lucide:copy'} aria-hidden="true" />}
          />
          <Button
            variant="ghost"
            size="sm"
            title={speech.reading === index ? LABELS.stop : LABELS.play}
            aria-label={speech.reading === index ? LABELS.stop : LABELS.play}
            aria-pressed={speech.reading === index}
            disabled={speech.support !== 'available'}
            onClick={() => speech.read(item.sentence, index)}
            leftIcon={
              <Icon
                icon={speech.reading === index ? 'lucide:square' : 'lucide:volume-2'}
                aria-hidden="true"
              />
            }
          />
        </div>
      </div>
      <p className={styles.sentence} lang="en" data-example-sentence>
        {segments && showAnalysis
          ? segments.map((segment, i) =>
              segment.role || segment.note ? (
                <button
                  key={i}
                  ref={(element) => {
                    segmentRefs.current[i] = element;
                  }}
                  type="button"
                  data-example-role={segment.role}
                  className={clsx(styles.segment, selected === i && styles.selectedSegment)}
                  aria-label={segmentLabel(segment.text, segment.role ?? LABELS.analysis)}
                  aria-pressed={selected === i}
                  aria-describedby={selected === i ? `${id}-segment-${index}` : undefined}
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => setSelected(i)}
                  onKeyDown={(event) => moveSegment(event, i)}
                >
                  {segment.text}
                </button>
              ) : (
                <span key={i}>{segment.text}</span>
              )
            )
          : item.sentence}
      </p>
      {item.translation && (
        <p className={styles.translation} hidden={!showTranslation} data-example-translation>
          {item.translation}
        </p>
      )}
      <div
        className={clsx(styles.analysisViewport, showAnalysis && styles.analysisOpen)}
        aria-hidden={!showAnalysis}
      >
        <div className={styles.analysisInner}>
          <div className={styles.analysisBody}>
            {!!roles.length && (
              <div className={styles.roles} aria-label={LABELS.roles}>
                {roles.map((role) => (
                  <span key={role}>{role}</span>
                ))}
              </div>
            )}
            {!!interactive?.length && (
              <div id={`${id}-segment-${index}`} className={styles.segmentNote} aria-live="polite">
                {selectedSegment ? (
                  <>
                    {selectedSegment.role && <strong>{selectedSegment.role}</strong>}
                    {selectedSegment.note && <span>{selectedSegment.note}</span>}
                  </>
                ) : (
                  LABELS.selectSegment
                )}
              </div>
            )}
            {!!item.analysis?.length && (
              <div className={styles.explanation} data-example-analysis>
                <span className={styles.explanationLabel}>{LABELS.steps}</span>
                <ol>
                  {item.analysis.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
            {segments?.some((segment) => segment.role || segment.note) && (
              <dl className={styles.printNotes}>
                {segments.map((segment, i) =>
                  segment.role || segment.note ? (
                    <div key={i}>
                      <dt>
                        {segment.text}
                        {segment.role ? ` — ${segment.role}` : ''}
                      </dt>
                      {segment.note && <dd>{segment.note}</dd>}
                    </div>
                  ) : null
                )}
              </dl>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function EnglishExamples({
  title = LABELS.title,
  items,
  speechLang = 'en-GB',
}: EnglishExamplesProps) {
  const id = useId();
  const [current, setCurrent] = useState(0);
  const [view, setView] = useState<'focus' | 'compare'>('focus');
  const [showTranslation, setShowTranslation] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [copyState, setCopyState] = useState<{ index: number; success: boolean } | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const speech = useEnglishSpeech(speechLang);
  const compare = view === 'compare';
  const hasTranslation = items.some((item) => item.translation);
  const hasAnalysis = items.some((item) => item.analysis?.length || item.segments?.length);
  const activeIndex = Math.min(current, Math.max(0, items.length - 1));

  useEffect(() => {
    if (!copyState) return undefined;
    const timer = window.setTimeout(() => setCopyState(null), 3000);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  const choose = (index: number, focus = false) => {
    speech.stop();
    setCurrent(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    switch (event.key) {
      case 'ArrowRight':
        next = (index + 1) % items.length;
        break;
      case 'ArrowLeft':
        next = (index - 1 + items.length) % items.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = items.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    choose(next, true);
  };

  const copy = async (sentence: string, index: number) => {
    try {
      await navigator.clipboard.writeText(sentence);
      setCopyState({ index, success: true });
    } catch {
      setCopyState({ index, success: false });
    }
  };

  if (!items.length) return null;

  return (
    <Card padding="0" className={styles.examples}>
      <section data-english-examples={title} aria-labelledby={`${id}-title`}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <Icon icon="lucide:book-open-text" aria-hidden="true" />
            <strong id={`${id}-title`}>{title}</strong>
            <span
              className={styles.position}
              aria-live="polite"
              aria-atomic="true"
              hidden={compare}
            >
              {positionLabel(activeIndex + 1, items.length)}
            </span>
          </div>
          <div className={styles.toolbar}>
            {items.length > 1 && (
              <Segmented
                value={view}
                items={[
                  { value: 'focus' as const, label: LABELS.focus, icon: 'lucide:book-open' },
                  { value: 'compare' as const, label: LABELS.compare, icon: 'lucide:columns-2' },
                ]}
                onChange={(nextView) => {
                  speech.stop();
                  setView(nextView);
                }}
                size="sm"
                orientation="horizontal"
                stackAt={0}
                ariaLabel={LABELS.view}
                className={styles.viewControl}
              />
            )}
            <div className={styles.displayControls}>
              {hasTranslation && (
                <Button
                  variant="ghost"
                  size="sm"
                  active={showTranslation}
                  aria-pressed={showTranslation}
                  onClick={() => setShowTranslation((shown) => !shown)}
                  leftIcon={<Icon icon="lucide:languages" aria-hidden="true" />}
                >
                  {LABELS.translation}
                </Button>
              )}
              {hasAnalysis && (
                <Button
                  variant="ghost"
                  size="sm"
                  active={showAnalysis}
                  aria-pressed={showAnalysis}
                  onClick={() => setShowAnalysis((shown) => !shown)}
                  leftIcon={<Icon icon="lucide:scan-text" aria-hidden="true" />}
                >
                  {LABELS.analysis}
                </Button>
              )}
            </div>
          </div>
        </div>
        {items.length > 1 && !compare && (
          <div className={styles.navigation}>
            <Button
              variant="ghost"
              size="sm"
              title={LABELS.prev}
              aria-label={LABELS.prev}
              disabled={activeIndex === 0}
              onClick={() => choose(activeIndex - 1)}
              leftIcon={<Icon icon="lucide:chevron-left" aria-hidden="true" />}
            />
            <div className={styles.tabs} role="tablist" aria-label={LABELS.navigation}>
              {items.map((item, index) => (
                <button
                  key={index}
                  id={`${id}-tab-${index}`}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  className={clsx(styles.tab, activeIndex === index && styles.activeTab)}
                  type="button"
                  role="tab"
                  aria-label={item.label ?? exampleLabel(index + 1)}
                  aria-selected={activeIndex === index}
                  aria-controls={`${id}-panel-${index}`}
                  tabIndex={activeIndex === index ? 0 : -1}
                  onClick={() => choose(index)}
                  onKeyDown={(event) => navigate(event, index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              title={LABELS.next}
              aria-label={LABELS.next}
              disabled={activeIndex === items.length - 1}
              onClick={() => choose(activeIndex + 1)}
              leftIcon={<Icon icon="lucide:chevron-right" aria-hidden="true" />}
            />
          </div>
        )}
        <div className={clsx(styles.panels, compare && styles.comparison)}>
          {items.map((item, index) => (
            <ExamplePanel
              key={`${index}-${item.sentence}`}
              item={item}
              index={index}
              id={id}
              hidden={!compare && index !== activeIndex}
              compare={compare || items.length === 1}
              showTranslation={showTranslation}
              showAnalysis={showAnalysis}
              speech={speech}
              copy={copy}
              copied={copyState?.index === index && copyState.success}
            />
          ))}
        </div>
        <div className={styles.status} role="status" aria-live="polite" aria-atomic="true">
          {copyState
            ? copyState.success
              ? LABELS.copied
              : LABELS.copyFailed
            : speech.failed
              ? LABELS.speechFailed
              : speech.busy
                ? LABELS.speechBusy
                : speech.voiceFallback
                  ? LABELS.voiceFallback
                  : speech.support === 'unavailable'
                    ? LABELS.speechUnavailable
                    : speech.support === 'pending'
                      ? LABELS.speechPending
                      : ''}
        </div>
      </section>
    </Card>
  );
}
