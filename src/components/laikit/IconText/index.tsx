import { Icon } from '@iconify/react';
import styles from './styles.module.css';

interface IconTextProps {
  icon: string;
  children: React.ReactNode;
  size?: string;
  monochrome?: boolean;
}

export default function IconText({
  icon,
  children,
  size = '1.25em',
  monochrome = false,
}: IconTextProps) {
  return (
    <span className={styles.iconText}>
      <Icon
        icon={icon}
        width={size}
        height={size}
        className={monochrome ? undefined : styles.iconTheme}
      />
      <span>{children}</span>
    </span>
  );
}
