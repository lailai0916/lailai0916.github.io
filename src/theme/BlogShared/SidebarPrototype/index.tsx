import { useMemo } from 'react';
import { translate } from '@docusaurus/Translate';
import { useHistory, useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Button from '@lailai0916/ui/Button';
import { useVisitorTimeZone } from '@site/src/hooks/useVisitorTimeZone';
import { getAllBlogItems, getAllPostMetadata, loadOfficialTags } from '@site/src/utils/blogData';
import { compareInstantsDescending, getDateKey } from '@site/src/utils/dateTime';
import ProfileVariant, { profileOptions } from './Profile';
import FeatureVariant, { featureOptions, type PrototypePost } from './Feature';
import styles from './styles.module.css';

const PROFILE_LABEL = translate({
  id: 'blog.sidebarPrototype.profileLabel',
  message: 'Profile card',
});
const FEATURE_LABEL = translate({
  id: 'blog.sidebarPrototype.featureLabel',
  message: 'Feature card',
});
const PREVIOUS = translate({ id: 'blog.sidebarPrototype.previous', message: 'Previous' });
const NEXT = translate({ id: 'blog.sidebarPrototype.next', message: 'Next' });

type Option = { key: string; title: string };

function VariantPicker({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly Option[];
  value: string;
  onChange: (key: string) => void;
}) {
  const index = options.findIndex((option) => option.key === value);
  const cycle = (delta: number) =>
    onChange(options[(index + delta + options.length) % options.length].key);

  return (
    <div className={styles.picker}>
      <label className={styles.pickerLabel}>
        <span>{label}</span>
        <select value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map((option) => (
            <option key={option.key} value={option.key}>
              {option.key} · {option.title}
            </option>
          ))}
        </select>
      </label>
      <div className={styles.pickerArrows}>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => cycle(-1)}
          aria-label={`${PREVIOUS} ${label}`}
        >
          ←
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => cycle(1)}
          aria-label={`${NEXT} ${label}`}
        >
          →
        </Button>
      </div>
    </div>
  );
}

export default function SidebarPrototype() {
  const { i18n } = useDocusaurusContext();
  const localeKey = i18n.currentLocale === i18n.defaultLocale ? undefined : i18n.currentLocale;
  const timeZone = useVisitorTimeZone();
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const requestedProfile = params.get('profile');
  const requestedFeature = params.get('feature');
  const profile = profileOptions.find((option) => option.key === requestedProfile)?.key ?? 'P01';
  const feature = featureOptions.find((option) => option.key === requestedFeature)?.key ?? 'F01';

  const posts = useMemo(() => {
    const metadata = new Map(getAllPostMetadata().map((post) => [post.permalink, post]));
    return getAllBlogItems()
      .map((item): PrototypePost | undefined => {
        const permalink = item.permalink ?? item.metadata?.permalink;
        const date = item.date ?? item.metadata?.date;
        const title = item.title ?? item.metadata?.title;
        if (!permalink || !date || !title) return undefined;
        const detail = metadata.get(permalink);
        return {
          permalink,
          date,
          title,
          readingTime: detail?.readingTime,
          tags: (detail?.tags ?? []).filter((tag): tag is { label: string; permalink: string } =>
            Boolean(tag.label && tag.permalink)
          ),
        };
      })
      .filter((post): post is PrototypePost => Boolean(post))
      .sort((a, b) => compareInstantsDescending(a.date, b.date));
  }, []);

  const tags = useMemo(
    () => [...loadOfficialTags(localeKey)].sort((a, b) => b.count - a.count),
    [localeKey]
  );
  const firstYear = posts.length
    ? Number(getDateKey(posts[posts.length - 1].date, timeZone).slice(0, 4))
    : 0;
  const latestYear = posts.length ? Number(getDateKey(posts[0].date, timeZone).slice(0, 4)) : 0;

  const choose = (kind: 'profile' | 'feature', key: string) => {
    const next = new URLSearchParams(location.search);
    next.set(kind, key);
    history.replace({
      pathname: location.pathname,
      search: `?${next.toString()}`,
      hash: location.hash,
    });
  };

  return (
    <div className={styles.root}>
      <ProfileVariant
        variant={profile}
        latestPost={posts[0]}
        postCount={posts.length}
        tagCount={tags.length}
        firstYear={firstYear}
        latestYear={latestYear}
        topTags={tags.slice(0, 4)}
      />
      <VariantPicker
        label={PROFILE_LABEL}
        options={profileOptions}
        value={profile}
        onChange={(key) => choose('profile', key)}
      />
      <FeatureVariant variant={feature} posts={posts} tags={tags} timeZone={timeZone} />
      <VariantPicker
        label={FEATURE_LABEL}
        options={featureOptions}
        value={feature}
        onChange={(key) => choose('feature', key)}
      />
    </div>
  );
}
