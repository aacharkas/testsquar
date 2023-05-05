import { Ability, AbilityTuple, MongoQuery, Subject } from '@casl/ability';
import { AnyObject } from '@casl/ability/dist/types/types';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

import TableItem from '../../../../libs/web/components/Table/TableItem';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextVariant } from '../../../../libs/web/constants/enums';
import { formatPhoneNumber } from '../../lib/formatPhoneNumber';
import { getItemDropdowns } from './InsuranceCarriers.helper';
import { TDropdownItem, TInsuranceCarriers } from './InsuranceCarriers.types';

interface IProps {
  item: TInsuranceCarriers;
  size: number;
  onClickRow?: (company: TInsuranceCarriers) => void;
  onClickView?: (item: TDropdownItem, selectedItem: TInsuranceCarriers) => void;
  ability: Ability<AbilityTuple<string, Subject>, MongoQuery<AnyObject>>;
}

const InsuranceCarriersTableItem = ({
  item,
  size,
  onClickRow,
  onClickView,
  ability,
}: IProps) => {
  const { t } = useTranslation('insurance_carriers');
  const dropdownItems = useMemo(
    () => getItemDropdowns(item?.id, t),
    [t, item?.id]
  );

  return (
    <TableItem
      dropdownItems={dropdownItems}
      columnsSize={size}
      columnsSizeTablet={4}
      onClick={() => onClickRow(item)}
      onClickItem={onClickView}
      itemToOpen={item}
      ability={ability}
    >
      <div className="flex items-center col-span-1">
        <Typography variant={ETextVariant.sm} className="truncate">
          {item.name || '-'}
        </Typography>
      </div>
      <div className="flex items-center col-span-1">
        <Typography variant={ETextVariant.sm} className="truncate">
          {item.email || '-'}
        </Typography>
      </div>
      <div className="flex items-center col-span-1">
        <Typography variant={ETextVariant.sm} className="truncate">
          {formatPhoneNumber(item.phone) || '-'}
        </Typography>
      </div>
    </TableItem>
  );
};

export default InsuranceCarriersTableItem;
