import {Bars3Icon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React, {useState} from 'react';

import SideBar from '../../../../libs/web/components/SideBar/SideBar';
import SideMenu from '../../../../libs/web/components/SideMenu/SideMenu';
import {useCheckActiveRoute} from '../../../../libs/web/hooks/useCheckActiveRoute';
import {ROUTES} from '../../constants/routes';
import Header from './Header/Header';
import {APPLICATION_MENU} from './Layout.constants';
import styles from './index.module.css';

interface IProps {
  children: React.ReactNode | null;
}

const Layout = ({children}: IProps) => {
  const [showSideMenu, setShowSideMenu] = useState<boolean>(false);
  const isCompanySettings = useCheckActiveRoute({path: ROUTES.COMPANY});

  return (
    <div className="flex min-w-screen min-h-screen">
      <SideBar open={showSideMenu} setOpen={setShowSideMenu}>
        <SideMenu
          options={APPLICATION_MENU}
          isCompanySettings={isCompanySettings}
        />
      </SideBar>
      <div className="md:hidden sm:hidden border-r border-gray-200">
        <SideMenu
          options={APPLICATION_MENU}
          isCompanySettings={isCompanySettings}
        />
      </div>
      <div className="flex flex-col flex-1">
        <div
          className="flex justify-end md:justify-between sm:justify-between sticky top-0 bg-white z-10 border-b border-gray-200">
          <div
            className="hidden px-4 border-r border-gray-200 items-center md:flex sm:flex"
            onClick={() => setShowSideMenu(!showSideMenu)}
          >
            <Bars3Icon className="text-gray-500 group-hover:text-gray-600 flex-shrink-0 h-6 w-6"/>
          </div>
          <Header/>
        </div>
        <div
          className={classNames(
            'p-4 flex-1 sm:px-0',
            styles['company-background']
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
