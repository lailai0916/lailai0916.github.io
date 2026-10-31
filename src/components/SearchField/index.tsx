import { useRef, type ComponentProps, type ReactNode } from 'react';
import { translate } from '@docusaurus/Translate';
import Card from '@lailai0916/ui/Card';
import Icon from '@lailai0916/ui/Icon';
import IconButton from '@lailai0916/ui/IconButton';
import clsx from 'clsx';
import styles from './styles.module.css';

const CLEAR_SEARCH = translate({
  id: 'components.searchField.clear',
  message: 'Clear search',
});

type Props = Omit<ComponentProps<'input'>, 'value' | 'onChange' | 'prefix'> & {
  value: string;
  onValueChange: (value: string) => void;
  prefix?: ReactNode;
};

export default function SearchField({
  value,
  onValueChange,
  prefix,
  className,
  ...inputProps
}: Props): ReactNode {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Card padding={0} className={clsx(styles.surface, className)}>
      <div className={styles.field}>
        <Icon icon="lucide:search" className={styles.icon} aria-hidden />
        {prefix}
        <input
          {...inputProps}
          ref={inputRef}
          type="search"
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          className={styles.input}
        />
        {value && (
          <IconButton
            size="xs"
            label={CLEAR_SEARCH}
            onClick={() => {
              onValueChange('');
              inputRef.current?.focus();
            }}
          >
            <Icon icon="lucide:x" width={16} height={16} aria-hidden />
          </IconButton>
        )}
      </div>
    </Card>
  );
}
