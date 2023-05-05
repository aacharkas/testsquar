import classNames from 'classnames';
import React from 'react';

import Link from '../../../../apps/squaredash-web/components/Link';
import { Options } from './MenuItem.types';

interface IProps {
  item: Options;
}

export function MenuItem({ item }: IProps) {
  return (
    <Link
      type="tab"
      className={classNames("group flex items-center px-2 py-2 text-sm font-medium rounded-md", item?.style)}
      href={item.href}
    >
      <item.icon
        className={classNames('mr-3 flex-shrink-0 h-6 w-6')}
        aria-hidden="true"
      />
      <span className="flex-1">{item.name}</span>
    </Link>
  );
}

export default MenuItem;
