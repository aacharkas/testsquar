import { useTranslation } from 'next-i18next';
import React from 'react';

import TableItem from '../../../../libs/web/components/Table/TableItem';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { getItemDropdowns } from './DocumentItem.helper';
import { TDocuments } from './DocumentItem.types';

interface IProps {
  item: TDocuments;
  size: number;
  onClickView?: (val) => void;
}

const NoteItemsTableItem = ({ item, size, onClickView }: IProps) => {
  const { t } = useTranslation('buttons');
  const dropdownItems = getItemDropdowns(item, t);
  return (
    <TableItem
      dropdownItems={dropdownItems}
      columnsSize={size}
      onClickItem={onClickView}
    >
      <div className="flex col-span-2 items-center sm:items-start cursor-pointer">
        <Typography variant={ETextVariant.sm} medium className="mr-4">
          {item.name}
        </Typography>
      </div>
      <div className="flex items-center col-span-1 md:hidden sm:hidden">
        <Typography variant={ETextVariant.sm}>{item.fileSize}</Typography>
      </div>
    </TableItem>
  );
};

export default NoteItemsTableItem;
