import { PlusIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import React, { Dispatch, useState } from 'react';

import Button from '../../../../libs/web/components/Button/Button';
import MobileSearch from '../../../../libs/web/components/MobileSearch/MobileSearch';
import Search from '../../../../libs/web/components/Search/Search';
import SortBy from '../../../../libs/web/components/SortBy/SortBy';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { PERMISSIONS, PERMISSION_ACTIONS } from '../../constants/permissions';
import { ROUTES } from '../../constants/routes';
import { Can } from '../../lib/ability';
import Link from '../Link';
import { Admin, TFilters } from './Admins.types';
import AdminsSearchData from './AdminsSearchData';

interface IProps {
  search: string;
  filters: TFilters;
  setSearch: (string) => void;
  setFilters: Dispatch<TFilters>;
  data: Admin[];
}

const AdminsTableSearch = ({
  search,
  filters,
  setSearch,
  setFilters,
  data,
}: IProps) => {
  const { t } = useTranslation('admins');
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  return (
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
            <AdminsSearchData data={data} />
          </MobileSearch>
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
          <Can I={PERMISSION_ACTIONS.INVITE} a={PERMISSIONS.SUPER_ADMIN}>
            <Link
              type="tab"
              href={`/${ROUTES.ADMIN}?id=new`}
              className="ml-4 mt-2 sm:mt-0"
            >
              <Button size="small">
                <PlusIcon className="h-6 w-6 mr-2" />
                <Typography variant={ETextVariant.base} medium>
                  {t('add_admin')}
                </Typography>
              </Button>
            </Link>
          </Can>
        </div>
      </div>
    </div>
  );
};

export default AdminsTableSearch;
