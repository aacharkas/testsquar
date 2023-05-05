import classNames from 'classnames';
import { EStatus } from 'libs/web/constants/enums';

import { badgeHelper } from './Badge.helper';

interface IProps {
  size?: 'small' | 'big';
  status?: EStatus;
  color?: string;
  removeButton?: boolean;
  className?: string;
  onClick?: () => void;
  children: string;
  checked?: boolean;
}

export function Badge({
  size = 'small',
  status,
  color = 'white',
  removeButton = false,
  className,
  onClick,
  children,
  checked = false,
}: IProps) {
  const classStyles = badgeHelper(size, color, status);

  return (
    <button
      className={classNames(
        'inline-flex items-center rounded-full text-xs font-medium',
        checked && 'outline-none ring-2 ring-offset-2 ring-indigo-700',
        classStyles.badgeSize,
        classStyles.badgeColor,
        className
      )}
      onClick={onClick}
    >
      {children}
      {removeButton && (
        <button
          type="button"
          className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none"
        >
          <svg
            className="h-2 w-2"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 8 8"
          >
            <path
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M1 1l6 6m0-6L1 7"
            />
          </svg>
        </button>
      )}
    </button>
  );
}

export default Badge;
