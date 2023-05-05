import classNames from 'classnames';
import React from 'react';

import Link from '../../../../apps/squaredash-web/components/Link';

interface IProps {
  href?: string;
  onClick?: (TItem) => void;
  children: React.ReactNode | string;
  className?: string;
  disabled?: boolean;
  visible?: boolean;
}

export function DropdownItem({
  href,
  onClick,
  children,
  className,
  disabled = false,
  visible = true,
}: IProps) {
  const style = classNames(
    {
      'hover:bg-gray-50 text-primary-700 text-gray-900': !disabled,
    },
    'flex items-center bg-white flex text-sm items-start px-4 py-2.5 min-w-[7rem] shadow-sm border-gray-300',
    className,
  );

  if (!visible) return null;

  return href ? (
    <Link href={href} className={style} disabled={disabled}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} disabled={disabled} className={style}>
      {children}
    </button>
  );
}

export default DropdownItem;
