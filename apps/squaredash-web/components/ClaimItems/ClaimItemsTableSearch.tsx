import {FunnelIcon, PlusIcon} from '@heroicons/react/24/outline';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../../apps/squaredash-web/constants/permissions';
import {Can} from '../../../../apps/squaredash-web/lib/ability';
import {useTranslation} from 'next-i18next';
import React, {Dispatch, useState} from 'react';

import Button from '../../../../libs/web/components/Button/Button';
import MobileSearch from '../../../../libs/web/components/MobileSearch/MobileSearch';
import Search from '../../../../libs/web/components/Search/Search';
import SortBy from '../../../../libs/web/components/SortBy/SortBy';
import Typography from '../../../../libs/web/components/Typography/Typography';
import {ETextVariant, ETextColor} from '../../../../libs/web/constants/enums';
import {TFilters} from './ClaimItems.types';
import SelectControlled, {IItem} from '../../../../libs/web/components/Select/SelectControlled';
import {SOURCES_FILTER} from './ClaimItems.contants';
import SideBar from '../../../../libs/web/components/SideBar/SideBar';
import {useClaimItemFilterBarData} from './hooks/useClaimItemFiltersBarData';
import ClaimItemsFiltersBar from './ClaimItemsFiltersBar';
import classNames from 'classnames';

interface IProps {
  search: string;
  setSearch: (string) => void;
  onClick: () => void;
  filters: TFilters;
  setFilters: Dispatch<TFilters>;
}

const ClaimItemsTableSearch = ({search, setSearch, onClick, filters, setFilters}: IProps) => {
  const {t} = useTranslation('claim_items');
  const {
    openFilters,
    filtersIndicator,
    selectedSource,
    setOpenFilters,
    handleSourceFilters,
    applyFilters,
    clearFilters,
  } = useClaimItemFilterBarData({
    filters,
    setFilters,
  });
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  return (
    <>
      <SideBar open={openFilters} setOpen={setOpenFilters}>
        <ClaimItemsFiltersBar
          sourcesOptions={SOURCES_FILTER}
          selectedSource={filters.source as IItem}
          handleSourceFilters={(value) =>
            setFilters({
              ...filters,
              source: value
            })
          }
          applyFilters={applyFilters}
          clearFilters={clearFilters}
        />
      </SideBar>
      <div className="border-b border-gray-200 p-6 md:px-6 sm:px-6 sm:py-5">
        <div
          className="-ml-3 -mt-1 flex flex-wrap items-center justify-between md:flex-col-reverse sm:flex-col-reverse md:items-start sm:items-start">
          <div
            className="lg:ml-3 xl:ml-3 flex items-center gap-3 md:justify-between sm:justify-between md:w-full sm:w-full">
            <Search
              placeholder={t('search_by_description')}
              className="w-96 md:w-full sm:w-full"
              value={search}
              onChangeText={setSearch}
              onClick={() => setOpenSearch(true)}
            />
            <MobileSearch
              placeholder={t('search_by_description')}
              active={openSearch}
              value={search}
              onChangeText={setSearch}
              setActive={setOpenSearch}
            />
            <div className="w-44 md:hidden sm:hidden">
              <SelectControlled
                options={SOURCES_FILTER}
                value={filters.source as IItem}
                onChangeValue={(value) =>
                  setFilters({
                    ...filters,
                    source: value
                  })
                }
              />
            </div>
            <Button
              icon
              className="relative xl:hidden lg:hidden mr-3"
              onClick={() => setOpenFilters(true)}
            >
              <FunnelIcon className="h-5 w-5 text-gray-500"/>
              <div
                className={classNames(
                  {hidden: !filtersIndicator},
                  'absolute right-1.5 top-1.5 rounded-full bg-indigo-700 w-2 h-2'
                )}
              />
            </Button>
          </div>
          <div className="flex justify-between md:w-full sm:w-full md:mb-4 sm:mb-4 sm:items-center">
            <SortBy
              className="xl:hidden lg:hidden sm:max-w-[155px]"
              currentSort={filters.sortOrder}
              setCurrentSort={(value) =>
                setFilters({...filters, sortOrder: value})
              }
            >
              <Typography variant={ETextVariant.base} color={ETextColor.gray}>
                {t('sort_by_description')}
              </Typography>
            </SortBy>
            <Can I={PERMISSION_ACTIONS.CREATE} a={PERMISSIONS.CLAIM_ITEMS}>
              <Button size="small" onClick={onClick}>
                <PlusIcon className="h-6 w-6 mr-2"/>
                <Typography variant={ETextVariant.base} medium>
                  {t('add_new_item')}
                </Typography>
              </Button>
            </Can>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClaimItemsTableSearch;
