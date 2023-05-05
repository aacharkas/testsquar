import {SubjectType} from '@casl/ability';
import {ChevronDownIcon, Cog8ToothIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React from 'react';
import {useState} from 'react';

import {PERMISSION_ACTIONS} from '../../../../apps/squaredash-web/constants/permissions';
import {Can} from '../../../../apps/squaredash-web/lib/ability';
import {ETextVariant} from '../../constants/enums';
import {Options} from '../MenuItem/MenuItem.types';
import Typography from '../Typography/Typography';
import MenuDropdownItem from './MenuDropdownItem';

interface IProps {
  item: Options;
  isOpen?: boolean;
}

export function MenuDropdown({item, isOpen}: IProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(isOpen);

  return (
    <>
      <button
        className={classNames(
          'flex w-full p-2 items-center justify-between text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        )}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="flex items-center">
          <Cog8ToothIcon
            className={classNames('mr-3 flex-shrink-0 h-6 w-6')}
            aria-hidden="true"
          />
          <Typography variant={ETextVariant.sm}>{item.name}</Typography>
        </div>
        <ChevronDownIcon
          className={classNames(
            'text-gray-400 group-hover:text-gray-500',
            'flex-shrink-0 h-6 w-6'
          )}
          aria-hidden="true"
        />
      </button>
      <div
        className={classNames({
          visible: isMenuOpen,
          invisible: !isMenuOpen,
        })}
      >
        {item.options.map((option) => {
          if (option?.hide) return null;
          return (
            <Can I={PERMISSION_ACTIONS.GET} a={option?.type as SubjectType} key={option.id}>
              <MenuDropdownItem key={option.id} item={option}/>
            </Can>
          );
        })}
      </div>
    </>
  );
}

export default MenuDropdown;
