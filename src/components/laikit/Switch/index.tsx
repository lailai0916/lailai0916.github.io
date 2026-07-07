import styles from './styles.module.css';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  'aria-label'?: string;
}

export default function Switch({ checked, onChange, 'aria-label': ariaLabel }: SwitchProps) {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={checked}
        aria-label={ariaLabel}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.slider} />
    </label>
  );
}
