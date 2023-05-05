import { useTranslation } from 'next-i18next';
import React from 'react';

import Pagination from '../../../../libs/web/components/Pagination/Pagination';
import Spinner from '../../../../libs/web/components/Spinner/Spinner';
import TableBody from '../../../../libs/web/components/Table/TableBody';
import TableHeader from '../../../../libs/web/components/Table/TableHeader';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { ITEMS_PER_PAGE } from './Companies.constants';
import CompaniesTableItem from './CompaniesTableItem';
import CompaniesTableSearch from './CompaniesTableSearch';
import { useCompaniesData } from './hooks/useCompaniesData';

const CompaniesTable = () => {
  const { localState, localActions, formattedData, handlers, localErrorText } =
    useCompaniesData();
  const { t } = useTranslation('companies');
  const items = [t('company_name'), t('owners'), t('status')];

  return (
    <>
      <div className="flex gap-2.5 mb-4">
        <Typography variant={ETextVariant.xl} medium className="sm:pl-4">
          {t('companies')}
        </Typography>
        <Typography variant={ETextVariant.xl} medium color={ETextColor.gray}>
          ({formattedData.companiesCount})
        </Typography>
      </div>
      <div className="shadow rounded-md relative">
        {formattedData.loading && <Spinner contentSize />}
        <CompaniesTableSearch
          search={localState.search}
          filters={localState.filters}
          setSearch={localActions.setSearch}
          setFilters={localActions.setFilters}
          data={formattedData.companiesData}
        />
        <TableHeader
          items={items}
          columnsSize={3}
          sortItem={t('company_name')}
          sortOrder={localState.filters.sortOrder}
          setSortOrder={(value) =>
            localActions.setFilters({ ...localState.filters, sortOrder: value })
          }
          className="md:hidden sm:hidden"
          isFirstItemBig
        />
        {formattedData.companiesData?.length ? (
          <>
            <TableBody>
              {formattedData.companiesData.map((item) => (
                <CompaniesTableItem
                  key={item.id}
                  item={item}
                  size={items.length}
                  onClickRow={handlers.handleOnCompanyClick}
                  onClickView={handlers.handleActionOnTableItem}
                />
              ))}
            </TableBody>
            <Pagination
              itemsPerPage={ITEMS_PER_PAGE}
              totalPages={formattedData.totalPages}
              setData={(value) =>
                localActions.setFilters({ ...localState.filters, skip: value })
              }
              currentPage={localState.currentPage}
              setCurrentPage={localActions.setCurrentPage}
            />
          </>
        ) : (
          <Typography
            variant={ETextVariant.base}
            color={ETextColor.gray}
            medium
            className="flex justify-center py-5 h-full"
          >
            {localErrorText('IM0025', 'companies')}
          </Typography>
        )}
      </div>
    </>
  );
};

export default CompaniesTable;
