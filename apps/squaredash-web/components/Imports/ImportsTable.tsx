import {useTranslation} from 'next-i18next';
import React from 'react';

import Pagination from '../../../../libs/web/components/Pagination/Pagination';
import Spinner from '../../../../libs/web/components/Spinner/Spinner';
import TableBody from '../../../../libs/web/components/Table/TableBody';
import TableHeader from '../../../../libs/web/components/Table/TableHeader';
import Typography from '../../../../libs/web/components/Typography/Typography';
import {ETextColor, ETextVariant} from '../../../../libs/web/constants/enums';
import {useImportsData} from './hooks/useImportsData';
import {ITEMS_PER_PAGE} from './Imports.constants';
import ImportsTableItem from './ImportsTableItem';
import ImportsTableSearch from './ImportsTableSearch';
import {SUPPORTED_TYPES} from './Imports.constants';
import EmptyImportTableItem from './EmptyImportTableItem';
import Alert from '../../../../libs/web/components/Alert/Alert';
import classNames from 'classnames';

const ImportsTable = () => {
  const {localState, localActions, handlers, formattedData} = useImportsData();
  const {t} = useTranslation(['imports', 'system_errors']);
  const items = [
    t('date_of_loss'),
    t('claim_number'),
    t('customer'),
    t('insurance_carrier'),
    t('rcv'),
    t('deductible'),
    t('status')
  ];
  return (
    <>
      <div className="flex gap-2.5 mb-4">
        <Typography variant={ETextVariant.xl} medium className="sm:pl-4">
          {t('imports')}
        </Typography>
        <Typography variant={ETextVariant.xl} medium color={ETextColor.gray}>
          ({formattedData.importsCount})
        </Typography>
      </div>
      <div className="shadow rounded-md relative">
        {formattedData.loading && <Spinner contentSize/>}
        <ImportsTableSearch
          search={localState.search}
          filters={localState.filters}
          setSearch={localActions.setSearch}
          setFilters={localActions.setFilters}
          data={formattedData.importsData}
          handleFile={handlers.handleFile}
          supportedTypes={SUPPORTED_TYPES}
        />
        <TableHeader
          items={items}
          columnsSize={7}
          className="items-center md:hidden sm:hidden"
        />
        {formattedData.importsData?.length ? (
          <>
            <TableBody>
              {formattedData.progressLoading && <EmptyImportTableItem size={7} percent={formattedData.currentPercent}/>}
              {formattedData.importsData?.map((item) => (
                <ImportsTableItem
                  key={item.id}
                  item={item}
                  size={7}
                />
              ))}
            </TableBody>
            <Pagination
              itemsPerPage={ITEMS_PER_PAGE}
              totalPages={formattedData.totalPages}
              setData={(value) =>
                localActions.setFilters({...localState.filters, skip: value})
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
            className={classNames('flex justify-center py-5 h-full', { 'min-h-[16em]': formattedData.loading})}
          >
            {t('no_imports')}
          </Typography>
        )}
      </div>
      <Alert
        show={!!localState?.error}
        closeModal={() => localActions.setError('')}
        title={t('error')}
        message={
          localState?.error === 'common' ?
            t('common', {ns: 'system_errors'}) : t(localState?.error, {
              ns: 'system_errors',
              size: '10MB',
              types: SUPPORTED_TYPES
            })
        }
        buttonText={t('ok')}
      />
    </>
  );
};

export default ImportsTable;
