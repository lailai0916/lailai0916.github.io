import { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { translate } from '@docusaurus/Translate';
import { Avatar } from '@lailai0916/ui/Avatar';
import Card from '@lailai0916/ui/Card';
import TitleCard from '@lailai0916/ui/TitleCard';
import AdditionalProfile from './Additional';
import styles from './styles.module.css';

export const profileOptions = [
  {
    key: 'P01',
    title: translate({ id: 'blog.sidebarPrototype.profile.centered.title', message: 'Centered' }),
  },
  {
    key: 'P02',
    title: translate({
      id: 'blog.sidebarPrototype.profile.horizontal.title',
      message: 'Horizontal',
    }),
  },
  {
    key: 'P03',
    title: translate({ id: 'blog.sidebarPrototype.profile.byline.title', message: 'Byline' }),
  },
  {
    key: 'P04',
    title: translate({ id: 'blog.sidebarPrototype.profile.header.title', message: 'Header' }),
  },
  {
    key: 'P05',
    title: translate({
      id: 'blog.sidebarPrototype.profile.navigation.title',
      message: 'Navigation',
    }),
  },
  {
    key: 'P06',
    title: translate({ id: 'blog.sidebarPrototype.profile.compact.title', message: 'Compact' }),
  },
  {
    key: 'P07',
    title: translate({ id: 'blog.sidebarPrototype.profile.links.title', message: 'Links' }),
  },
  {
    key: 'P08',
    title: translate({ id: 'blog.sidebarPrototype.profile.split.title', message: 'Split' }),
  },
  {
    key: 'P09',
    title: translate({ id: 'blog.sidebarPrototype.profile.minimal.title', message: 'Minimal' }),
  },
  {
    key: 'P10',
    title: translate({ id: 'blog.sidebarPrototype.profile.latest.title', message: 'Latest Post' }),
  },
  {
    key: 'P11',
    title: translate({
      id: 'blog.sidebarPrototype.profile.column.title',
      message: 'Author Column',
    }),
  },
  {
    key: 'P12',
    title: translate({ id: 'blog.sidebarPrototype.profile.timeline.title', message: 'Timeline' }),
  },
  {
    key: 'P13',
    title: translate({ id: 'blog.sidebarPrototype.profile.numbers.title', message: 'In Numbers' }),
  },
  {
    key: 'P14',
    title: translate({
      id: 'blog.sidebarPrototype.profile.featured.title',
      message: 'Featured Post',
    }),
  },
  {
    key: 'P15',
    title: translate({ id: 'blog.sidebarPrototype.profile.work.title', message: 'Projects' }),
  },
  {
    key: 'P16',
    title: translate({ id: 'blog.sidebarPrototype.profile.subjects.title', message: 'Subjects' }),
  },
  {
    key: 'P17',
    title: translate({ id: 'blog.sidebarPrototype.profile.directory.title', message: 'Directory' }),
  },
  {
    key: 'P18',
    title: translate({ id: 'blog.sidebarPrototype.profile.intro.title', message: 'Introduction' }),
  },
  {
    key: 'P19',
    title: translate({ id: 'blog.sidebarPrototype.profile.contact.title', message: 'Contact' }),
  },
  {
    key: 'P20',
    title: translate({ id: 'blog.sidebarPrototype.profile.cover.title', message: 'Cover' }),
  },
] as const;

const ROLE = translate({
  id: 'blog.sidebarPrototype.profile.role',
  message: 'Student & Developer',
});
const ABOUT = translate({ id: 'blog.sidebarPrototype.profile.about', message: 'About me' });
const PROJECTS = translate({ id: 'blog.sidebarPrototype.profile.projects', message: 'Projects' });
const WRITING = translate({ id: 'blog.sidebarPrototype.profile.writing', message: 'Blog' });
const GITHUB = translate({ id: 'blog.sidebarPrototype.profile.github', message: 'GitHub' });
const PROFILE = translate({ id: 'blog.sidebarPrototype.profile.label', message: 'Profile' });
const LATEST = translate({
  id: 'blog.sidebarPrototype.profile.latestLabel',
  message: 'Latest post',
});
const PROFILE_LABELS = {
  role: ROLE,
  about: ABOUT,
  projects: PROJECTS,
  blog: WRITING,
  github: GITHUB,
  profile: PROFILE,
  latest: LATEST,
};

const name = 'lailai';
type ProfileProps = {
  variant: string;
  latestPost?: { title: string; permalink: string; tags?: { label: string; permalink: string }[] };
  postCount: number;
  tagCount: number;
  firstYear: number;
  latestYear: number;
  topTags: { label: string; permalink: string; count: number }[];
};

function ProfileAvatar({ src, size = 56 }: { src: string; size?: number }) {
  return <Avatar src={src} name={name} alt="" size={size} />;
}

function Name({ role = true }: { role?: boolean }) {
  return (
    <div className={styles.nameGroup}>
      <div className={styles.name}>{name}</div>
      {role && <div className={styles.role}>{ROLE}</div>}
    </div>
  );
}

function RowLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className={styles.rowLink} to={to}>
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

function SmallLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className={styles.smallLink} to={to}>
      {children}
    </Link>
  );
}

export default function ProfileVariant({
  variant,
  latestPost,
  postCount,
  tagCount,
  firstYear,
  latestYear,
  topTags,
}: ProfileProps) {
  const avatar = useBaseUrl('/img/logo.svg');
  const about = useBaseUrl('/about');
  const projects = useBaseUrl('/docs/project');
  const blog = useBaseUrl('/blog');
  const github = 'https://github.com/lailai0916';

  if (Number(variant.slice(1)) >= 11) {
    return (
      <AdditionalProfile
        variant={variant}
        avatar={avatar}
        about={about}
        projects={projects}
        blog={blog}
        github={github}
        latestPost={latestPost}
        postCount={postCount}
        tagCount={tagCount}
        firstYear={firstYear}
        latestYear={latestYear}
        topTags={topTags}
        labels={PROFILE_LABELS}
        title={profileOptions.find((option) => option.key === variant)?.title ?? PROFILE}
      />
    );
  }

  switch (variant) {
    case 'P01':
      return (
        <Card className={styles.card} padding="1rem">
          <div className={styles.centered}>
            <ProfileAvatar src={avatar} size={72} />
            <Name />
            <SmallLink to={about}>{ABOUT} ↗</SmallLink>
          </div>
        </Card>
      );
    case 'P02':
      return (
        <Card className={styles.card} padding="1rem">
          <div className={styles.identity}>
            <ProfileAvatar src={avatar} />
            <Name />
          </div>
          <div className={styles.footer}>
            <SmallLink to={about}>{ABOUT}</SmallLink>
            <SmallLink to={projects}>{PROJECTS}</SmallLink>
            <SmallLink to={github}>{GITHUB}</SmallLink>
          </div>
        </Card>
      );
    case 'P03':
      return (
        <TitleCard className={styles.card} size="plain" padding="1rem" title={WRITING}>
          <div className={styles.identity}>
            <ProfileAvatar src={avatar} size={40} />
            <Name />
          </div>
          <div className={styles.footer}>
            <SmallLink to={about}>{ABOUT} ↗</SmallLink>
          </div>
        </TitleCard>
      );
    case 'P04':
      return (
        <TitleCard className={styles.card} size="plain" padding="1rem" title={PROFILE}>
          <div className={styles.header}>
            <div>
              <Name />
            </div>
            <ProfileAvatar src={avatar} size={56} />
          </div>
          <div className={styles.footer}>
            <SmallLink to={about}>{ABOUT}</SmallLink>
            <SmallLink to={projects}>{PROJECTS}</SmallLink>
          </div>
        </TitleCard>
      );
    case 'P05':
      return (
        <Card className={styles.card} padding="1rem">
          <div className={styles.identity}>
            <ProfileAvatar src={avatar} size={48} />
            <Name />
          </div>
          <nav className={styles.rows} aria-label={PROFILE}>
            <RowLink to={about}>{ABOUT}</RowLink>
            <RowLink to={blog}>{WRITING}</RowLink>
            <RowLink to={projects}>{PROJECTS}</RowLink>
          </nav>
        </Card>
      );
    case 'P06':
      return (
        <Card className={styles.card} padding="1rem">
          <Link to={about} className={styles.compactLink}>
            <ProfileAvatar src={avatar} size={48} />
            <Name />
            <span aria-hidden="true">↗</span>
          </Link>
        </Card>
      );
    case 'P07':
      return (
        <Card className={styles.card} padding="1rem">
          <div className={styles.identity}>
            <ProfileAvatar src={avatar} size={48} />
            <Name />
          </div>
          <div className={styles.linkGrid}>
            <SmallLink to={about}>{ABOUT} ↗</SmallLink>
            <SmallLink to={projects}>{PROJECTS} ↗</SmallLink>
            <SmallLink to={github}>{GITHUB} ↗</SmallLink>
            <SmallLink to={blog}>{WRITING} ↗</SmallLink>
          </div>
        </Card>
      );
    case 'P08':
      return (
        <Card className={styles.card} padding="1rem">
          <div className={styles.header}>
            <Name />
            <ProfileAvatar src={avatar} size={64} />
          </div>
          <div className={styles.footer}>
            <SmallLink to={blog}>{WRITING}</SmallLink>
            <SmallLink to={about}>{ABOUT} ↗</SmallLink>
          </div>
        </Card>
      );
    case 'P09':
      return (
        <Card className={styles.card} padding="1rem">
          <div className={styles.minimal}>
            <ProfileAvatar src={avatar} size={40} />
            <Name role={false} />
            <SmallLink to={about}>{ABOUT} ↗</SmallLink>
          </div>
        </Card>
      );
    default:
      return (
        <Card className={styles.card} padding="1rem">
          <div className={styles.identity}>
            <ProfileAvatar src={avatar} size={48} />
            <Name />
          </div>
          <div className={styles.latest}>
            <div className={styles.latestLabel}>{LATEST}</div>
            {latestPost && <Link to={latestPost.permalink}>{latestPost.title}</Link>}
          </div>
          <div className={styles.footer}>
            <SmallLink to={about}>{ABOUT} ↗</SmallLink>
          </div>
        </Card>
      );
  }
}
