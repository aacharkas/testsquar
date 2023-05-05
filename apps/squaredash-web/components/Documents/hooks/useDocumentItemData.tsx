import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { TDocumentErrors } from '../DocumentItem.types';
import {
  DEFAULT_DOCUMENT_ITEM,
  DOCUMENTS_ACTIONS,
} from '../DocumentItems.constants';
import { ERROR_TEXT } from '../DocumentItems.constants';
import { checkDocumentFormError } from './useDocumentData.helper';
import { DOCUMENTS_DATA } from './useDocumentData.mock';

const useDocumentItemData = () => {
  const [documentItemForm, setDocumentItemForm] = useState(
    DEFAULT_DOCUMENT_ITEM
  );
  const [documentFormErrors, setDocumentFormErrors] = useState<TDocumentErrors>(
    {}
  );
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedDocuments, setSelectedDocuments] = useState(null);
  const [openWarningModal, setOpenWarningModal] = useState<boolean | string>(
    false
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const handleSubmitClick = () => {
    try {
      // TODO make request edit / create
    } catch (e) {
      // TODO handle issues
    }
  };

  const handleChange = (value, name: string) => {
    handleErrorFix(name);
    const updateInfo = {
      ...documentItemForm,
      [name]: value,
    };
    setDocumentItemForm(updateInfo);
  };

  const handleErrorFix = (name: string) => {
    if (documentFormErrors?.[name]) {
      const { [name]: omitted, ...errors } = documentFormErrors;
      setDocumentFormErrors(errors);
    }
  };

  const checkDocumentItemForm = (): boolean => {
    const errors = checkDocumentFormError(documentItemForm, formatError);
    setDocumentFormErrors(errors);
    return !!Object.keys(errors).length;
  };

  const formatError = useCallback((name: string): string => {
    return `${ERROR_TEXT}${name}.`;
  }, []);

  const handleActionOnTableItem = (item): void => {
    if (item.type === DOCUMENTS_ACTIONS.VIEW) {
      router.push(item.href);
    } else if (item.type === DOCUMENTS_ACTIONS.DELETE) {
      setOpenWarningModal(item?.id);
    } else if (item.type === DOCUMENTS_ACTIONS.RENAME) {
      openRenameModal(item.id);
    }
  };

  const handleRemoveDocument = async () => {
    try {
      // await documentDelete({ variables: { uuid: openWarningModal } });
      await router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setOpenWarningModal(false);
    }
  };

  const openRenameModal = (item) => {
    setSelectedDocuments(item);
    setOpenModal(true);
  };

  return {
    handleChange,
    handleSubmitClick,
    checkDocumentItemForm,
    formatError,
    documentFormErrors,
    documentItemForm,
    localState: {
      openModal,
      selectedDocuments,
      openWarningModal,
      loading,
      search,
    },
    localActions: {
      setOpenModal,
      setOpenWarningModal,
      openRenameModal,
      setLoading,
      setSearch,
    },
    formattedData: {
      documentsData: DOCUMENTS_DATA,
    },
    handlers: {
      handleActionOnTableItem,
      handleRemoveDocument,
    },
  };
};

export default useDocumentItemData;
