import {
  Ability,
  AbilityTuple,
  MongoQuery,
  Subject,
} from '@casl/ability/dist/types';
import {AnyObject} from '@casl/ability/dist/types/types';
import {EllipsisVerticalIcon} from '@heroicons/react/20/solid';
import classNames from 'classnames';
import React from 'react';
import Link from '../../../../apps/squaredash-web/components/Link';

import {ETextColor, ETextVariant} from '../../constants/enums';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import DropdownItem from '../Dropdown/DropdownItem';
import Typography from '../Typography/Typography';
import {tableItemButtonHelper} from './TableItemButton.helper'

export type TItem = {
  href: string;
  title: string;
  permitAction?: string;
  permitUser?: string;
};

interface IProps {
  children: React.ReactNode;
  dropdownItems?: TItem[];
  buttonAction?: any,
  columnsSize: number;
  columnsSizeTablet?: number;
  onClick?: () => void;
  onClickItem?: (TItem, val) => void;
  itemToOpen?: any;
  ability?: Ability<AbilityTuple<string, Subject>, MongoQuery<AnyObject>>;
  className?: string;
}

const TableItem = ({
                     children,
                     dropdownItems,
                     buttonAction = null,
                     columnsSize,
                     columnsSizeTablet,
                     onClick,
                     onClickItem,
                     itemToOpen,
                     ability,
                     className,
                   }: IProps) => {
  const buttonProps = tableItemButtonHelper(buttonAction?.action);
  return (
    <li>
      <div className="flex items-center pl-4 py-4 relative md:items-start sm:items-start">
        <div className={classNames("flex flex-1 items-center pr-20 md:pr-5 sm:pr-5", {'cursor-pointer': !!onClick})}
             onClick={onClick}>
          <div
            className={classNames(
              'flex-1 grid sm:flex sm:flex-col sm:items-start [&>*]:px-2',
              {
                'xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-2':
                  columnsSize == 2,
                'xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-3':
                  columnsSize == 3,
                'xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-4':
                  columnsSize == 4,
                'xl:grid-cols-8 lg:grid-cols-8 md:grid-cols-4 sm:grid-cols-4':
                  columnsSize == 7,
                'md:grid-cols-2': columnsSizeTablet == 2,
                'md:grid-cols-3': columnsSizeTablet == 3,
                'md:grid-cols-4': columnsSizeTablet == 4,
              },
              'gap-4 sm:gap-1',
              className
            )}
          >
            {children}
          </div>
        </div>
        <div className="absolute right-10 lg:right-8 md:right-6 sm:right-4 sm:right-3">
          {(buttonAction ? (
                <div className="flex justify-center lg:min-w-[110px] xl:min-w-[110px]">
                  <Button size="small" theme={buttonProps.theme} className="w-full">
                    <Link href={buttonAction.href}>
                      <Typography variant={ETextVariant.xs} medium color={buttonProps.color}>
                        {buttonAction.label}
                      </Typography>
                    </Link>
                  </Button>
                </div>
              ) :
              (dropdownItems && <Dropdown
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
                        onClickItem && onClickItem(item, itemToOpen);
                      }}
                      visible={
                        item?.permitUser && item?.permitAction
                          ? ability?.can(item?.permitAction, item?.permitUser)
                          : true
                      }
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
              </Dropdown>)
          )}
        </div>
      </div>
    </li>
  );
};

export default TableItem;
