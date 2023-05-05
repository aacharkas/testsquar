import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';

import Modal from '../../../../libs/web/components/Modal/Modal';
import Pagination from '../../../../libs/web/components/Pagination/Pagination';
import SlideModal from '../../../../libs/web/components/SlideModal/SlideModal';
import Spinner from '../../../../libs/web/components/Spinner/Spinner';
import TableBody from '../../../../libs/web/components/Table/TableBody';
import TableHeader from '../../../../libs/web/components/Table/TableHeader';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { ITEMS_PER_PAGE } from './Customers.constants';
import CustomersDetails from './CustomersDetails';
import CustomersTableItem from './CustomersTableItem';
import CustomersTableSearch from './CustomersTableSearch';
import { useCustomersData } from './hooks/useCustomersData';

const CustomersTable = () => {
  const { localState, localActions, formattedData, handlers, localErrorText } =
    useCustomersData();
  const { t } = useTranslation('customers');
  const items = [
    t('name'),
    t('contacts'),
    t('billing_address'),
    t('responsible_member'),
  ];

  return (
    <>
      <div className="flex gap-2.5 mb-4">
        <Typography variant={ETextVariant.xl} medium className="sm:pl-4">
          {t('customers')}
        </Typography>
        <Typography variant={ETextVariant.xl} medium color={ETextColor.gray}>
          {formattedData.customersData?.length &&
            `(${formattedData.customersCount})`}
        </Typography>
      </div>
      <div className="shadow rounded-md relative">
        {formattedData.loading && <Spinner contentSize />}
        <CustomersTableSearch
          search={localState.search}
          filters={localState.filters}
          setSearch={localActions.setSearch}
          setFilters={localActions.setFilters}
          formattedData={formattedData}
        />
        <TableHeader
          items={items}
          columnsSize={3}
          sortItem={t('name')}
          sortOrder={localState.filters.sortOrder}
          setSortOrder={(value) =>
            localActions.setFilters({ ...localState.filters, sortOrder: value })
          }
          className="md:hidden sm:hidden"
        />
        {formattedData.customersData?.length ? (
          <>
            <TableBody>
              {formattedData.customersData.map((item) => (
                <CustomersTableItem
                  key={item.id}
                  item={item}
                  size={3}
                  onClickRow={handlers.handleOnCustomersClick}
                  onClickView={handlers.handleActionOnTableItem}
                  notAbleToRemoveMember={formattedData?.notAbleToRemoveMember}
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
            className={classNames('flex justify-center py-5 h-full', { 'min-h-[16em]': formattedData.loading})}
          >
            {localErrorText('IM0025', 'customers')}
          </Typography>
        )}
      </div>
      <Modal
        show={!!localState.openWarningModal}
        closeModal={() => localActions.setOpenWarningModal(false)}
        secondButtonAction={handlers.handleRemoveCustomer}
        firstButtonText={t('cancel')}
        secondButtonText={t('delete')}
      >
        <Typography variant={ETextVariant.lg} medium>
          {t('delete_customer')}
        </Typography>
      </Modal>
      <SlideModal
        closeModal={() => localActions.setOpenModal(false)}
        isModalOpen={localState.openModal}
        dialogTitle={t('details')}
        loading={formattedData.loadingCustomerDetails}
      >
        <CustomersDetails item={formattedData?.customerDetails} notAbleToRemoveMember={formattedData?.notAbleToRemoveMember}/>
      </SlideModal>
    </>
  );
};

export default CustomersTable;
