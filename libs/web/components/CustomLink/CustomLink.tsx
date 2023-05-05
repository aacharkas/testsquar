import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';

import styles from './CustomLink.module.css';

interface IProps {
  href: string;
  className?: string;
  target?: string;
  children?: React.ReactNode | string;
}

export function CustomLink({
  href = '#',
  className,
  target,
  children,
}: IProps) {
  return (
    <Link
      target={target}
      href={href}
      className={classNames(styles['link'], className)}
    >
      {children}
    </Link>
  );
}

export default CustomLink;
