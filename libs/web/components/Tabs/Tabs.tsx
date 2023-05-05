import classNames from 'classnames';

import Spinner from '../Spinner/Spinner';
import styles from './Tabs.module.css';
import {Tab} from './Tabs.type';

interface IProps {
  small?: boolean;
  disableSmall?: boolean;
  loading?: boolean;
  currentTab: string;
  changeTab: (id: string) => void;
  tabs: Tab[];
  isPadding?: boolean;
}

export const Tabs = ({
                       small,
                       disableSmall,
                       currentTab,
                       changeTab,
                       tabs,
                       loading,
                       isPadding = false
                     }: IProps) => {
  return (
    <div className="relative">
      {loading && <Spinner contentSize/>}
      <div
        className={classNames({
          'sm:hidden': small,
          hidden: disableSmall,
        })}
      >
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
      </div>
      <div
        className={classNames({
          'hidden sm:block': small,
        })}
      >
        <div className="border-b border-gray-200 sm:pl-4 sx:pl-4">
          <nav className={classNames("-mb-px flex space-x-8", {'pl-14 sm:pl-0': isPadding})} aria-label="Tabs">
            {tabs.map((tab) => (
              <div
                key={tab?.name}
                onClick={() => changeTab(tab?.id)}
                className={classNames(
                  {
                    [styles['active']]: tab?.id === currentTab,
                    'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700':
                      !(tab?.id === currentTab),
                  },
                  'cursor-pointer whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                )}
              >
                {tab?.name}
              </div>
            ))}
          </nav>
        </div>
      </div>
      {tabs.find((item) => item?.id === currentTab)?.children}
    </div>
  );
};
