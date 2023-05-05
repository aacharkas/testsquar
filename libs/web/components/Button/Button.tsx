import classNames from 'classnames';
import { MouseEventHandler } from 'react';

import { buttonHelper } from './Button.helper';

interface IProps {
  theme?: 'dark' | 'light' | 'outline';
  shape?: 'rectangle' | 'circle';
  size?: 'small' | 'big';
  icon?: boolean;
  disabled?: boolean;
  hide?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode | string;
}

export function Button({
  theme = 'dark',
  shape = 'rectangle',
  size = 'small',
  icon = false,
  disabled = false,
  hide = false,
  className,
  onClick,
  children,
  ...props
}: IProps) {
  if (hide) return null;
  const classStyles = buttonHelper(theme, size, shape, icon);

  return (
    <button
      type="button"
      className={classNames(
        'inline-flex justify-center items-center border font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700',
        classStyles.buttonTheme,
        classStyles.buttonSize,
        classStyles.buttonShape,
        classStyles.iconButton,
        className
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
