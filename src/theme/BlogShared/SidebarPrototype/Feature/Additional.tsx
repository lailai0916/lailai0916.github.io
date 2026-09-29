import { useEffect, useMemo, useState, type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import { usePluralForm } from '@docusaurus/theme-common';
import Badge from '@lailai0916/ui/Badge';
import Button from '@lailai0916/ui/Button';
import TitleCard from '@lailai0916/ui/TitleCard';
import { formatCalendarMonthName, getDateKey } from '@site/src/utils/dateTime';
import { TagChipList } from '../../BlogUI';
import type { DataProps, PrototypePost, PrototypeTag } from './index';
import baseStyles from './styles.module.css';
import styles from './additional.module.css';

const FIRST = translate({ id: 'blog.sidebarPrototype.feature.bookends.first', message: 'First' });
const LATEST = translate({
  id: 'blog.sidebarPrototype.feature.bookends.latest',
  message: 'Latest',
});
const MORE_TAGS = translate({
  id: 'blog.sidebarPrototype.feature.discovery.next',
  message: 'More tags',
});
const NEXT_YEAR = translate({
  id: 'blog.sidebarPrototype.feature.timeMachine.next',
  message: 'Another year',
});
const FEED_DESCRIPTION = translate({
  id: 'blog.sidebarPrototype.feature.subscribe.description',
  message: 'Follow new posts in your feed reader.',
});
const RSS = translate({ id: 'blog.sidebarPrototype.feature.subscribe.rss', message: 'RSS' });
const ATOM = translate({ id: 'blog.sidebarPrototype.feature.subscribe.atom', message: 'Atom' });
const JSON_FEED = translate({
  id: 'blog.sidebarPrototype.feature.subscribe.json',
  message: 'JSON',
});
const SAVE = translate({ id: 'blog.sidebarPrototype.feature.readingList.save', message: 'Save' });
const SAVED = translate({
  id: 'blog.sidebarPrototype.feature.readingList.saved',
  message: 'Saved',
});
const REMOVE = translate({
  id: 'blog.sidebarPrototype.feature.readingList.remove',
  message: 'Remove',
});
const NEXT_POST = translate({
  id: 'blog.sidebarPrototype.feature.readingList.next',
  message: 'Next post',
});
const LIST_EMPTY = translate({
  id: 'blog.sidebarPrototype.feature.readingList.empty',
  message: 'No saved posts yet',
});

const READING_LIST_KEY = 'blog-sidebar-reading-list';

function postKey(permalink: string) {
  return permalink.split('/blog/')[1] ?? permalink;
}

type Props = DataProps & {
  variant: string;
  title: string;
  labels: { posts: string; empty: string; minutes: string };
};

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <TitleCard className={baseStyles.card} size="plain" padding="1rem" title={title}>
      <div className={baseStyles.content}>{children}</div>
    </TitleCard>
  );
}

function PostLink({ post, empty }: { post?: PrototypePost; empty: string }) {
  return post ? (
    <Link className={baseStyles.postLink} to={post.permalink}>
      {post.title}
    </Link>
  ) : (
    <span className={baseStyles.empty}>{empty}</span>
  );
}

function Choice({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={baseStyles.badgeButton}
      aria-pressed={active}
      onClick={onClick}
    >
      <Badge active={active} hoverable={!active} count={count}>
        {label}
      </Badge>
    </button>
  );
}

function Count({ count, label }: { count: number; label: string }) {
  const { selectMessage } = usePluralForm();
  return (
    <>
      {count} {selectMessage(count, label)}
    </>
  );
}

function Bookends({ posts, title, labels, timeZone }: Props) {
  return (
    <Panel title={title}>
      <div className={styles.bookends}>
        {[
          { label: FIRST, post: posts[posts.length - 1] },
          { label: LATEST, post: posts[0] },
        ].map(({ label, post }) => (
          <div className={styles.bookend} key={label}>
            <div className={styles.rowHeading}>
              <span>{label}</span>
              {post && <span>{getDateKey(post.date, timeZone).slice(0, 4)}</span>}
            </div>
            <PostLink post={post} empty={labels.empty} />
          </div>
        ))}
      </div>
    </Panel>
  );
}

type TagPair = { first: PrototypeTag; second: PrototypeTag; posts: PrototypePost[] };

function TagCombinations({ posts, tags, title, labels }: Props) {
  const pairs = useMemo(() => {
    const byPermalink = new Map(tags.map((tag) => [tag.permalink, tag]));
    const found = new Map<string, TagPair>();
    posts.forEach((post) => {
      const linked = post.tags
        .map((tag) => byPermalink.get(tag.permalink))
        .filter((tag): tag is PrototypeTag => Boolean(tag));
      for (let first = 0; first < linked.length; first += 1) {
        for (let second = first + 1; second < linked.length; second += 1) {
          const [a, b] = [linked[first], linked[second]].sort((x, y) =>
            x.permalink.localeCompare(y.permalink)
          );
          const key = `${a.permalink}|${b.permalink}`;
          const pair = found.get(key);
          if (pair) pair.posts.push(post);
          else found.set(key, { first: a, second: b, posts: [post] });
        }
      }
    });
    const ranked = [...found.values()]
      .filter(
        (pair) =>
          pair.posts.length > 1 &&
          pair.posts.length / Math.min(pair.first.count, pair.second.count) < 0.95
      )
      .sort((a, b) => b.posts.length - a.posts.length);
    const selected: TagPair[] = [];
    const used = new Set<string>();
    for (const pair of ranked) {
      if (used.has(pair.first.permalink) || used.has(pair.second.permalink)) continue;
      selected.push(pair);
      used.add(pair.first.permalink);
      used.add(pair.second.permalink);
      if (selected.length === 5) break;
    }
    return selected;
  }, [posts, tags]);
  const [index, setIndex] = useState(0);
  const selected = pairs[index] ?? pairs[0];
  return (
    <Panel title={title}>
      <div className={baseStyles.badgeChoices} role="group" aria-label={title}>
        {pairs.map((pair, position) => (
          <Choice
            key={`${pair.first.permalink}|${pair.second.permalink}`}
            label={`${pair.first.label} × ${pair.second.label}`}
            count={pair.posts.length}
            active={selected === pair}
            onClick={() => setIndex(position)}
          />
        ))}
      </div>
      <div className={baseStyles.postList}>
        {selected ? (
          selected.posts
            .slice(0, 2)
            .map((post) => <PostLink key={post.permalink} post={post} empty={labels.empty} />)
        ) : (
          <PostLink empty={labels.empty} />
        )}
      </div>
    </Panel>
  );
}

function PublishingTimeline({ posts, title, labels, timeZone }: Props) {
  const years = useMemo(() => {
    const groups = new Map<string, PrototypePost[]>();
    posts.forEach((post) => {
      const year = getDateKey(post.date, timeZone).slice(0, 4);
      groups.set(year, [...(groups.get(year) ?? []), post]);
    });
    return [...groups].sort((a, b) => b[0].localeCompare(a[0]));
  }, [posts, timeZone]);
  const [year, setYear] = useState(years[0]?.[0] ?? '');
  const selected = years.find(([key]) => key === year) ?? years[0];
  const max = Math.max(...years.map(([, items]) => items.length), 1);
  return (
    <Panel title={title}>
      <div className={styles.timeline} role="group" aria-label={title}>
        {years.map(([key, items]) => (
          <button
            key={key}
            type="button"
            className={styles.timelineRow}
            aria-pressed={selected?.[0] === key}
            onClick={() => setYear(key)}
          >
            <span>{key}</span>
            <span className={styles.timelineTrack}>
              <span style={{ width: `${(items.length / max) * 100}%` }} />
            </span>
            <span>{items.length}</span>
          </button>
        ))}
      </div>
      <PostLink post={selected?.[1][0]} empty={labels.empty} />
    </Panel>
  );
}

function DiscoverTags({ tags, title, labels }: Props) {
  const rare = useMemo(() => [...tags].sort((a, b) => a.count - b.count), [tags]);
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(rare.length / 4);
  const visible = rare.slice(page * 4, page * 4 + 4);
  return (
    <Panel title={title}>
      {visible.length ? (
        <TagChipList
          items={visible.map((tag) => ({
            to: tag.permalink,
            label: tag.label,
            count: tag.count,
          }))}
        />
      ) : (
        <span className={baseStyles.empty}>{labels.empty}</span>
      )}
      <Button
        className={baseStyles.action}
        variant="ghost"
        size="sm"
        disabled={pageCount < 2}
        onClick={() => setPage((current) => (current + 1) % pageCount)}
      >
        {MORE_TAGS} ↻
      </Button>
    </Panel>
  );
}

function ReadingBudget({ posts, title, labels }: Props) {
  const [budget, setBudget] = useState(10);
  const selection = useMemo(() => {
    const chosen: PrototypePost[] = [];
    let used = 0;
    for (const post of posts) {
      const minutes = Math.ceil(post.readingTime ?? 0);
      if (minutes > 0 && minutes + used <= budget) {
        chosen.push(post);
        used += minutes;
      }
      if (chosen.length === 3) break;
    }
    return { chosen, used };
  }, [budget, posts]);
  return (
    <Panel title={title}>
      <div className={baseStyles.badgeChoices} role="group" aria-label={title}>
        {[5, 10, 20].map((minutes) => (
          <Choice
            key={minutes}
            label={`${minutes} ${labels.minutes}`}
            active={budget === minutes}
            onClick={() => setBudget(minutes)}
          />
        ))}
      </div>
      <div className={styles.budgetSummary}>
        <span>
          <Count count={selection.chosen.length} label={labels.posts} />
        </span>
        <span>
          {selection.used}/{budget} {labels.minutes}
        </span>
      </div>
      <div className={styles.budgetTrack} aria-hidden="true">
        <span style={{ width: `${(selection.used / budget) * 100}%` }} />
      </div>
      <div className={baseStyles.postList}>
        {selection.chosen.length ? (
          selection.chosen.map((post) => (
            <PostLink key={post.permalink} post={post} empty={labels.empty} />
          ))
        ) : (
          <PostLink empty={labels.empty} />
        )}
      </div>
    </Panel>
  );
}

function TimeMachine({ posts, title, labels, timeZone }: Props) {
  const years = useMemo(() => {
    const groups = new Map<string, PrototypePost[]>();
    posts.forEach((post) => {
      const year = getDateKey(post.date, timeZone).slice(0, 4);
      groups.set(year, [...(groups.get(year) ?? []), post]);
    });
    return [...groups].sort((a, b) => b[0].localeCompare(a[0])).slice(1);
  }, [posts, timeZone]);
  const [step, setStep] = useState(0);
  const selected = years[step % years.length];
  const post = selected?.[1][step % selected[1].length];
  return (
    <Panel title={title}>
      {selected && <div className={styles.timeMachineYear}>{selected[0]}</div>}
      <PostLink post={post} empty={labels.empty} />
      <Button
        className={baseStyles.action}
        variant="ghost"
        size="sm"
        disabled={years.length < 2}
        onClick={() => setStep((current) => current + 1)}
      >
        {NEXT_YEAR} ↻
      </Button>
    </Panel>
  );
}

function CalendarMonth({ posts, title, labels, timeZone }: Props) {
  const { i18n } = useDocusaurusContext();
  const initialMonth = posts[0] ? Number(getDateKey(posts[0].date, timeZone).slice(5, 7)) : 1;
  const [month, setMonth] = useState(initialMonth);
  const matching = posts.filter(
    (post) => Number(getDateKey(post.date, timeZone).slice(5, 7)) === month
  );
  const year = posts[0] ? getDateKey(posts[0].date, timeZone).slice(0, 4) : '2024';
  return (
    <Panel title={title}>
      <div className={styles.monthGrid} role="group" aria-label={title}>
        {Array.from({ length: 12 }, (_, index) => index + 1).map((value) => (
          <button
            key={value}
            type="button"
            className={styles.monthButton}
            aria-label={formatCalendarMonthName(
              `${year}-${String(value).padStart(2, '0')}`,
              i18n.currentLocale
            )}
            aria-pressed={month === value}
            onClick={() => setMonth(value)}
          >
            {String(value).padStart(2, '0')}
          </button>
        ))}
      </div>
      <div className={styles.budgetSummary}>
        <span>
          {formatCalendarMonthName(`${year}-${String(month).padStart(2, '0')}`, i18n.currentLocale)}
        </span>
        <span>
          <Count count={matching.length} label={labels.posts} />
        </span>
      </div>
      <PostLink post={matching[0]} empty={labels.empty} />
    </Panel>
  );
}

function TagAtlas({ tags, title, labels }: Props) {
  const visible = tags.slice(0, 5);
  const max = visible[0]?.count ?? 1;
  return (
    <Panel title={title}>
      {visible.length ? (
        <div className={styles.atlas}>
          {visible.map((tag) => (
            <div className={styles.atlasRow} key={tag.permalink}>
              <TagChipList items={[{ to: tag.permalink, label: tag.label, count: tag.count }]} />
              <div className={styles.atlasTrack} aria-hidden="true">
                <span style={{ width: `${(tag.count / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span className={baseStyles.empty}>{labels.empty}</span>
      )}
    </Panel>
  );
}

function Subscribe({ title }: Props) {
  const rss = useBaseUrl('/blog/rss.xml', { absolute: true });
  const atom = useBaseUrl('/blog/atom.xml', { absolute: true });
  const json = useBaseUrl('/blog/feed.json', { absolute: true });
  return (
    <Panel title={title}>
      <p className={styles.feedDescription}>{FEED_DESCRIPTION}</p>
      <nav className={styles.feeds} aria-label={title}>
        {[
          { label: RSS, href: rss },
          { label: ATOM, href: atom },
          { label: JSON_FEED, href: json },
        ].map(({ label, href }) => (
          <a key={href} className={styles.feedLink} href={href}>
            <span>{label}</span>
            <span aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>
    </Panel>
  );
}

function ReadingList({ posts, title, labels }: Props) {
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const byPostKey = useMemo(
    () => new Map(posts.map((post) => [postKey(post.permalink), post])),
    [posts]
  );

  useEffect(() => {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(READING_LIST_KEY) ?? '[]');
      if (Array.isArray(parsed)) {
        setSaved(
          [
            ...new Set(
              parsed.filter((link): link is string => typeof link === 'string').map(postKey)
            ),
          ].filter((key) => byPostKey.has(key))
        );
      }
    } catch {
      setSaved([]);
    }
    setReady(true);
  }, [byPostKey]);

  const updateSaved = (next: string[]) => {
    try {
      localStorage.setItem(READING_LIST_KEY, JSON.stringify(next));
    } catch {
      // The list still works for this session when browser storage is unavailable.
    }
    setSaved(next);
  };

  const candidate = posts[candidateIndex % posts.length];
  const candidateKey = candidate ? postKey(candidate.permalink) : '';
  const savedPosts = saved
    .map((key) => byPostKey.get(key))
    .filter((post): post is PrototypePost => Boolean(post));
  return (
    <Panel title={title}>
      <div className={styles.candidate}>
        <PostLink post={candidate} empty={labels.empty} />
        <div className={styles.readingActions}>
          <Button
            variant="secondary"
            size="sm"
            disabled={!ready || !candidate || saved.includes(candidateKey)}
            onClick={() => candidate && updateSaved([...saved, candidateKey])}
          >
            {candidate && saved.includes(candidateKey) ? SAVED : SAVE}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={posts.length < 2}
            onClick={() => setCandidateIndex((current) => current + 1)}
          >
            {NEXT_POST} →
          </Button>
        </div>
      </div>
      <div className={styles.savedHeader} role="status">
        {SAVED} · <Count count={savedPosts.length} label={labels.posts} />
      </div>
      <div className={styles.savedList}>
        {savedPosts.length ? (
          savedPosts.map((post) => (
            <div className={styles.savedRow} key={post.permalink}>
              <PostLink post={post} empty={labels.empty} />
              <Button
                variant="ghost"
                size="sm"
                aria-label={`${REMOVE} ${post.title}`}
                onClick={() => updateSaved(saved.filter((key) => key !== postKey(post.permalink)))}
              >
                ×
              </Button>
            </div>
          ))
        ) : (
          <span className={baseStyles.empty}>{LIST_EMPTY}</span>
        )}
      </div>
    </Panel>
  );
}

export default function AdditionalFeature(props: Props) {
  switch (props.variant) {
    case 'F11':
      return <Bookends {...props} />;
    case 'F12':
      return <TagCombinations {...props} />;
    case 'F13':
      return <PublishingTimeline {...props} />;
    case 'F14':
      return <DiscoverTags {...props} />;
    case 'F15':
      return <ReadingBudget {...props} />;
    case 'F16':
      return <TimeMachine {...props} />;
    case 'F17':
      return <CalendarMonth {...props} />;
    case 'F18':
      return <TagAtlas {...props} />;
    case 'F19':
      return <Subscribe {...props} />;
    default:
      return <ReadingList {...props} />;
  }
}
