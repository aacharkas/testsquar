import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

import TableItem from '../../../../libs/web/components/Table/TableItem';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { TDropdownItem, TNotes } from './NoteItems.types';
import { getItemDropdowns } from './NotesItem.helper';

interface IProps {
  item: TNotes;
  size: number;
  onClickView?: (val: TDropdownItem) => void;
  onClickRow?: (note: TNotes) => void;
}

const NoteItemsTableItem = ({
  item,
  size,
  onClickView,
  onClickRow,
}: IProps) => {
  const { t } = useTranslation('buttons');
  const dropdownItems = useMemo(
    () => getItemDropdowns(item?.id, t),
    [item?.id, t]
  );
  return (
    <TableItem
      dropdownItems={dropdownItems}
      columnsSize={size}
      onClick={() => onClickRow(item)}
      onClickItem={onClickView}
    >
      <div className="min-w-0">
        <Typography variant={ETextVariant.sm} medium className="mr-4">
          {item.title}
        </Typography>
        <Typography
          variant={ETextVariant.sm}
          color={ETextColor.gray}
          className="truncate"
        >
          {item.note}
        </Typography>
      </div>
    </TableItem>
  );
};

export default NoteItemsTableItem;
