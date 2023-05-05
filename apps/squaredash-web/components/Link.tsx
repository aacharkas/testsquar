import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  skipLocaleHandling?: boolean;
  activeLink?: boolean;
  locale?: string;
  href?: string;
  className?: string;
  type?: 'tab' | 'link';
  target?: string;
  disabled?: boolean;
}

const stylesHelper = (type: string, activeLinkCheck: boolean): string => {
  let style;
  switch (type) {
  case 'tab':
    style = classNames('block', {
      'bg-gray-100 text-gray-900': activeLinkCheck,
      'text-gray-600 hover:bg-gray-100 hover:text-gray-900': !activeLinkCheck,
    });
    break;
  case 'link':
    style = classNames(
      'font-bold text-indigo-800 hover:text-indigo-500 focus:text-indigo-500'
    );
    break;
  default:
    style = '';
  }
  return style;
};

const LinkComponent = ({ children, skipLocaleHandling, ...rest }: IProps) => {
  const router = useRouter();
  const locale = rest?.locale || router?.query?.locale || '';
  const activeLinkCheck =
    rest?.activeLink || router?.pathname.includes(rest?.href.slice(0, -1));

  let href = rest.href || router.asPath;
  if (href.indexOf('http') === 0) skipLocaleHandling = true;
  if (locale && !skipLocaleHandling) {
    href = href
      ? `/${locale}${href}`
      : router.pathname.replace('[locale]', locale as string);
  }
  const styles = stylesHelper(rest?.type, activeLinkCheck);
  return (
    <>
      <Link href={href} legacyBehavior aria-disabled={rest?.disabled}>
        <a {...rest} target={rest.target} className={classNames(styles, rest?.className)}>
          {children}
        </a>
      </Link>
    </>
  );
};

export default LinkComponent;
