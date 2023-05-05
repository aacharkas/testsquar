import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';
import placeholderCompany from '../../assets/images/company-background-logo.png';

import Avatar from '../../../../libs/web/components/Avatar/Avatar';
import Badge from '../../../../libs/web/components/Badge/Badge';
import TableItem from '../../../../libs/web/components/Table/TableItem';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { STATUSES_LABELS } from '../../../../libs/web/constants/constants';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { getItemDropdowns } from './Companies.helper';
import { TCompany, TDropdownItem } from './Companies.types';

interface IProps {
  item: TCompany;
  size: number;
  onClickRow?: (customer: TCompany) => void;
  onClickView?: (val: TDropdownItem, item: TCompany) => void;
}

const CompaniesTableItem = ({
  item,
  size,
  onClickRow,
  onClickView,
}: IProps) => {
  const { t } = useTranslation('companies');
  const dropdownItems = useMemo(
    () => getItemDropdowns(item, t),
    [t, item?.id, item?.status]
  );

  return (
    <TableItem
      dropdownItems={dropdownItems}
      columnsSize={size}
      columnsSizeTablet={4}
      onClick={() => onClickRow(item)}
      onClickItem={onClickView}
      itemToOpen={item}
    >
      <div className="flex col-span-2 items-center cursor-pointer">
        <div className="flex h-10 mr-4 bg-gray-100 items-center justify-center rounded-md">
          <Avatar size="medium" shape="square" image={item?.avatar || placeholderCompany?.src} />
        </div>
        <div>
          <Typography variant={ETextVariant.sm} medium className="mr-4">
            {item.name}
          </Typography>
        </div>
      </div>
      <div className="flex col-span-1 px-2 flex-col">
        <Typography
          variant={ETextVariant.sm}
          color={ETextColor.gray}
          className="hidden sm:block"
        >
          {t('owners')}
        </Typography>
        <Typography variant={ETextVariant.sm} medium>
          {item?.owners?.rows.map((member, index) => (member?.name))?.join(', ')}
        </Typography>
        {item?.owners?.totalCount > 3 && (
          <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
            + {item?.owners?.totalCount - 3} {t('others')}
          </Typography>
        )}
      </div>
      <div className="flex items-center col-span-1 sm:w-full sm:justify-end px-2">
        <Badge status={STATUSES_LABELS[item.status]}>
          {STATUSES_LABELS[item.status]}
        </Badge>
      </div>
    </TableItem>
  );
};

export default CompaniesTableItem;
