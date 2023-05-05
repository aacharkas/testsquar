import {PlusIcon} from '@heroicons/react/24/outline';
import {useTranslation} from 'next-i18next';
import React, {Dispatch, useState} from 'react';

import Button from '../../../../libs/web/components/Button/Button';
import MobileSearch from '../../../../libs/web/components/MobileSearch/MobileSearch';
import Search from '../../../../libs/web/components/Search/Search';
import SortBy from '../../../../libs/web/components/SortBy/SortBy';
import Typography from '../../../../libs/web/components/Typography/Typography';
import {ETextColor, ETextVariant} from '../../../../libs/web/constants/enums';
import {PERMISSIONS, PERMISSION_ACTIONS} from '../../constants/permissions';
import {ROUTES} from '../../constants/routes';
import {Can} from '../../lib/ability';
import Link from '../Link';
import {TFilters} from './InsuranceCarriers.types';

interface IProps {
  filters: TFilters;
  setSearch: (string) => void;
  setFilters: Dispatch<TFilters>;
  search: string;
}

const InsuranceCarriersTableSearch = ({
  filters,
  setSearch,
  setFilters,
  search,
}: IProps) => {
  const {t} = useTranslation('insurance_carriers');
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  return (
    <div className="border-b border-gray-200 bg-white p-6 md:px-6 sm:px-4 sm:py-5">
      <div
        className="-mt-1 flex flex-wrap items-center justify-between md:flex-col-reverse sm:flex-col-reverse md:items-start sm:items-start">
        <div
          className="md:ml-0 sm:ml-0 flex items-center gap-3 md:justify-between sm:justify-between md:w-full sm:w-full">
          <Search
            placeholder={t('search_by_insurance_carrier_name')}
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
        </div>
        <div className="flex flex-wrap-reverse justify-between md:w-full sm:w-full md:mb-4 sm:mb-4 sm:items-center">
          <SortBy
            className="xl:hidden lg:hidden sm:max-w-[155px]"
            currentSort={filters.sortOrder}
            setCurrentSort={(value) =>
              setFilters({...filters, sortOrder: value})
            }
          >
            <Typography variant={ETextVariant.base} color={ETextColor.gray}>
              {t('sort_by_name')}
            </Typography>
          </SortBy>
          <Can I={PERMISSION_ACTIONS.CREATE} a={PERMISSIONS.INSURANCE_CARRIERS}>
            <Link
              type="tab"
              href={`/${ROUTES.INSURANCE_CARRIER}?id=new`}
              className="ml-4 mt-2 md:mt-0 sm:mt-0 sm:ml-0 xs:mb-2"
            >
              <Button size="small">
                <PlusIcon className="h-6 w-6 mr-2"/>
                <Typography variant={ETextVariant.base} medium>
                  {t('new_insurance_carriers')}
                </Typography>
              </Button>
            </Link>
          </Can>
        </div>
      </div>
    </div>
  );
};

export default InsuranceCarriersTableSearch;
