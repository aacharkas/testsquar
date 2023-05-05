import classNames from 'classnames';
import React from 'react';

import { PERMISSION_ACTIONS } from '../../../../apps/squaredash-web/constants/permissions';
import { Can } from '../../../../apps/squaredash-web/lib/ability';
import MenuDropdown from '../MenuDropdown/MenuDropdown';
import MenuItem from '../MenuItem/MenuItem';
import { Options } from '../MenuItem/MenuItem.types';
import styles from './SideMenu.module.css';

export enum LAYOUT_ELEMENT_TYPE {
  DIVIDER,
}

interface IProps {
  options: Options[];
  isCompanySettings?: boolean;
}

export function SideMenu({ options, isCompanySettings }: IProps) {
  return (
    <aside className="p-2 min-h-screen xl:w-64 lg:w-64 sticky top-0 z-10">
      <div
        className={classNames(
          'bg-contain bg-no-repeat m-3 h-7 w-44',
          styles['logo']
        )}
      />
      <div className="flex flex-grow flex-col overflow-y-auto bg-white py-4">
        <div className="flex flex-grow flex-col">
          <nav className="flex-1 space-y-2 bg-white" aria-label="Sidebar">
            {options.map((item) => {
              if (item?.hide) return null;
              if (item?.type === LAYOUT_ELEMENT_TYPE.DIVIDER) {
                return <div key={item.id} className='border-t border-gray-300 mv-2'/>
              }
              return (
                <Can I={PERMISSION_ACTIONS.GET} a={item?.type} key={item.id}>
                  {item?.options?.length ? (
                    <MenuDropdown item={item} isOpen={isCompanySettings} />
                  ) : (
                    <MenuItem item={item} />
                  )}
                </Can>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}

export default SideMenu;
