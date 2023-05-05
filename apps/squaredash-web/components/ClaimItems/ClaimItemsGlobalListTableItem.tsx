import { useTranslation } from 'next-i18next';
import React from 'react';

import TableItem from '../../../../libs/web/components/Table/TableItem';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import {getItemDropdowns, getSuggestionsItemDropdowns} from './ClaimItems.helper';
import { TClaimItem, TDropdownItem } from './ClaimItems.types';

interface IProps {
  item: TClaimItem;
  size: number;
  globalTab?: boolean;
  onClickView: (item: TDropdownItem, selectedItem: TClaimItem) => void;
  onClickRow: (item: TClaimItem) => void;
}

const ClaimItemsGlobalListTableItem = ({ item, size, onClickView, globalTab, onClickRow }: IProps) => {
  const { t } = useTranslation('claim_items');
  const dropdownItems = globalTab ? getItemDropdowns(item.id, t) : getSuggestionsItemDropdowns(item.id, t);

  return (
    <TableItem
      dropdownItems={dropdownItems}
      columnsSize={size}
      onClickItem={(dropdownItem) => onClickView(dropdownItem, item)}
      onClick={() => onClickRow(item)}
    >
      <div className="flex col-span-2 items-center sm:items-start cursor-pointer">
        <div>
          <Typography variant={ETextVariant.sm} medium className="mr-4">
            {item.description}
          </Typography>
          <Typography
            variant={ETextVariant.sm}
            color={ETextColor.gray}
            className="xl:hidden lg:hidden"
          >
            {item.source}
          </Typography>
        </div>
      </div>
      <div className="flex items-center col-span-1 md:hidden sm:hidden">
        <Typography variant={ETextVariant.sm}>
          {item.source}
        </Typography>
      </div>
    </TableItem>
  );
};

export default ClaimItemsGlobalListTableItem;
