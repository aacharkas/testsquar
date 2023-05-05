import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { captureSentryError } from '../../../../../libs/web/helpers/captureSentryError';
import { useDebounce } from '../../../../../libs/web/hooks/useDebounce';
import { localIssueText } from '../../Components/ErrorMessage';
import {
  CLAIM_ITEM_DELETE,
  CLAIM_ITEM_UPDATE,
  CREATE_CLAIM_ITEM,
  SUGGESTION_ADD_TO_GLOBAL,
} from '../ClaimItem/ClaimItemForm.api';
import { GET_CLAIM_ITEMS } from '../ClaimItems.api';
import {
  CLAIM_ITEMS_ACTIONS,
  CLAIM_ITEMS_FIRST_TAB,
  DEFAULT_CLAIM_ITEM,
  DEFAULT_CLAIM_ITEMS_FILTERS,
  ERROR_TEXT,
  ITEMS_PER_PAGE,
} from '../ClaimItems.contants';
import type {
  TClaimItem,
  TClaimItemErrors,
  TClaimItemForm,
  TFilters,
} from '../ClaimItems.types';
import {
  checkClaimItemFormError,
  formatCreateData,
  formatEditData,
  formatGetData,
} from './useClaimItem.helper';

const useClaimItemData = () => {
  const { t } = useTranslation(['system_errors']);
  const [claimItemForm, setClaimItemForm] =
    useState<TClaimItemForm>(DEFAULT_CLAIM_ITEM);
  const [claimItemFormErrors, setClaimItemFormErrors] =
    useState<TClaimItemErrors>({});
  const [filters, setFilters] = useState<TFilters>(DEFAULT_CLAIM_ITEMS_FILTERS);
  const [itemDetails, setItemDetails] = useState<TClaimItem | null>(null);
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [openWarningModal, setOpenWarningModal] = useState<boolean | string>(
    false
  );
  const [changedItem, setChangedItem] = useState<TClaimItem>(null);
  const [openMessage, setOpenMessage] = useState<boolean | string>(false);
  const [currentTab, setCurrentTab] = useState<string>(CLAIM_ITEMS_FIRST_TAB);
  const [claimItemsCount, setClaimItemsCount] = useState<number>(0);
  const [openDiscardModal, setOpenDiscardModal] = useState<boolean>(false);

  const [createClaimItem, { loading: loadingCreateClaimItem }] =
    useMutation(CREATE_CLAIM_ITEM);
  const [claimItemDelete, { loading: loadingClaimItemDelete }] =
    useMutation(CLAIM_ITEM_DELETE);
  const [updateClaimItem, { loading: loadingClaimItemUpdate }] =
    useMutation(CLAIM_ITEM_UPDATE);
  const [addSuggestionToGlobal, { loading: loadingSuggestionsToGlobal }] =
    useMutation(SUGGESTION_ADD_TO_GLOBAL);

  const {
    loading: loadingClaimItems,
    data,
    refetch,
  } = useQuery(GET_CLAIM_ITEMS, {
    variables: {
      sortOrder: filters.sortOrder,
      take: ITEMS_PER_PAGE,
      skip: filters.skip,
      search: filters.search,
      sources: filters.source?.type,
      reviewed: currentTab === CLAIM_ITEMS_FIRST_TAB,
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (currentTab === CLAIM_ITEMS_FIRST_TAB) {
      setClaimItemsCount(data?.claimItems?.totalCount);
    }
  }, [data]);

  const claimItemsData = useMemo(() => data?.claimItems?.rows ?? [], [data]);
  const claimItemsSuggestionCount = useMemo(
    () => data?.claimItems?.suggestionCount,
    [data]
  );
  const totalPages = useMemo(
    () => Math.ceil(data?.claimItems?.totalCount / ITEMS_PER_PAGE),
    [data]
  );

  const loading =
    (loadingClaimItems && !claimItemsData?.length) ||
    loadingClaimItemDelete ||
    loadingSuggestionsToGlobal;

  const searchClaimItemsDebounce = useDebounce((value) => {
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

  useEffect(() => {
    if (!search || search?.length > 2) searchClaimItemsDebounce(search);
  }, [search]);

  const handleActionOnTableItem = (item, selectedItem: TClaimItem): void => {
    setChangedItem(selectedItem);
    if (item.type === CLAIM_ITEMS_ACTIONS.DELETE) {
      setOpenWarningModal(item?.id);
    } else if (item.type === CLAIM_ITEMS_ACTIONS.EDIT) {
      handleOpenCreateEditModal(selectedItem);
    } else if (item.type === CLAIM_ITEMS_ACTIONS.ADD_TO_GLOBAL) {
      handleAddToGlobalButton(selectedItem);
    } else if (item.type === CLAIM_ITEMS_ACTIONS.REJECT) {
      setOpenWarningModal(item?.id);
    }
  };

  const handleDeleteButton = async () => {
    const uuid = openWarningModal;
    try {
      if (uuid) {
        setOpenWarningModal(false);
        await claimItemDelete({ variables: { uuid } });
        await refetch();
      }
    } catch (error) {
      captureSentryError(error, {
        entityId: uuid,
      });
      setOpenMessage(true);
      console.log(error);
    }
  };
  const handleAddToGlobalButton = async (selectedItem) => {
    const uuid = selectedItem?.id;
    try {
      if (uuid) {
        await addSuggestionToGlobal({
          variables: {
            input: { reviewed: true },
            uuid,
          },
        });
        await refetch();
      }
    } catch (error) {
      captureSentryError(error, {
        entityId: uuid,
      });
      console.log(error);
    }
  };
  const handleChange = (value, name: string) => {
    handleErrorFix(name);
    const updateInfo = {
      [name]: value,
    };
    setClaimItemForm((prevState) => ({ ...prevState, ...updateInfo }));
  };
  const handleErrorFix = (name: string) => {
    if (claimItemFormErrors?.[name]) {
      const { [name]: omitted, ...errors } = claimItemFormErrors;
      setClaimItemFormErrors(errors);
    }
  };

  const formatError = useCallback((name: string): string => {
    return `${ERROR_TEXT}${name}.`;
  }, []);

  const checkClaimItemForm = (): boolean => {
    const errors = checkClaimItemFormError(claimItemForm, formatError);
    setClaimItemFormErrors(errors);
    return !!Object.keys(errors).length;
  };

  const localErrorText = useCallback(
    (text: string, field: string): string =>
      localIssueText(text, t, { component: field }),
    [t]
  );
  const handleSubmitClick = async () => {
    let formattedRequest = {};
    try {
      if (!checkClaimItemForm()) {
        if (claimItemForm?.id) {
          formattedRequest = formatEditData(changedItem, claimItemForm);
          await updateClaimItem({
            variables: {
              input: { ...formattedRequest, id: claimItemForm?.id },
              uuid: claimItemForm?.id,
            },
          });
        } else {
          formattedRequest = formatCreateData(claimItemForm);
          await createClaimItem({
            variables: { input: { ...formattedRequest } },
          });
        }

        setIsOpenCreateModal(false);
        refetch();
      }
    } catch (error) {
      captureSentryError(error, {
        entityId: claimItemForm?.id,
        payload: formattedRequest,
      });
      const message = error?.networkError?.message;
      console.log('error', message);
      setClaimItemFormErrors(message);
    }
  };
  const handleOpenCreateEditModal = (item?: TClaimItem) => {
    if (item) {
      const formattedDatea = formatGetData(item);
      setClaimItemForm(formattedDatea);
    } else {
      setClaimItemForm(DEFAULT_CLAIM_ITEM);
    }
    setIsOpenCreateModal(true);
  };
  const discardChanges = () => {
    setOpenDiscardModal(true);
  };
  const handleCloseDiscardModal = () => {
    setOpenDiscardModal(false);
  };

  const discardModalChanges = () => {
    setOpenDiscardModal(false);
    setIsOpenCreateModal(false);
    setClaimItemFormErrors({});
  };

  return {
    checkClaimItemForm,
    claimItemFormErrors,
    claimItemForm,
    localErrorText,
    discardChanges,
    changedTab: setCurrentTab,
    localState: {
      search,
      filters,
      currentPage,
      isOpenCreateModal,
      openWarningModal,
      openMessage,
      currentTab,
      openDiscardModal,
      itemDetails,
    },
    localActions: {
      setSearch,
      setFilters,
      setCurrentPage,
      setIsOpenCreateModal,
      setOpenWarningModal,
      setOpenMessage,
      setCurrentTab,
      setOpenDiscardModal,
      setItemDetails,
    },
    formattedData: {
      loading,
      loadingClaimItemUpdate,
      loadingCreateClaimItem,
      claimItemsData,
      claimItemsCount,
      totalPages,
      claimItemsSuggestionCount,
      globalTab: currentTab === CLAIM_ITEMS_FIRST_TAB,
    },
    handlers: {
      handleChange,
      handleSubmitClick,
      handleDeleteButton,
      handleActionOnTableItem,
      handleOpenCreateEditModal,
      handleCloseDiscardModal,
      discardModalChanges,
    },
  };
};

export default useClaimItemData;
