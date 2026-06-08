import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: boolean;
  active?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    variant = 'secondary',
    size = 'md',
    rounded = false,
    active = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    type = 'button',
    className,
    ...rest
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={clsx(
        styles.button,
        styles[`variant_${variant}`],
        styles[`size_${size}`],
        rounded && styles.rounded,
        active && styles.active,
        fullWidth && styles.fullWidth,
        className
      )}
      {...rest}
    >
      {leftIcon != null && <span className={styles.icon}>{leftIcon}</span>}
      {children != null && <span className={styles.label}>{children}</span>}
      {rightIcon != null && <span className={styles.icon}>{rightIcon}</span>}
    </button>
  );
});

export default Button;
