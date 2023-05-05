import {useTranslation} from 'next-i18next';
import React from 'react';

import Alert from '../../../../libs/web/components/Alert/Alert';
import Message from '../../../../libs/web/components/Message/Message';
import Modal from '../../../../libs/web/components/Modal/Modal';
import Pagination from '../../../../libs/web/components/Pagination/Pagination';
import Spinner from '../../../../libs/web/components/Spinner/Spinner';
import TableBody from '../../../../libs/web/components/Table/TableBody';
import TableHeader from '../../../../libs/web/components/Table/TableHeader';
import Typography from '../../../../libs/web/components/Typography/Typography';
import {ETextColor, ETextVariant} from '../../../../libs/web/constants/enums';
import {useAbility} from '../../lib/ability';
import {ITEMS_PER_PAGE} from './UOM.constants';
import UOMForm from './UOMForm';
import UOMTableItem from './UOMTableItem';
import UOMTableSearch from './UOMTableSearch';
import useUOMData from './hooks/useUOMData';

const UOMTable = () => {
  const {localState, localActions, handlers, formattedData, localErrorText} =
    useUOMData();
  const ability = useAbility();
  const {t} = useTranslation('uom');
  const {t: tBtn} = useTranslation('buttons');
  const items = [t('unit_name'), t('abbreviation')];

  return (
    <>
      <div className="flex gap-2.5 mb-4">
        <Typography variant={ETextVariant.xl} medium className="sm:pl-4">
          {t('units_of_measurement')}
        </Typography>
        <Typography variant={ETextVariant.xl} medium color={ETextColor.gray}>
          {formattedData.UOMData?.length && `(${formattedData.UOMCount})`}
        </Typography>
      </div>
      <div className="shadow rounded-md relative">
        {formattedData.loading && <Spinner contentSize/>}
        <UOMTableSearch
          search={localState.search}
          setSearch={localActions.setSearch}
          onClick={() => handlers.handleOpenCreateEditModal()}
        />
        <TableHeader
          items={items}
          columnsSize={1}
          sortItem={t('unit_name')}
          sortOrder="asc"
          className="md:hidden sm:hidden"
        />
        {formattedData.UOMData?.length ? (
          <>
            <TableBody>
              {formattedData.UOMData.map((item) => (
                <UOMTableItem
                  key={item.id}
                  item={item}
                  size={3}
                  onClickView={handlers.handleActionOnTableItem}
                  ability={ability}
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
            className="flex justify-center py-5 h-full"
          >
            {localErrorText('IM0025', 'units of measurements')}
          </Typography>
        )}
      </div>
      <Modal
        show={!!localState.openWarningModal}
        closeModal={() => localActions.setOpenWarningModal(false)}
        secondButtonAction={handlers.handleDeleteButton}
        firstButtonText={tBtn('cancel')}
        secondButtonText={tBtn('delete')}
      >
        <Typography variant={ETextVariant.lg} medium>
          {t('delete_uom')}
        </Typography>
      </Modal>
      <Modal
        show={!!localState.openCreateModal}
        closeModal={() => {
          localActions.setOpenCreateModal(false);
          localActions.setUOMFormErrors({});
        }}
        firstButtonAction={() => localActions.setOpenCancelModal(true)}
        secondButtonAction={handlers.handleSubmitClick}
        overrideClose
        firstButtonText={tBtn('cancel')}
        secondButtonText={
          localState?.UOMForm?.id ? tBtn('update') : tBtn('create')
        }
        isDisabled={formattedData.loadingCreateUpdate}
        loading={formattedData.loadingCreateUpdate}
        fullScreenModal
      >
        <div>
          <Typography variant={ETextVariant.lg} medium className="sm:text-left sm:block sm:pt-1">
            {localState?.UOMForm?.id
              ? t('edit_unit_of_measurement')
              : t('new_unit_of_measurement')}
          </Typography>
          <UOMForm
            handlers={handlers}
            localState={localState}
            localErrorText={localErrorText}
          />
        </div>
      </Modal>
      <Alert
        show={!!localState?.UOMFormErrors?.deleteError}
        closeModal={() => localActions.setUOMFormErrors({})}
        title={t('delete_uom_error_title')}
        message={t('delete_uom_error_msg')}
        buttonText={tBtn('ok')}
      />
      <Message
        show={!!localState.openMessage}
        closeMessage={() => localActions.setOpenMessage(false)}
      >
        <Typography variant={ETextVariant.sm} medium>
          {t('delete_uom_success', {name: localState.openMessage})}
        </Typography>
      </Message>
      <Modal
        show={localState.openCancelModal}
        closeModal={handlers.handleCloseCancelModal}
        secondButtonAction={handlers.handleCancelButton}
        firstButtonText={tBtn('cancel')}
        secondButtonText={tBtn('discard')}
      >
        <Typography variant={ETextVariant.lg} medium>
          {t('IM0010', {ns: 'system_errors'})}
        </Typography>
      </Modal>
    </>
  );
};

export default UOMTable;
