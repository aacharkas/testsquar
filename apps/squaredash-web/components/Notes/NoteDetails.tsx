import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'next-i18next';
import React, { useMemo, useState } from 'react';

import Dropdown from '../../../../libs/web/components/Dropdown/Dropdown';
import DropdownItem from '../../../../libs/web/components/Dropdown/DropdownItem';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { TNotes } from './NoteItems.types';
import { getItemDropdowns } from './NotesItem.helper';
import { useNotesData } from './hooks/useNotesData';
import { NOTES_DATA } from './hooks/useNotesData.mock';

interface IProps {
  item: TNotes;
}

const NoteDetails = ({ item }: IProps) => {
  const { t } = useTranslation(['notes']);
  const detailsData = NOTES_DATA?.filter((note) => note?.id == item?.id)[0];
  const dropdownItems = useMemo(
    () => getItemDropdowns(detailsData?.id, t, true),
    [t, detailsData?.id]
  );
  const { handlers } = useNotesData();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Typography variant={ETextVariant.xl_2} medium className="mr-4">
          {detailsData?.title}
        </Typography>
        <div className="right-20 lg:right-10 md:right-8 sm:right-4 sm:right-3">
          <Dropdown
            button={
              <EllipsisVerticalIcon
                className="h-6 w-6 text-gray-500"
                aria-hidden="true"
              />
            }
          >
            {dropdownItems.map((item, index) => {
              return (
                <DropdownItem
                  key={index}
                  href={item.href}
                  onClick={() => {
                    handlers.handleActionOnTableItem &&
                      handlers.handleActionOnTableItem(item);
                  }}
                >
                  <Typography
                    variant={ETextVariant.sm}
                    color={ETextColor.gray}
                    medium
                  >
                    {item.title}
                  </Typography>
                </DropdownItem>
              );
            })}
          </Dropdown>
        </div>
      </div>

      <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
        {detailsData?.note}
      </Typography>
    </div>
  );
};

export default NoteDetails;
