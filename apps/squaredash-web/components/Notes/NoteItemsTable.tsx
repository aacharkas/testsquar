import Modal from 'libs/web/components/Modal/Modal';
import SlideModal from 'libs/web/components/SlideModal/SlideModal';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import Pagination from '../../../../libs/web/components/Pagination/Pagination';
import Spinner from '../../../../libs/web/components/Spinner/Spinner';
import TableBody from '../../../../libs/web/components/Table/TableBody';
import TableHeader from '../../../../libs/web/components/Table/TableHeader';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import NoteDetails from './NoteDetails';
import NoteTableItem from './NoteTableItem';
import NotesTableSearch from './NotesTableSearch';
import { useNotesData } from './hooks/useNotesData';

const NotesTable = () => {
  const { localState, localActions, formattedData, handlers } = useNotesData();
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const { t } = useTranslation('notes');
  const items = [t('note_name')];
  const itemsPerPage = 2;
  const totalPages = 5;

  return (
    <div>
      <div className="relative">
        {loading && <Spinner contentSize />}
        <div className="flex gap-2.5 mb-4">
          <Typography variant={ETextVariant.xl} medium className="sm:pl-4">
            {t('notes')}
          </Typography>
          <Typography variant={ETextVariant.xl} medium color={ETextColor.gray}>
            ({formattedData.notesData.length})
          </Typography>
        </div>
        <div className="shadow rounded-md">
          <NotesTableSearch search={search} setSearch={setSearch} />
          <TableHeader items={items} className="md:hidden sm:hidden" />
          <TableBody>
            {formattedData.notesData.map((item) => (
              <NoteTableItem
                key={item.id}
                item={item}
                size={items.length}
                onClickRow={handlers.handleOnNotesClick}
                onClickView={handlers.handleActionOnTableItem}
              />
            ))}
          </TableBody>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalPages={totalPages}
            setData={(value) =>
              localActions.setFilters({ ...localState.filters, skip: value })
            }
            currentPage={localState.currentPage}
            setCurrentPage={localActions.setCurrentPage}
          />
        </div>
      </div>
      <Modal
        show={!!localState.openWarningModal}
        closeModal={() => localActions.setOpenWarningModal(false)}
        secondButtonAction={handlers.handleRemoveNote}
        firstButtonText={t('cancel')}
        secondButtonText={t('delete')}
      >
        <Typography variant={ETextVariant.lg} medium>
          {t('delete_note')}
        </Typography>
      </Modal>
      <SlideModal
        closeModal={() => localActions.setOpenModal(false)}
        isModalOpen={localState.openModal}
        dialogTitle={t('details')}
      >
        <NoteDetails item={localState.selectedNotes} />
      </SlideModal>
    </div>
  );
};

export default NotesTable;
