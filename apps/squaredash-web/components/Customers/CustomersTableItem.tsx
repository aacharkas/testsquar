import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { formatPhoneNumber } from '../../lib/formatPhoneNumber';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

import Badge from '../../../../libs/web/components/Badge/Badge';
import TableItem from '../../../../libs/web/components/Table/TableItem';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { getItemDropdowns } from './Customers.helper';
import { TCustomer, TDropdownItem } from './Customers.types';

interface IProps {
  item: TCustomer;
  size: number;
  notAbleToRemoveMember: boolean;
  onClickRow?: (customer: TCustomer) => void;
  onClickView?: (val: TDropdownItem, item: TCustomer) => void;
}

const CustomersTableItem = ({
  item,
  size,
  onClickRow,
  onClickView,
  notAbleToRemoveMember,
}: IProps) => {
  const { t } = useTranslation('customers');
  const dropdownItems = useMemo(
    () => getItemDropdowns({id:item?.id, t, short: false, notAbleToRemoveMember}),
    [item?.id, t, notAbleToRemoveMember]
  );

  return (
    <TableItem
      dropdownItems={dropdownItems}
      columnsSize={size}
      columnsSizeTablet={2}
      onClick={() => onClickRow(item)}
      onClickItem={onClickView}
      itemToOpen={item}
    >
      <div className="flex items-center col-span-1 md:flex-col sm:flex-col md:items-start sm:items-start">
        <div className="flex md:mb-1 sm:mb-1 px-2 flex-wrap gap-2 truncate">
          <Typography variant={ETextVariant.sm} className="truncate">
            {item.displayName}
          </Typography>
          {item.parentId && <Badge color="blue">{t('sub_customer')}</Badge>}
        </div>
        <div className="hidden md:flex sm:flex flex-col px-2 truncate">
          <Typography
            variant={ETextVariant.sm}
            color={ETextColor.gray}
            className="flex items-center truncate"
          >
            <EnvelopeIcon className="hidden sm:block h-4 w-3 mr-1 truncate" />
            {item.email}
          </Typography>
          <Typography
            variant={ETextVariant.sm}
            color={ETextColor.gray}
            className="flex items-center truncate"
          >
            <PhoneIcon className="hidden sm:block h-4 w-3 mr-1" />
            {formatPhoneNumber(item.phone)}
          </Typography>
          <Typography
            variant={ETextVariant.sm}
            color={ETextColor.gray}
            className="flex items-center truncate"
          >
            <BuildingOffice2Icon className="hidden sm:block h-4 w-3 mr-1" />
            {item?.billingAddress?.formattedAddress || '-'}
          </Typography>
        </div>
      </div>
      <div className="px-2 flex items-start flex-col col-span-1 justify-center md:hidden sm:hidden lg:max-w-[215px] truncate">
        <Typography variant={ETextVariant.sm} className="truncate">
          {item.email}
        </Typography>
        <Typography variant={ETextVariant.sm} className="truncate">
          {formatPhoneNumber(item.phone)}
        </Typography>
      </div>
      <div className="px-2 flex items-center col-span-1 md:hidden sm:hidden truncate">
        <Typography variant={ETextVariant.sm} className="truncate">
          {item?.billingAddress?.formattedAddress || '-'}
        </Typography>
      </div>
      <div className="px-2 flex items-start col-span-1 flex-col justify-center md:justify-start sm:justify-start lg:max-w-[200px] truncate">
        {item?.responsibleMembers?.slice(0, 2).map((member, index) => (
          <Typography
            variant={ETextVariant.sm}
            key={index}
            medium
            className="truncate"
          >
            {member?.name}
          </Typography>
        ))}
        {item?.responsibleMembers?.length > 2 && (
          <Typography
            variant={ETextVariant.sm}
            color={ETextColor.gray}
            className="truncate"
          >
            + {item?.responsibleMembers?.slice(2).length}{' '}
            {item?.responsibleMembers?.length > 3 ? t('others') : t('other')}
          </Typography>
        )}
      </div>
    </TableItem>
  );
};

export default CustomersTableItem;
