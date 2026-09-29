import { useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { translate } from '@docusaurus/Translate';
import { usePluralForm } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Badge from '@lailai0916/ui/Badge';
import Button from '@lailai0916/ui/Button';
import TitleCard from '@lailai0916/ui/TitleCard';
import { formatCalendarMonth, getDateKey, getMonthKey } from '@site/src/utils/dateTime';
import { TagChipList } from '../../BlogUI';
import AdditionalFeature from './Additional';
import styles from './styles.module.css';

export type PrototypePost = {
  title: string;
  date: string;
  permalink: string;
  readingTime?: number;
  tags: { label: string; permalink: string }[];
};
export type PrototypeTag = { label: string; permalink: string; count: number };
export type DataProps = { posts: PrototypePost[]; tags: PrototypeTag[]; timeZone: string };

export const featureOptions = [
  {
    key: 'F01',
    title: translate({ id: 'blog.sidebarPrototype.feature.random.title', message: 'Random Post' }),
  },
  {
    key: 'F02',
    title: translate({
      id: 'blog.sidebarPrototype.feature.years.title',
      message: 'Browse by Year',
    }),
  },
  {
    key: 'F03',
    title: translate({ id: 'blog.sidebarPrototype.feature.tags.title', message: 'Find a Tag' }),
  },
  {
    key: 'F04',
    title: translate({ id: 'blog.sidebarPrototype.feature.time.title', message: 'Reading Time' }),
  },
  {
    key: 'F05',
    title: translate({
      id: 'blog.sidebarPrototype.feature.months.title',
      message: 'Browse by Month',
    }),
  },
  {
    key: 'F06',
    title: translate({
      id: 'blog.sidebarPrototype.feature.topics.title',
      message: 'Browse by Topic',
    }),
  },
  {
    key: 'F07',
    title: translate({ id: 'blog.sidebarPrototype.feature.path.title', message: 'Start Reading' }),
  },
  {
    key: 'F08',
    title: translate({ id: 'blog.sidebarPrototype.feature.list.title', message: 'Recent Posts' }),
  },
  {
    key: 'F09',
    title: translate({ id: 'blog.sidebarPrototype.feature.pairs.title', message: 'Related Posts' }),
  },
  {
    key: 'F10',
    title: translate({ id: 'blog.sidebarPrototype.feature.search.title', message: 'Search Posts' }),
  },
  {
    key: 'F11',
    title: translate({
      id: 'blog.sidebarPrototype.feature.bookends.title',
      message: 'First and Latest',
    }),
  },
  {
    key: 'F12',
    title: translate({
      id: 'blog.sidebarPrototype.feature.combinations.title',
      message: 'Tag Combinations',
    }),
  },
  {
    key: 'F13',
    title: translate({
      id: 'blog.sidebarPrototype.feature.timeline.title',
      message: 'Publishing Timeline',
    }),
  },
  {
    key: 'F14',
    title: translate({
      id: 'blog.sidebarPrototype.feature.discovery.title',
      message: 'Discover Tags',
    }),
  },
  {
    key: 'F15',
    title: translate({
      id: 'blog.sidebarPrototype.feature.budget.title',
      message: 'Reading Budget',
    }),
  },
  {
    key: 'F16',
    title: translate({
      id: 'blog.sidebarPrototype.feature.timeMachine.title',
      message: 'Time Machine',
    }),
  },
  {
    key: 'F17',
    title: translate({
      id: 'blog.sidebarPrototype.feature.calendarMonth.title',
      message: 'By Calendar Month',
    }),
  },
  {
    key: 'F18',
    title: translate({ id: 'blog.sidebarPrototype.feature.atlas.title', message: 'Tag Atlas' }),
  },
  {
    key: 'F19',
    title: translate({ id: 'blog.sidebarPrototype.feature.subscribe.title', message: 'Subscribe' }),
  },
  {
    key: 'F20',
    title: translate({
      id: 'blog.sidebarPrototype.feature.readingList.title',
      message: 'Reading List',
    }),
  },
] as const;

const POSTS = translate({ id: 'blog.sidebarPrototype.feature.posts', message: 'post|posts' });
const NO_RESULTS = translate({
  id: 'blog.sidebarPrototype.feature.empty',
  message: 'No matching posts',
});
const REFRESH = translate({ id: 'blog.sidebarPrototype.feature.refresh', message: 'Another post' });
const VIEW_ARCHIVE = translate({
  id: 'blog.sidebarPrototype.feature.archive',
  message: 'View archive',
});
const MINUTES = translate({ id: 'blog.sidebarPrototype.feature.minutes', message: 'min' });
const TAG_PLACEHOLDER = translate({
  id: 'blog.sidebarPrototype.feature.tags.placeholder',
  message: 'Search Tags',
});
const SEARCH_PLACEHOLDER = translate({
  id: 'blog.sidebarPrototype.feature.search.placeholder',
  message: 'Search Posts',
});
const ANOTHER_PAIR = translate({
  id: 'blog.sidebarPrototype.feature.pairs.next',
  message: 'Another topic',
});
const ALL_POSTS = translate({ id: 'blog.sidebarPrototype.feature.list.all', message: 'All posts' });

function PostCount({ count }: { count: number }) {
  const { selectMessage } = usePluralForm();
  return (
    <>
      {count} {selectMessage(count, POSTS)}
    </>
  );
}

function PostLink({ post }: { post?: PrototypePost }) {
  if (!post) return <span className={styles.empty}>{NO_RESULTS}</span>;
  return (
    <Link className={styles.postLink} to={post.permalink}>
      {post.title}
    </Link>
  );
}

function FeatureCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <TitleCard className={styles.card} size="plain" padding="1rem" title={title}>
      <div className={styles.content}>{children}</div>
    </TitleCard>
  );
}

function ChoiceBadge({
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
    <button type="button" className={styles.badgeButton} onClick={onClick} aria-pressed={active}>
      <Badge active={active} hoverable={!active} count={count}>
        {label}
      </Badge>
    </button>
  );
}

function RandomPost({ posts }: DataProps) {
  const [index, setIndex] = useState(0);
  const draw = () => {
    if (posts.length < 2) return;
    setIndex(
      (current) => (current + 1 + Math.floor(Math.random() * (posts.length - 1))) % posts.length
    );
  };
  return (
    <FeatureCard title={featureOptions[0].title}>
      <PostLink post={posts[index]} />
      <Button
        className={styles.action}
        variant="ghost"
        size="sm"
        onClick={draw}
        disabled={posts.length < 2}
      >
        {REFRESH} ↻
      </Button>
    </FeatureCard>
  );
}

function YearBrowser({ posts, timeZone }: DataProps) {
  const years = useMemo(
    () => [...new Set(posts.map((post) => getDateKey(post.date, timeZone).slice(0, 4)))],
    [posts, timeZone]
  );
  const [year, setYear] = useState(years[0] ?? '');
  const selected = years.includes(year) ? year : years[0];
  const matching = posts.filter((post) => getDateKey(post.date, timeZone).startsWith(selected));
  const archive = useBaseUrl(`/blog/archive?year=${selected}`);
  return (
    <FeatureCard title={featureOptions[1].title}>
      <div className={styles.badgeChoices} role="group" aria-label={featureOptions[1].title}>
        {years.map((item) => (
          <ChoiceBadge
            key={item}
            label={item}
            count={posts.filter((post) => getDateKey(post.date, timeZone).startsWith(item)).length}
            active={item === selected}
            onClick={() => setYear(item)}
          />
        ))}
      </div>
      <div className={styles.supporting}>
        <PostCount count={matching.length} />
      </div>
      <PostLink post={matching[0]} />
      <Link className={styles.footerLink} to={archive}>
        {VIEW_ARCHIVE} ↗
      </Link>
    </FeatureCard>
  );
}

function TagFinder({ tags }: DataProps) {
  const [query, setQuery] = useState('');
  const matches = tags
    .filter((tag) => tag.label.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))
    .slice(0, 6);
  return (
    <FeatureCard title={featureOptions[2].title}>
      <input
        className={styles.input}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={TAG_PLACEHOLDER}
        aria-label={featureOptions[2].title}
      />
      <div>
        {matches.length ? (
          <TagChipList
            items={matches.map((tag) => ({
              to: tag.permalink,
              label: tag.label,
              count: tag.count,
            }))}
          />
        ) : (
          <span className={styles.empty}>{NO_RESULTS}</span>
        )}
      </div>
    </FeatureCard>
  );
}

function TimeToRead({ posts }: DataProps) {
  const [minutes, setMinutes] = useState(3);
  const matches = posts.filter(
    (post) => post.readingTime != null && Math.ceil(post.readingTime) <= minutes
  );
  return (
    <FeatureCard title={featureOptions[3].title}>
      <div className={styles.badgeChoices} role="group" aria-label={featureOptions[3].title}>
        {[1, 3, 10].map((value) => (
          <ChoiceBadge
            onClick={() => setMinutes(value)}
            key={value}
            label={`${value} ${MINUTES}`}
            active={minutes === value}
          />
        ))}
      </div>
      <div className={styles.supporting}>
        <PostCount count={matches.length} />
      </div>
      <PostLink post={matches[0]} />
    </FeatureCard>
  );
}

function MonthBrowser({ posts, timeZone }: DataProps) {
  const { i18n } = useDocusaurusContext();
  const months = useMemo(() => {
    const grouped = new Map<string, PrototypePost[]>();
    posts.forEach((post) => {
      const month = getMonthKey(post.date, timeZone);
      grouped.set(month, [...(grouped.get(month) ?? []), post]);
    });
    return [...grouped].slice(0, 6);
  }, [posts, timeZone]);
  const [month, setMonth] = useState(months[0]?.[0] ?? '');
  const current = months.find(([key]) => key === month) ?? months[0];
  return (
    <FeatureCard title={featureOptions[4].title}>
      <div className={styles.monthList} role="group" aria-label={featureOptions[4].title}>
        {months.map(([key, items]) => (
          <button
            key={key}
            type="button"
            className={key === current?.[0] ? styles.selectedRow : ''}
            onClick={() => setMonth(key)}
            aria-pressed={key === current?.[0]}
          >
            <span>{formatCalendarMonth(key, i18n.currentLocale)}</span>
            <span>
              <PostCount count={items.length} />
            </span>
          </button>
        ))}
      </div>
      <div className={styles.result}>
        <PostLink post={current?.[1][0]} />
      </div>
    </FeatureCard>
  );
}

function TopicBrowser({ posts, tags }: DataProps) {
  const topics = ['oi', 'math', 'record', 'travel']
    .map((slug) => tags.find((tag) => tag.permalink.replace(/\/$/, '').endsWith(`/${slug}`)))
    .filter((tag): tag is PrototypeTag => Boolean(tag));
  const [selected, setSelected] = useState(topics[0]?.permalink ?? '');
  const topic = topics.find((tag) => tag.permalink === selected) ?? topics[0];
  const post = posts.find((item) => item.tags.some((tag) => tag.permalink === topic?.permalink));
  return (
    <FeatureCard title={featureOptions[5].title}>
      <div className={styles.badgeChoices} role="group" aria-label={featureOptions[5].title}>
        {topics.map((tag) => (
          <ChoiceBadge
            key={tag.permalink}
            label={tag.label}
            count={tag.count}
            active={tag.permalink === topic?.permalink}
            onClick={() => setSelected(tag.permalink)}
          />
        ))}
      </div>
      <div className={styles.result}>
        <PostLink post={post} />
      </div>
      {topic && (
        <Link className={styles.footerLink} to={topic.permalink}>
          {topic.label} ↗
        </Link>
      )}
    </FeatureCard>
  );
}

function ReadingPath({ posts }: DataProps) {
  const path = useMemo(() => {
    const seen = new Set<string>();
    return posts
      .filter((post) => {
        const tag = post.tags[0]?.label ?? post.permalink;
        if (seen.has(tag)) return false;
        seen.add(tag);
        return true;
      })
      .slice(0, 3);
  }, [posts]);
  return (
    <FeatureCard title={featureOptions[6].title}>
      <div className={styles.postList}>
        {path.map((post) => (
          <div className={styles.topicPost} key={post.permalink}>
            {post.tags[0] && (
              <TagChipList items={[{ to: post.tags[0].permalink, label: post.tags[0].label }]} />
            )}
            <PostLink post={post} />
          </div>
        ))}
      </div>
    </FeatureCard>
  );
}

function RecentPosts({ posts }: DataProps) {
  const archive = useBaseUrl('/blog/archive');
  return (
    <FeatureCard title={featureOptions[7].title}>
      <div className={styles.postList}>
        {posts.slice(0, 3).map((post) => (
          <PostLink key={post.permalink} post={post} />
        ))}
      </div>
      <Link className={styles.footerLink} to={archive}>
        {ALL_POSTS} ↗
      </Link>
    </FeatureCard>
  );
}

function RelatedPosts({ posts, tags }: DataProps) {
  const pairs = useMemo(
    () =>
      ['math', 'record', 'travel', 'misc', 'oi']
        .map((slug) => tags.find((tag) => tag.permalink.replace(/\/$/, '').endsWith(`/${slug}`)))
        .filter((tag): tag is PrototypeTag => Boolean(tag))
        .map((tag) => ({
          tag,
          posts: posts.filter((post) => post.tags.some((item) => item.permalink === tag.permalink)),
        }))
        .filter((pair) => pair.posts.length >= 2),
    [posts, tags]
  );
  const [index, setIndex] = useState(0);
  const pair = pairs[index % pairs.length];
  return (
    <FeatureCard title={featureOptions[8].title}>
      {pair && (
        <TagChipList
          items={[{ to: pair.tag.permalink, label: pair.tag.label, count: pair.tag.count }]}
        />
      )}
      <div className={styles.postList}>
        {pair?.posts.slice(0, 2).map((post) => <PostLink key={post.permalink} post={post} />) ?? (
          <span className={styles.empty}>{NO_RESULTS}</span>
        )}
      </div>
      <Button
        className={styles.action}
        variant="ghost"
        size="sm"
        onClick={() => setIndex((value) => value + 1)}
        disabled={pairs.length < 2}
      >
        {ANOTHER_PAIR} ↻
      </Button>
    </FeatureCard>
  );
}

function QuickSearch({ posts }: DataProps) {
  const [query, setQuery] = useState('');
  const found = query.trim()
    ? posts.filter((post) =>
        post.title.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
      )
    : posts;
  return (
    <FeatureCard title={featureOptions[9].title}>
      <input
        className={styles.input}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={SEARCH_PLACEHOLDER}
        aria-label={featureOptions[9].title}
      />
      <div className={styles.supporting}>
        <PostCount count={found.length} />
      </div>
      <div className={styles.postList}>
        {found.length ? (
          found.slice(0, 3).map((post) => <PostLink key={post.permalink} post={post} />)
        ) : (
          <span className={styles.empty}>{NO_RESULTS}</span>
        )}
      </div>
    </FeatureCard>
  );
}

export default function FeatureVariant({ variant, ...data }: DataProps & { variant: string }) {
  switch (variant) {
    case 'F01':
      return <RandomPost {...data} />;
    case 'F02':
      return <YearBrowser {...data} />;
    case 'F03':
      return <TagFinder {...data} />;
    case 'F04':
      return <TimeToRead {...data} />;
    case 'F05':
      return <MonthBrowser {...data} />;
    case 'F06':
      return <TopicBrowser {...data} />;
    case 'F07':
      return <ReadingPath {...data} />;
    case 'F08':
      return <RecentPosts {...data} />;
    case 'F09':
      return <RelatedPosts {...data} />;
    case 'F10':
      return <QuickSearch {...data} />;
    default:
      return (
        <AdditionalFeature
          variant={variant}
          title={featureOptions.find((option) => option.key === variant)?.title ?? NO_RESULTS}
          {...data}
          labels={{ posts: POSTS, empty: NO_RESULTS, minutes: MINUTES }}
        />
      );
  }
}
