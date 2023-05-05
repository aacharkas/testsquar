import { useTranslation } from 'next-i18next';
import React from 'react';

import Pagination from '../../../../libs/web/components/Pagination/Pagination';
import Spinner from '../../../../libs/web/components/Spinner/Spinner';
import TableBody from '../../../../libs/web/components/Table/TableBody';
import TableHeader from '../../../../libs/web/components/Table/TableHeader';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import DocumentTableItem from './DocumentTableItem';
import DocumentTableSearch from './DocumentTableSearch';
import Modal from '../../../../libs/web/components/Modal/Modal';
import DocumentItemsForm from './DocumentItemsForm';
import useDocumentItemData from './hooks/useDocumentItemData';
import { ITEMS_PER_PAGE, TOTAL_PAGES } from './DocumentItems.constants';

const DocumentsTable = () => {
  const {
    localState,
    localActions,
    handleSubmitClick,
    formattedData,
    handlers,
  } = useDocumentItemData();
  const { t } = useTranslation('documents');
  const items = [t('document_name'),t('file_size')];

  return (
    <>
      {!localState.loading ? (
        <>
          <div className="flex gap-2.5 mb-4">
            <Typography variant={ETextVariant.xl} medium className="sm:pl-4">
              {t('documents')}
            </Typography>
            <Typography
              variant={ETextVariant.xl}
              medium
              color={ETextColor.gray}
            >
              ({formattedData.documentsData.length})
            </Typography>
          </div>
          <div className="shadow rounded-md">
            <DocumentTableSearch search={localState.search} setSearch={localActions.setSearch}/>
            <TableHeader
              items={items}
              className="md:hidden sm:hidden"
              isFirstItemBig
              sortItem={t('document_name')} />
            <TableBody>
              {formattedData.documentsData.map((item) => (
                <DocumentTableItem
                  key={item.id}
                  item={item}
                  size={items.length}
                  onClickView={handlers.handleActionOnTableItem}
                />
              ))}
            </TableBody>
            <Pagination
              itemsPerPage={ITEMS_PER_PAGE}
              totalPages={TOTAL_PAGES}
              setData={()=>{return '';}}
              currentPage={1}
              setCurrentPage={()=>{return 1;}}
            />
          </div>
        </>
      ) : (
        <Spinner />
      )}
      <Modal
        show={!!localState.openModal}
        closeModal={() => localActions.setOpenModal(false)}
        secondButtonAction={handleSubmitClick}
        firstButtonText={t('cancel')}
        secondButtonText={t('save')}
      >
        <div>
          <Typography variant={ETextVariant.lg} medium>
            {t('rename_document')}
          </Typography>
          <DocumentItemsForm/>
        </div>
      </Modal>
      <Modal
        show={!!localState.openWarningModal}
        closeModal={() => localActions.setOpenWarningModal(false)}
        secondButtonAction={handlers.handleRemoveDocument}
        firstButtonText={t('cancel')}
        secondButtonText={t('delete')}
      >
        <Typography variant={ETextVariant.lg} medium>
          {t('delete_document')}
        </Typography>
      </Modal>
    </>
  );
};

export default DocumentsTable;
