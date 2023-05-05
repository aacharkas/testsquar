import classNames from 'classnames';
import React from 'react';

import Link from '../../../../apps/squaredash-web/components/Link';
import { ETextVariant } from '../../constants/enums';
import { Options } from '../MenuItem/MenuItem.types';
import Typography from '../Typography/Typography';

interface IProps {
  item: Options;
}

export function MenuDropdownItem({ item }: IProps) {
  return (
    <Link href={item.href} type="tab">
      <Typography variant={ETextVariant.sm} className="pl-11 py-3">
        {item.name}
      </Typography>
    </Link>
  );
}

export default MenuDropdownItem;
