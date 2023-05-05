import { FunnelIcon, PlusIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React, { Dispatch, useState } from 'react';

import Button from '../../../../libs/web/components/Button/Button';
import MobileSearch from '../../../../libs/web/components/MobileSearch/MobileSearch';
import Search from '../../../../libs/web/components/Search/Search';
import MultiSelect from '../../../../libs/web/components/Select/MultiSelect';
import SideBar from '../../../../libs/web/components/SideBar/SideBar';
import SortBy from '../../../../libs/web/components/SortBy/SortBy';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { PERMISSIONS, PERMISSION_ACTIONS } from '../../constants/permissions';
import { ROUTES } from '../../constants/routes';
import { Can } from '../../lib/ability';
import Link from '../Link';
import { TMemberForm } from './Member/MemberForm.types';
import { ROLES, STATUSES } from './Members.constants';
import { TFilters } from './Members.types';
import MembersFilterBar from './MembersFiltersBar';
import MembersSearchData from './MembersSearchData';
import { useMembersFilterBarData } from './hooks/useMembersFiltersBarData';

interface IProps {
  search: string;
  filters: TFilters;
  setSearch: (string) => void;
  setFilters: Dispatch<TFilters>;
  data: TMemberForm[];
}

const MembersTableSearch = ({
  search,
  filters,
  setSearch,
  setFilters,
  data,
}: IProps) => {
  const { t } = useTranslation('members');
  const {
    openFilters,
    filtersIndicator,
    selectedRoles,
    selectedStatuses,
    handleMultiSelectChanges,
    setOpenFilters,
    handleRoleFilters,
    handleStatusFilters,
    applyFilters,
    clearFilters,
  } = useMembersFilterBarData({
    rolesOptions: ROLES,
    statusesOptions: STATUSES,
    filters,
    setFilters,
  });

  const [openSearch, setOpenSearch] = useState<boolean>(false);

  return (
    <>
      <SideBar open={openFilters} setOpen={setOpenFilters}>
        <MembersFilterBar
          rolesOptions={ROLES}
          statusesOptions={STATUSES}
          selectedRoles={selectedRoles}
          selectedStatuses={selectedStatuses}
          handleRoleFilters={handleRoleFilters}
          handleStatusFilters={handleStatusFilters}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
        />
      </SideBar>
      <div className="border-b border-gray-200 bg-white p-6 md:px-6 sm:px-4 sm:py-5">
        <div className="-ml-3 -mt-1 flex flex-wrap items-center justify-between md:flex-col-reverse sm:flex-col-reverse md:items-start sm:items-start">
          <div className="ml-3 flex items-center gap-3 md:justify-between sm:justify-between md:w-full sm:w-full">
            <Search
              placeholder={t('search')}
              className="w-96 md:w-full sm:w-full"
              value={search}
              onChangeText={setSearch}
              onClick={() => setOpenSearch(true)}
            />
            <MobileSearch
              placeholder={t('search')}
              active={openSearch}
              value={search}
              onChangeText={setSearch}
              setActive={setOpenSearch}
            >
              <MembersSearchData data={data} />
            </MobileSearch>
            <div className="w-44 md:hidden sm:hidden">
              <MultiSelect
                options={ROLES}
                values={filters.resRoles}
                setValues={(value) =>
                  setFilters({
                    ...filters,
                    resRoles: handleMultiSelectChanges(
                      filters.resRoles,
                      value,
                      ROLES
                    ),
                  })
                }
              />
            </div>
            <div className="w-44 md:hidden sm:hidden">
              <MultiSelect
                options={STATUSES}
                values={filters.resTechStatuses}
                setValues={(value) =>
                  setFilters({
                    ...filters,
                    resTechStatuses: handleMultiSelectChanges(
                      filters.resTechStatuses,
                      value,
                      STATUSES
                    ),
                  })
                }
              />
            </div>
            <Button
              theme="light"
              className="relative xl:hidden lg:hidden sm:hidden mr-3"
              onClick={() => { 
                setOpenFilters(true);
              }}
            >
              <FunnelIcon className="h-5 w-5 mr-2 text-gray-500" />
              <Typography
                variant={ETextVariant.base}
                color={ETextColor.gray}
                medium
              >
                {t('filter')}
              </Typography>
              <div
                className={classNames(
                  { hidden: !filtersIndicator },
                  'absolute -right-1 -top-1 rounded-full bg-indigo-700 w-2 h-2'
                )}
              />
            </Button>
            <Button
              icon
              className="relative xl:hidden lg:hidden md:hidden mr-3"
              onClick={() => { 
                setOpenFilters(true);}
              }
            >
              <FunnelIcon className="h-5 w-5 text-gray-500" />
              <div
                className={classNames(
                  { hidden: !filtersIndicator },
                  'absolute right-1.5 top-1.5 rounded-full bg-indigo-700 w-2 h-2'
                )}
              />
            </Button>
          </div>
          <div className="flex justify-between md:w-full sm:w-full md:mb-4 sm:mb-4">
            <SortBy
              className="ml-3 xl:hidden lg:hidden"
              currentSort={filters.sortOrder}
              setCurrentSort={(value) =>
                setFilters({ ...filters, sortOrder: value })
              }
            >
              <Typography variant={ETextVariant.base} color={ETextColor.gray}>
                {t('sort_by_name')}
              </Typography>
            </SortBy>
            <Can I={PERMISSION_ACTIONS.INVITE} a={PERMISSIONS.COMPANY_USER}>
              <Link
                type="tab"
                href={`/${ROUTES.MEMBER}?id=new`}
                className="ml-4 mt-2 sm:mt-0"
              >
                <Button size="small">
                  <PlusIcon className="h-6 w-6 mr-2" />
                  <Typography variant={ETextVariant.base} medium>
                    {t('add_member')}
                  </Typography>
                </Button>
              </Link>
            </Can>
          </div>
        </div>
      </div>
    </>
  );
};

export default MembersTableSearch;
