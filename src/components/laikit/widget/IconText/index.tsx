import { Icon } from '@iconify/react';
import styles from './styles.module.css';

interface IconTextProps {
  icon: string;
  children: React.ReactNode;
  size?: string;
  colorMode?: 'theme' | 'monochrome';
}

export default function IconText({
  icon,
  children,
  size = '1.25em',
  colorMode = 'theme',
}: IconTextProps) {
  return (
    <span className={styles.iconText}>
      <Icon
        icon={icon}
        width={size}
        height={size}
        className={colorMode === 'theme' && styles.iconTheme}
      />
      <span>{children}</span>
    </span>
  );
}
