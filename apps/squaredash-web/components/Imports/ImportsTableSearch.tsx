import {FunnelIcon} from '@heroicons/react/24/outline';
import {BanknotesIcon} from '@heroicons/react/24/solid';
import {useTranslation} from 'next-i18next';
import React, {Dispatch, useState} from 'react';
import classNames from 'classnames';

import InputRange from '../../../../libs/web/components/Input/InputRange';
import Button from '../../../../libs/web/components/Button/Button';
import MobileSearch from '../../../../libs/web/components/MobileSearch/MobileSearch';
import Search from '../../../../libs/web/components/Search/Search';
import SortBy from '../../../../libs/web/components/SortBy/SortBy';
import Typography from '../../../../libs/web/components/Typography/Typography';
import {ETextColor, ETextVariant} from '../../../../libs/web/constants/enums';
import {TImport, TFilters} from './Imports.types';
import {ALL_CUSTOMERS, ALL_INSURANCE_CARRIERS, CUSTOMERS, DEFAULT_IMPORTS_FILTERS, INSURANCE_CARRIERS, MIN_DATE_FROM} from './Imports.constants';
import {handleMultiSelectChanges} from '../../../../libs/web/components/Select/MultiSelect';
import SideBar from '../../../../libs/web/components/SideBar/SideBar';
import RangeDatePicker from '../../../../libs/web/components/DatePicker/RangeDatePicker';
import ImportsFiltersBar from './ImportsFiltersBar';
import {useImportsFiltersBarData} from './hooks/useImportsFiltersBarData';
import MultiSelectFilterBar from './MultiSelectFilterBar';
import ImportButton from '../../../../libs/web/components/ImportButton/ImportButton';
import {PERMISSIONS, PERMISSION_ACTIONS} from '../../constants/permissions';
import {Can} from '../../lib/ability';
import {AsyncMultiSelect} from '../../../../libs/web/components/Select/AsyncMultiSelect';
import {GET_CUSTOMERS} from '../Customers/Customers.api';
import {GET_INSURANCE_CARRIES} from '../InsuranceCarriers/InsureanceCarriers.api';

interface IProps {
  search: string;
  filters: TFilters;
  setSearch: (string) => void;
  setFilters: Dispatch<TFilters>;
  data: TImport[];
  handleFile: (string) => void;
  supportedTypes: string[];
}

const ImportsTableSearch = ({
  search,
  filters,
  setSearch,
  setFilters,
  data,
  handleFile,
  supportedTypes,
}: IProps) => {
  const {t} = useTranslation('imports');
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [openLgFilters, setOpenLgFilters] = useState<boolean>(false);
  const {localState, localActions, handlers} = useImportsFiltersBarData({
    filters,
    setFilters,
  });

  return (
    <>
      <SideBar open={openFilters} setOpen={setOpenFilters}>
        {!localState.openMultiSelectBar && <ImportsFiltersBar
          localState={localState}
          localActions={localActions}
          handlers={handlers}
        />}
        {localState.openMultiSelectBar && <MultiSelectFilterBar
          localState={localState}
          localActions={localActions}
          handlers={handlers}
        />}
      </SideBar>
      <div className="border-b border-gray-200 bg-white p-6 md:px-6 sm:px-4 sm:py-5">
        <div
          className="-mt-1 flex flex-wrap items-center justify-between md:flex-col-reverse sm:flex-col-reverse md:items-start sm:items-start">
          <div
            className="md:ml-0 sm:ml-0 flex items-center gap-3 md:justify-between sm:justify-between md:w-full sm:w-full">
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
            />
            <Button
              theme="light"
              className="mr-3 sm:hidden"
              onClick={() => {
                setFilters(DEFAULT_IMPORTS_FILTERS);
                setOpenFilters(!openFilters);
                setOpenLgFilters(!openLgFilters);
              }}
            >
              <FunnelIcon className="h-5 w-5 mr-2"/>
              <Typography
                variant={ETextVariant.base}
                color={ETextColor.gray}
                medium
              >
                {t('filter')}
              </Typography>
            </Button>
            <Button
              icon
              className="xl:hidden lg:hidden md:hidden mr-3"
              onClick={() => {
                setOpenFilters(true);
              }}
            >
              <FunnelIcon className="h-5 w-5"/>
            </Button>
          </div>
          <div
            className="flex justify-end sm:justify-start md:w-full md:mb-4 sm:mb-4 sm:flex-wrap-reverse sm:gap-4 sm:w-full">
            <Can I={PERMISSION_ACTIONS.IMPORT} a={PERMISSIONS.IMPORTS}>
              <ImportButton
                buttonTitle={t('import_new_scope')}
                handleFile={handleFile}
                supportedTypes={supportedTypes}
              />
            </Can>
          </div>
        </div>
        <div
          className={classNames(
            'mt-5 flex flex-wrap items-center items-start gap-4 sm:hidden md:hidden',
            {
              hidden: !openLgFilters,
            }
          )}
        >
          <div className="flex gap-4 md:hidden sm:hidden w-3/4">
            <div className="w-1/2">
              <AsyncMultiSelect
                variableName="search"
                responsePathToArray="customers"
                queryStructure={GET_CUSTOMERS}
                initialLoad
                isDisabled={false}
                value={
                  filters.customers
                }
                onChange={(value) =>
                  setFilters({
                    ...filters,
                    customers: handleMultiSelectChanges(
                      filters.customers,
                      value,
                      [CUSTOMERS[0], ...data]
                    ),
                  })
                }
                defaultValueNeeded={t(ALL_CUSTOMERS)}
                responseNameName={'displayName'}
              />
            </div>
            <div className="w-1/2">
              <AsyncMultiSelect
                variableName="search"
                responsePathToArray="insuranceCarriers"
                queryStructure={GET_INSURANCE_CARRIES}
                initialLoad
                isDisabled={false}
                value={
                  filters.insuranceCarriers
                }
                onChange={(value) =>
                  setFilters({
                    ...filters,
                    insuranceCarriers: handleMultiSelectChanges(
                      filters.insuranceCarriers,
                      value,
                      [INSURANCE_CARRIERS[0], ...data]
                    ),
                  })
                }
                defaultValueNeeded={t(ALL_INSURANCE_CARRIERS)}
                responseNameName={'name'}
              />
            </div>
          </div>
          <div className="flex gap-4 md:hidden sm:hidden w-4/5">
            <RangeDatePicker
              value={filters.dates}
              onChangeDate={(value) => setFilters({...filters, dates: value})}
              minDate={new Date(MIN_DATE_FROM)}
              maxDate={new Date()}
            />
            <InputRange
              icon={
                <BanknotesIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              }
              placeholder={{
                from: t('rcv_from'),
                to: t('rcv_to'),
              }}
              value={filters.RCV}
              onChangeText={(value) => setFilters({
                ...filters,
                RCV: value,
              })}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportsTableSearch;
