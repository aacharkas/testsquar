import { Ability, AbilityTuple, MongoQuery, Subject } from '@casl/ability';
import { AnyObject } from '@casl/ability/dist/types/types';
import { useTranslation } from 'next-i18next';
import React from 'react';

import TableItem from '../../../../libs/web/components/Table/TableItem';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextVariant } from '../../../../libs/web/constants/enums';
import { getItemDropdowns } from './UOM.helper';
import { TDropdownItem, TUOM } from './UOM.types';

interface IProps {
  item: TUOM;
  size: number;
  onClickView?: (val: TDropdownItem, item?: TUOM) => void;
  ability: Ability<AbilityTuple<string, Subject>, MongoQuery<AnyObject>>;
}

const UOMTableItem = ({ item, size, onClickView, ability }: IProps) => {
  const { t } = useTranslation('buttons');
  const dropdownItems = getItemDropdowns(item.id, t);

  return (
    <TableItem
      dropdownItems={dropdownItems}
      columnsSize={size}
      columnsSizeTablet={4}
      onClickItem={(dropdownItem) => onClickView(dropdownItem, item)}
      ability={ability}
    >
      <div className="flex col-span-2 items-center">
        <div>
          <Typography variant={ETextVariant.sm} medium className="mr-4">
            {item.name}
          </Typography>
        </div>
      </div>
      <div className="flex items-center col-span-1">
        <Typography variant={ETextVariant.sm} medium className="mr-4">
          {item.abbreviation}
        </Typography>
      </div>
    </TableItem>
  );
};

export default UOMTableItem;
