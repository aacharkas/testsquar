import React, { ReactNode, useState } from 'react';
import classNames from 'classnames';
import Typography from '../Typography/Typography';
import { ETextColor, ETextVariant } from '../../constants/enums';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

interface IProps {
  children?: ReactNode;
  className?: string;
  currentSort: string;
  setCurrentSort: (string) => void;
  arrowsSize?: 'small' | 'big';
}

const SortBy = ({
  children,
  className,
  currentSort,
  setCurrentSort,
  arrowsSize = 'big',
}: IProps) => {
  const handleClick = () => {
    setCurrentSort(currentSort == 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className={classNames('group inline-flex items-center', className)}>
      {children}
      <div>
        <ChevronUpIcon
          className={classNames(
            '-mr-1 ml-1 flex-shrink-0 text-gray-400 hover:text-gray-700',
            arrowsSize == 'small' ? 'h-2 w-3' : 'h-4 w-5',
            {
              'text-gray-700': currentSort == 'asc',
            }
          )}
          aria-hidden="true"
          onClick={handleClick}
        />
        <ChevronDownIcon
          className={classNames(
            '-mr-1 ml-1 flex-shrink-0 text-gray-400 hover:text-gray-700',
            arrowsSize == 'small' ? 'h-2 w-3' : 'h-4 w-5',
            {
              'text-gray-700': currentSort == 'desc',
            }
          )}
          aria-hidden="true"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SortBy;
