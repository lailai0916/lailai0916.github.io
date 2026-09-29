import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { usePluralForm } from '@docusaurus/theme-common';
import { Avatar } from '@lailai0916/ui/Avatar';
import Card from '@lailai0916/ui/Card';
import TitleCard from '@lailai0916/ui/TitleCard';
import { TagChipList } from '../../BlogUI';
import styles from './additional.module.css';

const POSTS = translate({ id: 'blog.sidebarPrototype.profile.posts', message: 'post|posts' });
const TAGS = translate({ id: 'blog.sidebarPrototype.profile.tags', message: 'tag|tags' });
const ALL_POSTS = translate({
  id: 'blog.sidebarPrototype.profile.allPosts',
  message: 'All posts',
});
const SINCE = translate({ id: 'blog.sidebarPrototype.profile.since', message: 'Writing since' });
const ARCHIVE = translate({ id: 'blog.sidebarPrototype.profile.archive', message: 'Archive' });
const EXPLORE_PROJECTS = translate({
  id: 'blog.sidebarPrototype.profile.exploreProjects',
  message: 'Explore projects',
});
const INTRO = translate({
  id: 'blog.sidebarPrototype.profile.intro.description',
  message: 'A high school student from Hangzhou, China',
});
const READ_MORE = translate({ id: 'blog.sidebarPrototype.profile.readMore', message: 'Read more' });
const EMAIL = translate({ id: 'blog.sidebarPrototype.profile.email', message: 'Email' });
const SITE = translate({ id: 'blog.sidebarPrototype.profile.site', message: 'Personal site' });

type Props = {
  variant: string;
  title: string;
  avatar: string;
  about: string;
  projects: string;
  blog: string;
  github: string;
  latestPost?: { title: string; permalink: string; tags?: { label: string; permalink: string }[] };
  postCount: number;
  tagCount: number;
  firstYear: number;
  latestYear: number;
  topTags: { label: string; permalink: string; count: number }[];
  labels: {
    role: string;
    about: string;
    projects: string;
    blog: string;
    github: string;
    profile: string;
    latest: string;
  };
};

function Portrait({ src, size = 44 }: { src: string; size?: number }) {
  return <Avatar src={src} name="lailai" alt="" size={size} />;
}

function Identity({ avatar, role }: { avatar: string; role: string }) {
  return (
    <div className={styles.identity}>
      <Portrait src={avatar} />
      <div className={styles.identityText}>
        <div className={styles.name}>lailai</div>
        <div className={styles.muted}>{role}</div>
      </div>
    </div>
  );
}

function ActionLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className={styles.actionLink} to={to}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

function NumberedLink({
  number,
  to,
  children,
}: {
  number: string;
  to: string;
  children: ReactNode;
}) {
  return (
    <Link className={styles.numberedLink} to={to}>
      <span className={styles.number}>{number}</span>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

export default function AdditionalProfile({
  variant,
  title,
  avatar,
  about,
  projects,
  blog,
  github,
  latestPost,
  postCount,
  tagCount,
  firstYear,
  latestYear,
  topTags,
  labels,
}: Props) {
  const { selectMessage } = usePluralForm();

  switch (variant) {
    case 'P11':
      return (
        <Card className={styles.card} padding="1rem">
          <Identity avatar={avatar} role={labels.role} />
          <div className={styles.columnFooter}>
            <span className={styles.muted}>
              {postCount} {selectMessage(postCount, POSTS)}
            </span>
            <Link className={styles.inlineLink} to={blog}>
              {ALL_POSTS} ↗
            </Link>
          </div>
        </Card>
      );
    case 'P12':
      return (
        <Card className={styles.card} padding="1rem">
          <div className={styles.timelineHeader}>
            <span className={styles.eyebrow}>{SINCE}</span>
            <Portrait src={avatar} size={36} />
          </div>
          <div className={styles.years}>
            {firstYear || '—'} <span aria-hidden="true">–</span> {latestYear || '—'}
          </div>
          <div className={styles.timelineFooter}>
            <span className={styles.name}>lailai</span>
            <Link className={styles.inlineLink} to={blog}>
              {ARCHIVE} ↗
            </Link>
          </div>
        </Card>
      );
    case 'P13':
      return (
        <Card className={styles.card} padding="1rem">
          <Identity avatar={avatar} role={labels.role} />
          <dl className={styles.metrics}>
            <div>
              <dt>{selectMessage(postCount, POSTS)}</dt>
              <dd>{postCount}</dd>
            </div>
            <div>
              <dt>{selectMessage(tagCount, TAGS)}</dt>
              <dd>{tagCount}</dd>
            </div>
          </dl>
          <ActionLink to={blog}>{labels.blog}</ActionLink>
        </Card>
      );
    case 'P14':
      return (
        <TitleCard className={styles.card} size="plain" padding="1rem" title={title}>
          <div className={styles.compactIdentity}>
            <Portrait src={avatar} size={32} />
            <span>lailai</span>
          </div>
          {latestPost && (
            <Link className={styles.featuredPost} to={latestPost.permalink}>
              {latestPost.title}
            </Link>
          )}
          {latestPost?.tags?.[0] && (
            <div className={styles.tags}>
              <TagChipList
                items={[
                  {
                    to: latestPost.tags[0].permalink,
                    label: latestPost.tags[0].label,
                  },
                ]}
              />
            </div>
          )}
        </TitleCard>
      );
    case 'P15':
      return (
        <Card className={styles.card} padding="1rem">
          <Identity avatar={avatar} role={labels.role} />
          <div className={styles.projectFocus}>
            <span className={styles.eyebrow}>{labels.projects}</span>
            <ActionLink to={projects}>{EXPLORE_PROJECTS}</ActionLink>
          </div>
          <Link className={styles.inlineLink} to={about}>
            {labels.about} ↗
          </Link>
        </Card>
      );
    case 'P16':
      return (
        <TitleCard className={styles.card} size="plain" padding="1rem" title={title}>
          <Identity avatar={avatar} role={labels.role} />
          <div className={styles.tags}>
            <TagChipList
              items={topTags.map((tag) => ({
                to: tag.permalink,
                label: tag.label,
                count: tag.count,
              }))}
            />
          </div>
        </TitleCard>
      );
    case 'P17':
      return (
        <Card className={styles.card} padding="1rem">
          <Identity avatar={avatar} role={labels.role} />
          <nav className={styles.directory} aria-label={labels.profile}>
            <NumberedLink number="01" to={about}>
              {labels.about}
            </NumberedLink>
            <NumberedLink number="02" to={blog}>
              {labels.blog}
            </NumberedLink>
            <NumberedLink number="03" to={projects}>
              {labels.projects}
            </NumberedLink>
          </nav>
        </Card>
      );
    case 'P18':
      return (
        <Card className={styles.card} padding="1rem">
          <div className={styles.introHeader}>
            <span className={styles.name}>lailai</span>
            <Portrait src={avatar} size={40} />
          </div>
          <p className={styles.introText}>{INTRO}</p>
          <ActionLink to={about}>{READ_MORE}</ActionLink>
        </Card>
      );
    case 'P19':
      return (
        <TitleCard className={styles.card} size="plain" padding="1rem" title={title}>
          <Identity avatar={avatar} role={labels.role} />
          <div className={styles.contactLinks}>
            <ActionLink to="mailto:lailai0x394@gmail.com">{EMAIL}</ActionLink>
            <ActionLink to={github}>{labels.github}</ActionLink>
          </div>
        </TitleCard>
      );
    default:
      return (
        <Card className={styles.card} padding="1rem">
          <div className={styles.coverHeader}>
            <span className={styles.eyebrow}>{SITE}</span>
            <Portrait src={avatar} size={40} />
          </div>
          <div className={styles.coverName}>lailai</div>
          <div className={styles.muted}>{labels.role}</div>
          <div className={styles.coverFooter}>
            <Link className={styles.inlineLink} to={about}>
              {labels.about} ↗
            </Link>
            <span className={styles.muted}>{firstYear || ''}</span>
          </div>
        </Card>
      );
  }
}
