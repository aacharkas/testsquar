import classNames from 'classnames';
import React from 'react';

import { ETextColor, ETextVariant } from '../../constants/enums';
import SortBy from '../SortBy/SortBy';
import Typography from '../Typography/Typography';

interface IProps {
  items: string[];
  columnsSize?: number;
  className?: string;
  sortItem?: string;
  sortOrder?: string;
  setSortOrder?: (e) => void;
  isFirstItemBig?: boolean;
}

const TableHeader = ({
  items,
  columnsSize,
  className,
  sortItem,
  sortOrder,
  setSortOrder,
  isFirstItemBig = false,
}: IProps) => {
  return (
    <div
      className={classNames(
        'pl-4 grid border-b border-gray-200 bg-gray-50 gap-4 pr-20',
        {
          'grid-cols-2': columnsSize == 1,
          'grid-cols-3': columnsSize == 2,
          'grid-cols-4': columnsSize == 3,
          'grid-cols-5': columnsSize == 4,
          'grid-cols-8': columnsSize == 7,
        },
        className
      )}
    >
      {items.map((item, index) => {
        if (item == sortItem && sortOrder) {
          return (
            <SortBy
              key={index}
              currentSort={sortOrder}
              setCurrentSort={setSortOrder}
              className={classNames(
                'py-2 px-2 items-start',
                isFirstItemBig ? 'col-span-2' : 'col-span-1'
              )}
              arrowsSize="small"
            >
              <Typography
                key={index}
                variant={ETextVariant.sm}
                color={ETextColor.gray}
              >
                {item}
              </Typography>
            </SortBy>
          );
        }
        return (
          <Typography
            key={index}
            variant={ETextVariant.sm}
            color={ETextColor.gray}
            className={classNames(
              'py-2 px-2 text-left',
              isFirstItemBig && !index ? 'col-span-2' : 'col-span-1'
            )}
          >
            {item}
          </Typography>
        );
      })}
    </div>
  );
};

export default TableHeader;
