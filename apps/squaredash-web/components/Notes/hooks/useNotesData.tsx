import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { useDebounce } from '../../../../../libs/web/hooks/useDebounce';
import { TFilters, TNotes } from '../NoteItems.types';
import { ITEMS_PER_PAGE } from '../Notes.constants';
// import { NOTE_DELETE } from '../Note/NoteForm.api';
// import { GET_NOTE } from '../Notes.api';
import { DEFAULT_NOTES_FILTERS, NOTES_ACTIONS } from '../Notes.constants';
import { NOTES_DATA } from './useNotesData.mock';

const useNotesData = () => {
  const router = useRouter();
  const [filters, setFilters] = useState<TFilters>(DEFAULT_NOTES_FILTERS);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedNotes, setSelectedNotes] = useState<TNotes | null>(null);
  const [openWarningModal, setOpenWarningModal] = useState<boolean | string>(
    false
  );

  const searchNotesDebounce = useDebounce((value) => {
    if (!value) {
      setFilters({
        ...filters,
        search: value,
        skip: (currentPage - 1) * ITEMS_PER_PAGE,
      });
    } else {
      setFilters({ ...filters, search: value, skip: 0 });
    }
  });

  const handleActionOnTableItem = (item): void => {
    if (item.type === NOTES_ACTIONS.EDIT) {
      router.push(item.href);
    } else if (item.type === NOTES_ACTIONS.DELETE) {
      setOpenWarningModal(item?.id);
    } else if (item.type === NOTES_ACTIONS.VIEW) {
      handleOnNotesClick(item.id);
    }
  };

  const handleRemoveNote = async () => {
    try {
      // await noteDelete({ variables: { uuid: openWarningModal } });
      await router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setOpenWarningModal(false);
    }
  };

  const handleOnNotesClick = (item) => {
    setSelectedNotes(item);
    setOpenModal(true);
  };

  return {
    localState: {
      filters,
      openModal,
      selectedNotes,
      currentPage,
      openWarningModal,
    },
    localActions: {
      setFilters,
      setOpenModal,
      setCurrentPage,
      setOpenWarningModal,
    },
    formattedData: {
      notesData: NOTES_DATA,
    },
    handlers: {
      handleOnNotesClick,
      handleActionOnTableItem,
      handleRemoveNote,
    },
    searchNotesDebounce,
  };
};

export { useNotesData };
