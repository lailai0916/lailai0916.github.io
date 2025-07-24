import { Icon } from '@iconify/react';
import styles from './styles.module.css';

interface IconTextProps {
  icon: string;
  children: React.ReactNode;
  colorMode?: 'theme' | 'monochrome';
}

export default function IconText({
  icon,
  children,
  colorMode = 'theme',
}: IconTextProps) {
  return (
    <span className={styles.iconText}>
      <Icon
        icon={icon}
        width="1.25em"
        height="1.25em"
        className={colorMode === 'theme' ? styles.iconTheme : ''}
      />
      <span>{children}</span>
    </span>
  );
}
