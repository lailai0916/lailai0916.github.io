import React from 'react';
import styles from './styles.module.css';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel?: string;
}

export default function Switch({
  checked,
  onChange,
  ariaLabel = 'Toggle setting',
}: SwitchProps) {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={ariaLabel}
      />
      <span className={styles.slider}></span>
    </label>
  );
}
