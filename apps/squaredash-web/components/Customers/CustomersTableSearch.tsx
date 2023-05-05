import { FunnelIcon, PlusIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React, { Dispatch, useState } from 'react';

import Button from '../../../../libs/web/components/Button/Button';
import MobileSearch from '../../../../libs/web/components/MobileSearch/MobileSearch';
import Search from '../../../../libs/web/components/Search/Search';
import { handleMultiSelectChanges } from '../../../../libs/web/components/Select/MultiSelect';
import SideBar from '../../../../libs/web/components/SideBar/SideBar';
import SortBy from '../../../../libs/web/components/SortBy/SortBy';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { PERMISSIONS, PERMISSION_ACTIONS } from '../../constants/permissions';
import { ROUTES } from '../../constants/routes';
import { Can } from '../../lib/ability';
import Link from '../Link';
import { DEFAULT_CUSTOMERS_FILTERS, TYPES } from './Customers.constants';
import { TFilters, TFormattedData } from './Customers.types';
import CustomersFiltersBar from './CustomersFiltersBar';
import CustomersSearchData from './CustomersSearchData';
import { useCustomersFiltersBarData } from './hooks/useCustomersFiltersBarData';
import {CUSTOMERS, RESP_MEMBERS, CUSTOMERS_LABELS, RESP_MEMBERS_LABELS} from './Customers.constants';
import CustomerFilterPage from './CustomersFilterPage';
import { AsyncMultiSelect } from '../../../../libs/web/components/Select/AsyncMultiSelect';
import { GET_CUSTOMERS } from './Customers.api';
import { GET_MEMBERS } from '../Members/Members.api';
import Select from '../../../../libs/web/components/Select/Select';
import { ROLES } from '../../constants/roles';
import { USER_STATUSES } from '../../constants/userStatuses';

interface IProps {
  search: string;
  filters: TFilters;
  setSearch: (string) => void;
  setFilters: Dispatch<TFilters>;
  formattedData:TFormattedData
}

const CustomersTableSearch = ({
  search,
  filters,
  setSearch,
  setFilters,
  formattedData,
}: IProps) => {
  const { t } = useTranslation('customers');
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  // TODO check why SideBar switch openFilters to false on lg screen
  const [openLgFilters, setOpenLgFilters] = useState<boolean>(false);
  const { localState, localActions, handlers } = useCustomersFiltersBarData({
    filters,
    setFilters,
  });

  return (
    <>
      <SideBar open={openFilters} setOpen={setOpenFilters}>
        {
          !localState.openCustomersFilterPage &&
          <CustomersFiltersBar
            localActions={localActions}
            handlers={handlers}
            checked={localActions.selectedTypes}
          />
        }
        {
          localState.openCustomersFilterPage &&
          <CustomerFilterPage
            localActions={localActions}
            localState={localState}
            handlers={handlers}
            formattedData={formattedData}
          />
        }
      </SideBar>
      <div className="border-b border-gray-200 bg-white p-6 md:px-6 sm:px-4 sm:py-5">
        <div className="-mt-1 flex flex-wrap items-center justify-between md:flex-col-reverse sm:flex-col-reverse md:items-start sm:items-start">
          <div className="md:ml-0 sm:ml-0 flex items-center gap-3 md:justify-between sm:justify-between md:w-full sm:w-full">
            <Search
              placeholder={t('search')}
              className="w-[494px] md:w-full sm:w-full"
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
              <CustomersSearchData data={formattedData.customersData} />
            </MobileSearch>
            <Button
              theme="light"
              className="mr-3"
              onClick={() => {
                setFilters(DEFAULT_CUSTOMERS_FILTERS);
                setOpenFilters(!openFilters);
                setOpenLgFilters(!openLgFilters);
              }}
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              <Typography
                className="sm:hidden"
                variant={ETextVariant.base}
                color={ETextColor.gray}
                medium
              >
                {t('filter')}
              </Typography>
            </Button>
            <Button
              icon
              className="xl:hidden lg:hidden md:hidden mr-3 hidden"
              onClick={() => {
                setOpenFilters(true);
              }}
            >
              <FunnelIcon className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex justify-between md:w-full sm:w-full md:mb-4 sm:mb-4 sm:items-center">
            <SortBy
              className="xl:hidden lg:hidden sm:max-w-[155px]"
              currentSort={filters.sortOrder}
              setCurrentSort={(value) =>
                setFilters({ ...filters, sortOrder: value })
              }
            >
              <Typography variant={ETextVariant.base} color={ETextColor.gray}>
                {t('sort_by_name')}
              </Typography>
            </SortBy>
            <Can I={PERMISSION_ACTIONS.CREATE} a={PERMISSIONS.CUSTOMER}>
              <Link
                type="tab"
                href={`/${ROUTES.CUSTOMER}?id=new`}
                className="ml-4 mt-2 md:mt-0 sm:mt-0"
              >
                <Button size="small">
                  <PlusIcon className="h-6 w-6 mr-2" />
                  <Typography variant={ETextVariant.base} medium>
                    {t('add_customer')}
                  </Typography>
                </Button>
              </Link>
            </Can>
          </div>
        </div>
        <div
          className={classNames(
            'mt-5 flex flex-wrap items-center items-start gap-x-4 gap-y-0 sm:hidden md:hidden',
            {
              hidden: !openLgFilters,
            }
          )}
        >
          <div className="w-64 md:hidden sm:hidden w-1/4">
            <Select
              options={TYPES}
              value={filters.resTypes}
              nameValueToReturn={'type'}
              onChangeValue={(value) =>{
                setFilters({
                  ...filters,
                  resTypes: value
                });
              }
              }
            />
          </div>
          <div className="w-80 md:hidden sm:hidden">
            <AsyncMultiSelect
              className="mb-2"
              variableName="search"
              responsePathToArray="customers"
              queryStructure={GET_CUSTOMERS}
              initialLoad
              isDisabled={false}
              value={
                filters.parents
              }
              onChange={(value) =>
                setFilters({
                  ...filters,
                  parents: handleMultiSelectChanges(
                    filters.parents,
                    value,
                    [CUSTOMERS[0],...formattedData.customersData]
                  ),
                })
              }
              defaultValueNeeded={CUSTOMERS_LABELS.ALL_PARENTS_CUSTOMERS}
              responseNameName={'displayName'}
            />
          </div>
          <Can I={PERMISSION_ACTIONS.GET} a={PERMISSIONS.USER_LIST}>
            <div className="w-80 md:hidden sm:hidden">
              <AsyncMultiSelect
                className="mb-2"
                variableName="search"
                responsePathToArray="members"
                queryStructure={GET_MEMBERS}
                initialLoad
                isDisabled={false}
                value={
                  filters.responsibleMembers
                }
                onChange={(value) =>
                  setFilters({
                    ...filters,
                    responsibleMembers: handleMultiSelectChanges(
                      filters.responsibleMembers,
                      value,
                      [RESP_MEMBERS[0],...formattedData.customersData]
                    ),
                  })
                }
                defaultValueNeeded={RESP_MEMBERS_LABELS.ALL_MEMBERS}
                responseNameName={'name'}
                requestOptions={{
                  roles: ROLES.COMPANY_USER,
                  status: USER_STATUSES.ACTIVE,
                }}
              />
            </div>
          </Can>
        </div>
      </div>
    </>
  );
};

export default CustomersTableSearch;
