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
import { useAbility } from '../../lib/ability';
import { ITEMS_PER_PAGE } from './InsuranceCarriers.constants';
import InsuranceCarriersDetails from './InsuranceCarriersDetails';
import InsuranceCarriersTableItem from './InsuranceCarriersTableItem';
import InsuranceCarriersTableSearch from './InsuranceCarriersTableSearch';
import { useInsuranceCarriers } from './hooks/useInsuranceCarriers';

const InsuranceCarriers = () => {
  const { localState, localActions, formattedData, handlers, localErrorText } =
    useInsuranceCarriers();
  const ability = useAbility();
  const { t } = useTranslation('insurance_carriers');
  const items = [
    t('insurance_carriers_name'),
    t('claims_email'),
    t('phone_number'),
  ];
  return (
    <>
      <div className="flex gap-2.5 mb-4">
        <Typography variant={ETextVariant.xl} medium className="sm:pl-4">
          {t('insurance_carriers')}
        </Typography>
        <Typography variant={ETextVariant.xl} medium color={ETextColor.gray}>
          {formattedData.insuranceCarriersData?.length &&
            `(${formattedData.insuranceCarriersCount})`}
        </Typography>
      </div>
      <div className="shadow rounded-md relative">
        {formattedData.loading && <Spinner contentSize />}
        <InsuranceCarriersTableSearch
          filters={localState.filters}
          search={localState.search}
          setSearch={localActions.setSearch}
          setFilters={localActions.setFilters}
        />
        <TableHeader
          items={items}
          columnsSize={3}
          sortItem={t('insurance_carriers_name')}
          sortOrder={localState.filters.sortOrder}
          setSortOrder={(value) =>
            localActions.setFilters({ ...localState.filters, sortOrder: value })
          }
          className="md:hidden sm:hidden"
        />
        {formattedData.insuranceCarriersData?.length ? (
          <>
            <TableBody>
              {formattedData.insuranceCarriersData.map((item) => (
                <InsuranceCarriersTableItem
                  key={item.id}
                  item={item}
                  size={items.length}
                  onClickRow={handlers.handleOnInsuranceCarriersClick}
                  onClickView={handlers.handleActionOnTableItem}
                  ability={ability}
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
            {localErrorText('IM0025', 'insurance carriers')}
          </Typography>
        )}
      </div>
      <Modal
        show={!!localState.openWarningModal}
        closeModal={() => localActions.setOpenWarningModal(false)}
        secondButtonAction={handlers.handleRemoveInsuranceCarrier}
        firstButtonText={t('cancel')}
        secondButtonText={t('delete')}
      >
        <Typography variant={ETextVariant.lg} medium>
          {t('delete_insurance_carrier')}
        </Typography>
      </Modal>
      <SlideModal
        closeModal={() => localActions.setOpenModal(false)}
        isModalOpen={localState.openModal}
        dialogTitle={t('details')}
        loading={formattedData.loadingInsuranceCarrierDetails}
      >
        <InsuranceCarriersDetails
          item={formattedData.insuranceCarriersDetails}
        />
      </SlideModal>
    </>
  );
};

export default InsuranceCarriers;
