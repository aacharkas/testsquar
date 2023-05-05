import {useTranslation} from 'next-i18next';
import React from 'react';

import Message from '../../../../libs/web/components/Message/Message';
import Modal from '../../../../libs/web/components/Modal/Modal';
import Pagination from '../../../../libs/web/components/Pagination/Pagination';
import TableBody from '../../../../libs/web/components/Table/TableBody';
import TableHeader from '../../../../libs/web/components/Table/TableHeader';
import {Tabs} from '../../../../libs/web/components/Tabs/Tabs';
import Typography from '../../../../libs/web/components/Typography/Typography';
import {ETextColor, ETextVariant} from '../../../../libs/web/constants/enums';
import ClaimItemsForm from './ClaimItem/ClaimItemsForm';
import {ITEMS_PER_PAGE} from './ClaimItems.contants';
import ClaimItemsGlobalListTableItem from './ClaimItemsGlobalListTableItem';
import ClaimItemsTableSearch from './ClaimItemsTableSearch';
import useClaimItemData from './hooks/useClaimItemData';
import SlideModal from '../../../../libs/web/components/SlideModal/SlideModal';
import ClaimItemsDetails from './ClaimItemsDetails';

const GlobalList = ({
  t,
  localState,
  handlers,
  localActions,
  items,
  formattedData,
  localErrorText,
  globalTab,
}): JSX.Element => (
  <div className="shadow rounded-md relative mt-5 bg-white sm:mt-0 xs:mt-0">
    <ClaimItemsTableSearch
      search={localState.search}
      setSearch={localActions.setSearch}
      onClick={() => handlers.handleOpenCreateEditModal()}
      filters={localState.filters}
      setFilters={localActions.setFilters}
    />
    <TableHeader
      items={items}
      columnsSize={1}
      sortItem={t('description')}
      sortOrder="asc"
      className="md:hidden sm:hidden"
    />
    {formattedData.claimItemsData?.length ? (
      <>
        <TableBody>
          {formattedData.claimItemsData.map((item) => (
            <ClaimItemsGlobalListTableItem
              key={item.id}
              item={item}
              size={3}
              onClickView={handlers.handleActionOnTableItem}
              globalTab={globalTab}
              onClickRow={localActions.setItemDetails}
            />
          ))}
        </TableBody>
        <Pagination
          itemsPerPage={ITEMS_PER_PAGE}
          totalPages={formattedData.totalPages}
          setData={(value) =>
            localActions.setFilters({
              ...localState.filters,
              skip: value,
            })
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
        {localErrorText('IM0025', 'claim items')}
      </Typography>
    )}
  </div>
);
const ClaimItemsTable = () => {
  const {
    claimItemFormErrors,
    claimItemForm,
    localErrorText,
    handlers,
    localState,
    localActions,
    formattedData,
    discardChanges,
    changedTab,
  } = useClaimItemData();

  const {t} = useTranslation(['claim_items', 'system_errors']);
  const {t: tBtn} = useTranslation('buttons');
  const items = [t('description'), t('source')];

  const tabChild = <GlobalList
    t={t}
    localState={localState}
    handlers={handlers}
    localActions={localActions}
    items={items}
    formattedData={formattedData}
    localErrorText={localErrorText}
    globalTab={formattedData.globalTab}
  />;
  const claimItemsTabs = [
    {
      id: 'global_list',
      name: t('global_list'),
      children: tabChild,
    },
    {
      id: 'suggestions',
      name: t('suggestions', {quantity: formattedData?.claimItemsSuggestionCount}),
      children: tabChild,
    },
  ];

  return (
    <div>
      <div className="flex gap-2.5 mb-4">
        <Typography
          variant={ETextVariant.xl}
          medium
          className="sm:pl-4"
        >
          {t('claim_items')}
        </Typography>
        <Typography variant={ETextVariant.xl} medium color={ETextColor.gray}>
          {formattedData.claimItemsData?.length &&
            `(${formattedData.claimItemsCount})`}
        </Typography>
      </div>
      <div className='sm:bg-white xs:bg-white'>
        <Tabs
          disableSmall
          currentTab={localState.currentTab}
          changeTab={(tab) => changedTab(tab)}
          tabs={claimItemsTabs}
          loading={formattedData.loading}
        />
      </div>

      <Message
        show={!!localState.openMessage}
        closeMessage={() => localActions.setOpenMessage(false)}
      >
        <Typography variant={ETextVariant.sm} medium>
          {t('delete_claim_item_error')}
        </Typography>
      </Message>
      <Modal
        show={!!localState.openWarningModal}
        closeModal={() => localActions.setOpenWarningModal(false)}
        secondButtonAction={handlers.handleDeleteButton}
        firstButtonText={tBtn('cancel')}
        secondButtonText={tBtn('delete')}
      >
        <Typography variant={ETextVariant.lg} medium>
          {t('delete_claim_item')}
        </Typography>
      </Modal>
      <Modal
        show={localState.isOpenCreateModal}
        closeModal={discardChanges}
        secondButtonAction={handlers.handleSubmitClick}
        firstButtonText={tBtn('cancel')}
        secondButtonText={claimItemForm?.id ? tBtn('update') : tBtn('create')}
        fullScreenModal
        isDisabled={formattedData.loadingClaimItemUpdate || formattedData.loadingCreateClaimItem}
        loading={formattedData.loadingClaimItemUpdate || formattedData.loadingCreateClaimItem}
      >
        <div>
          <Typography
            variant={ETextVariant.lg}
            medium
            className="sm:text-left sm:block"
          >
            {claimItemForm?.id ? t('edit_claim_item') : t('new_claim_item')}
          </Typography>
          <ClaimItemsForm
            handlers={handlers}
            claimItemForm={claimItemForm}
            claimItemFormErrors={claimItemFormErrors}
            localErrorText={localErrorText}
            localState={localState}
          />
        </div>
      </Modal>
      <SlideModal
        closeModal={() => localActions.setItemDetails(null)}
        isModalOpen={!!localState.itemDetails}
        dialogTitle={t('details')}
      >
        <ClaimItemsDetails
          item={localState.itemDetails}
          globalTab={formattedData.globalTab}
        />
      </SlideModal>
    </div>
  );
};

export default ClaimItemsTable;
