import { PlusIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import Button from '../../../../libs/web/components/Button/Button';
import MobileSearch from '../../../../libs/web/components/MobileSearch/MobileSearch';
// import SortBy from '../../../../libs/web/components/SortBy/SortBy';
import Search from '../../../../libs/web/components/Search/Search';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextVariant } from '../../../../libs/web/constants/enums';
import { PERMISSIONS, PERMISSION_ACTIONS } from '../../constants/permissions';
import { Can } from '../../lib/ability';

interface IProps {
  search: string;
  setSearch: (string) => void;
  onClick: () => void;
}

const UOMTableSearch = ({ search, setSearch, onClick }: IProps) => {
  const { t } = useTranslation('uom');
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  return (
    <>
      <div className="border-b border-gray-200 bg-white p-6 md:px-6 sm:px-4 sm:py-5">
        <div className="-mt-1 flex flex-wrap items-center justify-between md:flex-col-reverse sm:flex-col-reverse md:items-start sm:items-start">
          <div className="md:ml-0 sm:ml-0 flex items-center gap-3 md:justify-between sm:justify-between md:w-full sm:w-full">
            <Search
              placeholder={t('search_by_unit_name')}
              className="w-[348px] md:w-full sm:w-full"
              value={search}
              onChangeText={setSearch}
              onClick={() => setOpenSearch(true)}
            />
            <MobileSearch
              placeholder={t('search_by_unit_name')}
              active={openSearch}
              value={search}
              onChangeText={setSearch}
              setActive={setOpenSearch}
            />
          </div>
          <div className="flex justify-between md:w-full sm:w-full md:mb-4 sm:mb-4 sm:items-center">
            {/* <SortBy className="xl:hidden lg:hidden sm:max-w-[155px]">
              <Typography variant={ETextVariant.base} color={ETextColor.gray}>
                {t('sort_by_name')}
              </Typography>
            </SortBy> */}
            <Can
              I={PERMISSION_ACTIONS.CREATE}
              a={PERMISSIONS.MEASUREMENT_UNITS}
            >
              <Button size="small" onClick={onClick}>
                <PlusIcon className="h-6 w-6 mr-2" />
                <Typography variant={ETextVariant.base} medium>
                  {t('add_unit')}
                </Typography>
              </Button>
            </Can>
          </div>
        </div>
      </div>
    </>
  );
};

export default UOMTableSearch;
